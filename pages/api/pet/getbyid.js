import { getPersonalPet, getPetById } from "@/prisma/pet";

export default async function handler(req, res) {
  const { id } = req.body;
  let { success, message, pet } = await getPetById(id);
  pet = JSON.parse(JSON.stringify(pet));
  res.status(200).json({ success, message, pet });
}
