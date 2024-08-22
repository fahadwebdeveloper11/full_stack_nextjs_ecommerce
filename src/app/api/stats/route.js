import { connectDB } from "@/lib/dbConfig";
import Order from "@/models/OrderModel";
import Product from "@/models/ProductModel";
import User from "@/models/UserModel";

export async function GET(request) {
  await connectDB();
  try {
    // i want to fetch how many products are there and total revenue and total users

    const productStats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalRevenue: { $sum: "$price" },
        },
      },
    ]);

    const userStats = await User.aggregate([
      {
        $group: {
          _id: "$user",
          total: { $sum: 1 },
        },
      },
    ]);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const pipeline = [
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ];

    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$amount" },
        },
      },
    ]);

    const totalOrders = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const result = await Product.aggregate(pipeline);
    const lastSixMonthsProducts = result.length > 0 ? result[0].count : 0;

    return Response.json(
      {
        success: true,
        stats: {
          totalProducts: productStats[0].totalProducts,
          totalUsers: userStats[0].total,
          lastSixMonthsProducts,
          totalSales: totalSales[0],
          totalOrders: totalOrders[0],
        },
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
