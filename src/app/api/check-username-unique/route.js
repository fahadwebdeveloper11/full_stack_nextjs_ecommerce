import { connectDB } from "@/lib/dbConfig";
import User from "@/models/UserModel";
import { usernameValidation } from "@/validationSchemas/signUpScema";
import { z } from "zod";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);

    const queryParams = { username: searchParams.get("username") };

    const result = usernameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      const usernameErrors = result.error.format().username._errors || [];

      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const username = result.data?.username;
    const user = await User.findOne({ username, isVerified: true });

    if (user) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available",
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
