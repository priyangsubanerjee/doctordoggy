import { deleteDewormingById } from "@/prisma/deworming";

export default async function handler(req, res) {
  const { id } = req.body;
  const { success, message } = await deleteDewormingById(id);
  res.status(200).json({
    success: success,
    message: message,
  });
}
