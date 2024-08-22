import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { deleteOnCloudinary, uploadOnCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/dbConfig";
import Category from "@/models/CategoryModel";
import Product from "@/models/ProductModel";
import fs from "fs";
import { getServerSession } from "next-auth";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);

export async function PUT(request, { params }) {
  await connectDB();

  // const session = await getServerSession(authOptions);

  // if (!session || !session.user || !session.user.isAdmin) {
  //   return Response.json(
  //     {
  //       success: false,
  //       message: "Unauthorized request",
  //     },
  //     { status: 402 }
  //   );
  // }

  try {
    const productId = params.id;
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
    const imagePublicId = formData.get("imagePublicId");
    console.log("imagePublicId", imagePublicId);
    console.log("image", image);

    const product = await Product.findById(productId);

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }
    let imageUrl = null;
    console.count();

    if (image && image !== null) {
      console.log("Image is not null or undefined:", image);

      if (!image.name) {
        console.log("Image name is missing.");
      } else {
        const uploadDir = path.resolve("./public");
        const filePath = path.join(uploadDir, image.name);

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        console.log("Image:", image);
        await pump(image.stream(), fs.createWriteStream(filePath));

        console.log("File uploaded to", filePath);
        console.count();
        imageUrl = await uploadOnCloudinary(filePath);
        if (!imageUrl) {
          return Response.json(
            {
              success: false,
              message: "Image upload failed",
            },
            {
              status: 500,
            }
          );
        }
        console.count();

        const deleteResult = await deleteOnCloudinary(imagePublicId);
        if (!deleteResult) {
          return Response.json(
            {
              success: false,
              message: "Previous image delete failed",
            },
            {
              status: 500,
            }
          );
        }
      }
    } else {
      console.log("Image is null or undefined.");
    }

    console.count();
    console.log("category tk agyaaa");
    let categoryId = null;
    if (category) {
      const existingCategory = await Category.findOne({ title: category });

      if (existingCategory) {
        categoryId = existingCategory._id;
      } else {
        const newCategory = await Category.create({ title: category });
        categoryId = newCategory._id;
      }
    }
    console.count();
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (imageUrl) product.image = imageUrl;
    if (categoryId) product.category = categoryId;
    if (discountedPrice) product.discountedPrice = discountedPrice;
    if (quantity) product.quantity = quantity;
    if (color) product.color = color.split(",");
    if (size) product.size = size.split(",");
    await product.save();

    return Response.json(
      {
        success: true,
        message: "Product updated successfully",
        product,
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
