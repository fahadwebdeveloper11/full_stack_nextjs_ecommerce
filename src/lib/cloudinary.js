import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (filePath) => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      allowed_formats: ["jpg", "webp", "png"],
    });

    fs.unlinkSync(filePath);

    return {url:response.url, public_id:response.public_id};
  } catch (error) {
    console.log(error);
    fs.unlinkSync(filePath);
  }
};

export const deleteOnCloudinary = async (publicId) => {
  try {
   const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.log(error);
  }
}