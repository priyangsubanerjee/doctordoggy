import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

// Store environment variables in your .env.local file
cloudinary.config({
  cloud_name: "db9kd4qbi",
  secure: true,
  api_key: "368554699184186",
  api_secret: "F9mtebD4_95fUM69twEbJMLbO7o",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const file = await new Promise((resolve, reject) => {
      const form = formidable();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
      });
      form.on("file", (formName, file) => {
        resolve(file);
      });
    });

    const data = await cloudinary.uploader.unsigned_upload(
      file.filepath,
      "p64cpurc"
    );

    res.status(200).json({ fileUrl: data.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server upload error" });
  }
}
