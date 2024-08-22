import { connectDB } from "@/lib/dbConfig";
import Category from "@/models/CategoryModel";

export async function GET(request) {
  await connectDB();

  try {
    const categories = await Category.find({}).lean();
    return Response.json(
      {
        success: true,
        message: "Categories found successfully",
        categories,
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
