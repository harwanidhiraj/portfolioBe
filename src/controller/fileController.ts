import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadToCloudinary = async (filePath: string, folder: string) => {
  const publicId = path.parse(filePath).name;

  const result = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    folder: `portfolio/${folder}`,
    resource_type: "auto",
  });

  fs.unlinkSync(filePath);
  return result;
};
