import { connectDB } from "@/lib/dbConfig";
import Category from "@/models/CategoryModel";
import Product from "@/models/ProductModel";

export async function GET(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const price = searchParams.get("price");
    const search = searchParams.get("search");
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const sortBy = searchParams.get("sort");
    const page = searchParams.get("page") || 1;
    const limit = process.env.LIMIT || 8;

    const skip = (page - 1) * limit;

    const baseQuery = {};

    if (search) {
      baseQuery.title = { $regex: search, $options: "i" };
    }

    if (price) {
      baseQuery.price = { $lte: price };
    }

    if (color) {
      baseQuery.color = color;
    }

    if (size) {
      baseQuery.size = size;
    }

    if (category) {
      const categoryDoc = await Category.findOne({ title: category });
      if (categoryDoc) {
        baseQuery.category = categoryDoc._id;
      }
    }

    const sortOptions = {};

    if (sortBy === "newest") {
      sortOptions.createdAt = -1;
    } else if (sortBy === "low to high") {
      sortOptions.price = 1;
    } else {
      sortOptions.price = -1;
    }

    const products = Product.find(baseQuery)
      .skip(skip)
      .limit(limit)
      .sort(sortOptions)
      .populate("category");

    const [filteredProducts, totalProducts] = await Promise.all([
      products,
      Product.countDocuments({}),
    ]);
    console.log("tototalProducts", totalProducts);

    const totalPages = Math.ceil(totalProducts / limit);

    return Response.json(
      {
        success: true,
        products: filteredProducts,
        totalPages,
        totalProducts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
