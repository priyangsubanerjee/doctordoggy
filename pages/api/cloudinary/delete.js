import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "db9kd4qbi",
  secure: true,
  api_key: "368554699184186",
  api_secret: "F9mtebD4_95fUM69twEbJMLbO7o",
});

export default async function handler(req, res) {
  try {
    const { publicId } = JSON.parse(req.body);
    const data = await cloudinary.uploader.destroy(publicId);
    res.status(200).json({
      message: "File deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
}

// const deleteImage = async (e) => {
//   e.preventDefault();
//   cloudinary.v2.uploader
//     .destroy(imageData.public_id, function (error, result) {
//       console.log(result, error);
//     })
//     .then((resp) => console.log(resp))
//     .catch((_err) =>
//       console.log("Something went wrong, please try again later.")
//     );
// };
