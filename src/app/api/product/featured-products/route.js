import { connectDB } from "@/lib/dbConfig";
import Product from "@/models/ProductModel";
import Category from "@/models/CategoryModel";

export async function GET(request) {
  await connectDB();

  try {
    let products = await Product.find({})
      .sort({ createdAt: 1 })
      .limit(8)
      .lean();

    // if (products.length === 0) {
    //   console.log("No products found, generating mock products...");

    //   // Ensure at least one category exists
    //   let category = await Category.findOne({});
    //   if (!category) {
    //     category = await Category.create({ title: "General" });
    //   }

    //   const mockProducts = [];
    //   const titles = [
    //     "Premium Wireless Headphones",
    //     "Modern Smartwatch",
    //     "Mechanical Gaming Keyboard",
    //     "Ultra-wide 4K Monitor",
    //     "Ergonomic Office Chair",
    //     "Portable Bluetooth Speaker",
    //     "DSLR Camera Bundle",
    //     "High-Speed SSD 1TB",
    //     "Smartphone Pro Max",
    //     "Noise Cancelling Earbuds",
    //     "Gaming Mouse RGB",
    //     "Leather Laptop Bag",
    //     "Smart Home Hub",
    //     "Fitness Tracker Band",
    //     "Compact Espresso Machine",
    //   ];

    //   for (let i = 0; i < titles.length; i++) {
    //     mockProducts.push({
    //       title: titles[i],
    //       description: `This is a high-quality ${titles[i]} designed for the best user experience. It features durable materials and state-of-the-art technology.`,
    //       price: Math.floor(Math.random() * 500) + 50,
    //       discountedPrice: Math.floor(Math.random() * 40) + 10,
    //       image: {
    //         url: `https://picsum.photos/seed/${i + 100}/600/400`,
    //         public_id: `mock_prod_${i}`,
    //       },
    //       category: category._id,
    //       quantity: Math.floor(Math.random() * 100) + 10,
    //       rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
    //       color: ["Black", "Silver", "Blue"],
    //       size: ["S", "M", "L", "XL"],
    //     });
    //   }

    //   await Product.insertMany(mockProducts);
    //   console.log("15 mock products created successfully!");

    //   // Fetch them again to return
    //   products = await Product.find({}).sort({ createdAt: 1 }).limit(8).lean();
    // }

    return Response.json(
      {
        success: true,
        products,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error in featured-products:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
