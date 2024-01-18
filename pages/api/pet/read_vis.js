import { getPetById } from "@/prisma/pet";

export default async function handler(req, res) {
  const { id, email } = req.body;
  let { success, message, pet } = await getPetById(id);
  let isPublic = pet.isPublic;
  let isParent = pet.parentEmail == email;
  res.status(200).json({ success, isPublic, isParent, message });
}
