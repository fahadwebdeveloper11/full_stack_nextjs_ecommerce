import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectDB } from "@/lib/dbConfig";
import Product from "@/models/ProductModel";
import { getServerSession } from "next-auth";

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);

  // if (!session || !session?.user || !session?.user?.isAdmin) {
  //   return Response.json(
  //     {
  //       success: false,
  //       message: "Unauthorized request",
  //     },
  //     { status: 402 }
  //   );
  // }
  await connectDB();

  try {
    const id =params.id;
    console.log(id)
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
    const deletedProduct = await Product.findByIdAndDelete(id);
    return Response.json(
      {
        success: true,
        message: "Product deleted successfully",
        deletedProduct,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
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
