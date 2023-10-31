import { deletePetById } from "@/prisma/pet";

export default async function handler(req, res) {
  const { id } = req.body;
  const pet = await deletePetById(id);
  res.status(200).json(pet);
}
