import { getPetById } from "@/prisma/pet";

export default async function handler(req, res) {
  const { id } = req.body;
  let { success, message, pet } = await getPetById(id);
  if (pet) {
    res.status(200).json({ success, message, exists: true });
  } else {
    res.status(200).json({ success, message, exists: false });
  }
}
