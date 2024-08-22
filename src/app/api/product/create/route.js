import { uploadOnCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/dbConfig";
import Category from "@/models/CategoryModel";
import Product from "@/models/ProductModel";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { prodcuts } from "@/constant/products";
const pump = promisify(pipeline);

export async function POST(request) {
  await connectDB();

  //   const session = await getServerSession(authOptions);

  //   if (!session || !session.user || !session.user.isAdmin) {
  //     return Response.json(
  //       {
  //         success: false,
  //         message: "Unauthorized request",
  //       },
  //       { status: 402 }
  //     );
  //   }

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const image = formData.get("image");
    const category = formData.get("category");
    const discountedPrice = formData.get("discountedPrice");
    const quantity = formData.get("quantity");
    const color = formData.get("color");
    const size = formData.get("size");

    if (!title || !description || !price || !category || !quantity) {
      return Response.json(
        {
          success: false,
          message: "Please fill all the fields",
        },
        { status: 400 }
      );
    }

    if (!image) {
      return Response.json(
        {
          success: false,
          message: "Image is required",
        },
        { status: 401 }
      );
    }

    const uploadDir = path.resolve("./public");
    const filePath = path.join(uploadDir, image?.name);

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    console.log(image);
    await pump(image.stream(), fs.createWriteStream(filePath));

    console.log("File uploaded to", filePath);

    let categoryId = null;

    const imageUrl = await uploadOnCloudinary(filePath);
    if (!imageUrl) {
      return Response.json(
        {
          success: false,
          message: "Image upload failed. Please try again",
        },
        { status: 402 }
      );
    }

    const existingCategory = await Category.findOne({ title: category });
    if (existingCategory) {
      categoryId = existingCategory._id;
    } else {
      const newCategory = await Category.create({ title: category });
      categoryId = newCategory._id;
    }

    console.log("size", size);
    console.log("color", color);

    const newProduct = await Product.create({
      title,
      description,
      price,
      category: categoryId,
      image: { url: imageUrl.url, public_id: imageUrl.public_id },
      discountedPrice: discountedPrice ? discountedPrice : "",
      quantity,
      size: size.split(","),
      color: color.split(","),
    });

    return Response.json(
      {
        success: true,
        message: "Product created successfully",
        product: newProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
