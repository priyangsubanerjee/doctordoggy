import connectDatabase from "@/db/connect";
import pets from "@/db/models/pet";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  await connectDatabase();
  const { petId, date, reason, notes, files, doctor, temperature, weight } =
    JSON.parse(req.body);
  try {
    let pet_ = await pets.findById(petId);
    if (!pet_) {
      return res.status(404).json({ success: false, error: "Pet not found" });
    } else {
      let uid = uuidv4();
      pet_.medicalRecords.push({
        _id: uid,
        date: date,
        doctor: doctor,
        temperature: temperature,
        weight: weight,
        reason: reason,
        notes: notes,
        files: files,
      });
      await pet_.save();
      return res.status(200).json({ success: true, prescription_id: uid });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
}
