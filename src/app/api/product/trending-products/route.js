import { connectDB } from "@/lib/dbConfig";
import Product from "@/models/ProductModel";
export async function GET(request) {
  await connectDB();

  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

    return Response.json(
      {
        success: true,
        message: "Trending products found successfully",
        products,
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
