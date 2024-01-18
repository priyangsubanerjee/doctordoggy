import { getPersonalPet, getPetById } from "@/prisma/pet";
import { getPrescriptionsByPetId } from "@/prisma/prescription";

export default async function handler(req, res) {
  const { id } = req.body;
  let { success, message, prescriptions } = await getPrescriptionsByPetId(id);
  prescriptions = JSON.parse(JSON.stringify(prescriptions));
  res.status(200).json({ success, message, prescriptions });
}
