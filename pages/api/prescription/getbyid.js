import { getPersonalPet, getPetById } from "@/prisma/pet";
import {
  getPrescriptionById,
  getPrescriptionsByPetId,
} from "@/prisma/prescription";

export default async function handler(req, res) {
  const { id } = req.body;
  let { success, message, prescription } = await getPrescriptionById(id);
  res.status(200).json({ success, message, prescription });
}
