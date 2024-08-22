import { connectDB } from "@/lib/dbConfig";
import User from "@/models/UserModel";

export async function POST(request) {
  await connectDB();

  try {
    const { otp, username } = await request.json();

    console.log("otp", otp, "username", username);

    if (!otp || !username) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyCode === otp;
    const isExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        { status: 400 }
      );
    }

    if (!isExpired) {
      return Response.json(
        {
          success: false,
          message: "Code is expired",
        },
        { status: 400 }
      );
    }

    await User.findByIdAndUpdate(
      user._id,
      {
        isVerified: true,
        verifyCode: null,
        verifyCodeExpiry: null,
      },
      { new: true }
    );

    return Response.json(
      {
        success: true,
        message: "Email verified successfully. please sign in",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong:" + error,
      },
      { status: 500 }
    );
  }
}
