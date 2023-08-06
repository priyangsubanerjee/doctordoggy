import connectDatabase from "@/db/connect";
import { v2 as cloudinary } from "cloudinary";
import pets from "@/db/models/pet";

cloudinary.config({
  cloud_name: "db9kd4qbi",
  secure: true,
  api_key: "368554699184186",
  api_secret: "F9mtebD4_95fUM69twEbJMLbO7o",
});

export default async function handler(req, res) {
  await connectDatabase();
  const { prescription_id, pet_id } = JSON.parse(req.body);
  try {
    let pet_ = await pets.findById(pet_id);
    let records = await pet_.medicalRecords;
    let prescriptions = await records.filter((record) => {
      return record._id == prescription_id;
    });
    let files = prescriptions[0].files;

    files.forEach(async (file) => {
      if (file.public_id) {
        try {
          let delResponse = await cloudinary.uploader.destroy(file.public_id);
          if (delResponse) {
            console.log("File deleted successfully");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });

    pet_.medicalRecords = await records.filter((record) => {
      return record._id != prescription_id;
    });

    await pet_.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
}
