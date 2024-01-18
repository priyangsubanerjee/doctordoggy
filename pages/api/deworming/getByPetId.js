import { getDewormingsByPetId } from "@/prisma/deworming";
import { getPersonalPet, getPetById } from "@/prisma/pet";
import { getPrescriptionsByPetId } from "@/prisma/prescription";

export default async function handler(req, res) {
  const { id } = req.body;
  let { success, message, dewormings } = await getDewormingsByPetId(id);
  dewormings = JSON.parse(JSON.stringify(dewormings));
  res.status(200).json({ success, message, dewormings });
}
