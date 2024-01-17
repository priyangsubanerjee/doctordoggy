import { deletePetById } from "@/prisma/pet";

export default async function handler(req, res) {
  const { id } = req.body;
  const { success, message } = await deletePetById(id);
  res.status(200).json({
    success,
    message,
  });
}
