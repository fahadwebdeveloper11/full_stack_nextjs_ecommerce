import { connectDB } from "@/lib/dbConfig";
import User from "@/models/UserModel";

export async function GET(request) {
  await connectDB();
  try {
    const search = request.nextUrl.searchParams.get("search");

    if (search) {
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { username: { $regex: search, $options: "i" } },
        ],
      });
      return Response.json(
        {
          success: true,
          message: "All users",
          users,
        },
        { status: 200 }
      );
    }

    const users = await User.find();
    return Response.json(
      {
        success: true,
        message: "All users",
        users,
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
