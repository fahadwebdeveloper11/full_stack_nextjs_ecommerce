import { connectDB } from "@/lib/dbConfig";
import User from "@/models/UserModel";

export async function DELETE(request, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const user = await User.findByIdAndDelete(id);
    return Response.json(
      {
        success: true,
        message: "User deleted",
        user,
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
