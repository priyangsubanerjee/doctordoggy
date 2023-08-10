import pets from "@/db/models/pet";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "db9kd4qbi",
  secure: true,
  api_key: "368554699184186",
  api_secret: "F9mtebD4_95fUM69twEbJMLbO7o",
});

export default async function handler(req, res) {
  const { petId, vaccinationId } = JSON.parse(req.body);

  try {
    let pet_ = await pets.findById(petId);
    let vaccinationRecord = pet_.vaccinationRecords.find(
      (record) => record._id == vaccinationId
    );
    let files = vaccinationRecord.files;
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

    pet_.vaccinationRecords = pet_.vaccinationRecords.filter(
      (record) => record._id != vaccinationId
    );
    await pet_.save();
    res.status(200).json({ success: true });
  } catch (error) {}
}
