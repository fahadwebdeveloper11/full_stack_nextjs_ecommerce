import { SendVerificationEmail } from "@/helper/sendVerificationEmail";
import { uploadOnCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/dbConfig";
import User from "@/models/UserModel";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);
export async function POST(request) {
  await connectDB();
  try {
    const formData = await request.formData();
    console.log(formData);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const avatar = formData.get("avatar");

    console.log(avatar);
    if (!avatar) {
      return Response.json(
        { success: false, message: "Avatar is required" },
        { status: 400 },
      );
    }

    const uploadDir = "/tmp";
    const uniqueFileName = `${Date.now()}-${avatar?.name}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    console.log(avatar);
    await pump(avatar.stream(), fs.createWriteStream(filePath));

    console.log("File uploaded to", filePath);

    if (!email || !username || !name || !password) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 401 },
      );
    }

    const existingVerifiedUserByUsername = await User.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "User already exist. Please Sign in!",
        },
        { status: 402 },
      );
    }

    const existingUserByEmail = await User.findOne({ email });

    let verifyCode;
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist. Please Sign in!",
          },
          { status: 402 },
        );
      } else {
        if (filePath) {
          const avatar = await uploadOnCloudinary(filePath);
          if (!avatar) {
            return Response.json(
              {
                success: false,
                message: "Please provide avatar!",
              },
              { status: 400 },
            );
          }
          existingUserByEmail.avatar = avatar.url;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        existingUserByEmail.verifyCode = verifyCode;
        const verifyCodeExpiry = new Date(Date.now() + 3600000);
        existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry;

        await existingUserByEmail.save();
      }
    } else {
      let avatarUrl;
      if (filePath) {
        console.log("filePath", filePath);

        avatarUrl = await uploadOnCloudinary(filePath);
        console.log("avatarUrl", avatarUrl);

        if (!avatarUrl) {
          return Response.json(
            {
              success: false,
              message: "Please provide avatar!",
            },
            { status: 400 },
          );
        }
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const verifyCodeExpiry = new Date(Date.now() + 3600000);
      const newUser = await new User({
        username,
        email,
        password: hashedPassword,
        name,
        verifyCode,
        verifyCodeExpiry,
        avatar: avatarUrl.url,
      });

      await newUser.save();
    }

    const emailResponse = await SendVerificationEmail(
      username,
      verifyCode,
      email,
    );
    console.log(emailResponse);

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: "Email not sent. Please try again later!",
        },
        { status: 402 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "User register successfully. Please verify your email.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong. Please try again later!" + error,
      },
      { status: 500 },
    );
  }
}
