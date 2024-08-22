import Product from "@/models/ProductModel";
import Review from "@/models/ReviewModel";
import { connectDB } from "@/lib/dbConfig";

export async function POST(request) {
  await connectDB();
  try {
    const { productId, userId, rating, message, name, email } =
      await request.json();

    console.log(productId, userId, rating, message, name, email);

    if (!productId || !rating || !message || !name || !email) {
      return Response.json(
        {
          success: false,
          message: "Please fill all the fields",
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return Response.json(
        {
          success: false,
          message: "Rating must be between 1 and 5",
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    const review = await Review.create({
      product: productId,
      user: userId || null,
      rating,
      comment: message,
      name,
      email,
    });

    const reviews = await Review.find({ product: productId });

    const averageRating =
      reviews.reduce((acc, review) => {
        return acc + review.rating;
      }, 0) / reviews.length;

    await Product.findByIdAndUpdate(
      productId,
      {
        rating: averageRating,
      },
      {
        new: true,
      }
    );

    return Response.json(
      {
        success: true,
        message: "Review created successfully",
        review,
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
      { status: 500 }
    );
  }
}
