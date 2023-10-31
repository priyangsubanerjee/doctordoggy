import { updateVisibility } from "@/prisma/pet";

export default async function handler(req, res) {
  const { id, isPublic } = req.body;
  const pet = await updateVisibility(id, isPublic);
  res.status(200).json(pet);
}
