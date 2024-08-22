import { connectDB } from "@/lib/dbConfig";
import Order from "@/models/OrderModel";
import User from "@/models/UserModel";
import Product from "@/models/ProductModel";
import Category from "@/models/CategoryModel";


export async function GET() {
  await connectDB();
  try {
    const orders = await Order.find()
      .populate("user")
      .populate({
        path: "products",
        populate: {
          path: "product",
          model: "Product",
          select: "image price category",
          populate: {
            path: "category",
            model: "Category",
            select: "title",
          },
        },
      });
    return Response.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: error }, { status: 500 });
  }
}
