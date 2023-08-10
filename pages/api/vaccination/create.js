// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import pets from "@/db/models/pet";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const { petId, dueDate, vaccineName, vaccineStatus, notes, createdBy } =
    JSON.parse(req.body);

  try {
    let pet_ = await pets.findById(petId);
    let uid = uuidv4();
    let record = {
      _id: uid,
      dueDate: dueDate,
      vaccineName: vaccineName,
      vaccineStatus: vaccineStatus,
      notes: notes,
      createdBy: createdBy,
    };
    pet_.vaccinationRecords.push(record);
    await pet_.save();
    return res.status(200).json({ success: true, id: uid });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
