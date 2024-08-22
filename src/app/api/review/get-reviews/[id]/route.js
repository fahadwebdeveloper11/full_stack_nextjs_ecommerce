import { connectDB } from "@/lib/dbConfig";
import Review from "@/models/ReviewModel";

export async function GET(request, { params }) {
  await connectDB();

  try {
    const id = params.id;

    const reviews = await Review.find({ product: id }).populate(
      "user",
      "name avatar"
    );

    return Response.json(
      {
        succes: true,
        message: "Reviews founds successfully",
        reviews,
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
