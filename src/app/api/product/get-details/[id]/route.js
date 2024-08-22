import { connectDB } from "@/lib/dbConfig";
import Product from "@/models/ProductModel";

export async function GET(request, { params }) {
  await connectDB();

  try {
    const id = params.id;
    console.log(id);
    const product = await Product.findById(id);

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

    return Response.json(
      {
        success: true,
        message: "Product found",
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
