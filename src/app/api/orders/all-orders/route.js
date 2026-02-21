import { connectDB } from "@/lib/dbConfig";
import Order from "@/models/OrderModel";
import User from "@/models/UserModel";
import Product from "@/models/ProductModel";
import Category from "@/models/CategoryModel";

export async function GET() {
  await connectDB();

  try {
    let orders = await Order.find()
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

    // if (orders.length === 0) {
    //   console.log("No orders found, generating dummy orders...");

    //   const users = await User.find({});
    //   const products = await Product.find({});

    //   if (users.length > 0 && products.length > 0) {
    //     const dummyOrders = [];
    //     const statuses = ["Pending", "Delivered", "Cancelled"];

    //     for (let i = 0; i < 10; i++) {
    //       const randomUser = users[Math.floor(Math.random() * users.length)];
    //       const randomProduct =
    //         products[Math.floor(Math.random() * products.length)];
    //       const quantity = Math.floor(Math.random() * 3) + 1;
    //       const amount = randomProduct.price * quantity;

    //       dummyOrders.push({
    //         user: randomUser._id,
    //         products: [
    //           {
    //             product: randomProduct._id,
    //             quantity: quantity,
    //           },
    //         ],
    //         address: `${Math.floor(Math.random() * 999) + 1} Main St, City, Country`,
    //         amount: amount,
    //         status: statuses[Math.floor(Math.random() * statuses.length)],
    //         name: randomUser.name || randomUser.username || "Guest User",
    //         phone: `+1-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    //       });
    //     }

    //     await Order.insertMany(dummyOrders);
    //     console.log("10 dummy orders created successfully!");

    //     // Fetch again with population
    //     orders = await Order.find()
    //       .populate("user")
    //       .populate({
    //         path: "products",
    //         populate: {
    //           path: "product",
    //           model: "Product",
    //           select: "image price category",
    //           populate: {
    //             path: "category",
    //             model: "Category",
    //             select: "title",
    //           },
    //         },
    //       });
    //   } else {
    //     console.log(
    //       "Cannot generate dummy orders: No users or products found.",
    //     );
    //   }
    // }

    // random users names
    const users = [
      { name: "Ali Khan", email: "ali.khan@example.com" },
      { name: "Sara Ahmed", email: "sara.ahmed@example.com" },
      { name: "Usman Tariq", email: "usman.tariq@example.com" },
      { name: "Ayesha Malik", email: "ayesha.malik@example.com" },
      { name: "Bilal Hussain", email: "bilal.hussain@example.com" },
      { name: "Hina Shah", email: "hina.shah@example.com" },
      { name: "Zain Ali", email: "zain.ali@example.com" },
      { name: "Fatima Noor", email: "fatima.noor@example.com" },
    ];

    const transformedorders = orders.map((order) => ({
      ...order,
      customer: {
        // i want random users here
        name: users[Math.floor(Math.random() * users.length)].name,
        email: users[Math.floor(Math.random() * users.length)].email,
      },
    }));
    return Response.json(
      { success: true, orders: transformedorders },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: error.message || error },
      { status: 500 },
    );
  }
}
