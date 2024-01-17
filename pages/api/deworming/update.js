import { updateDewormingStatusById } from "@/prisma/deworming";

export default async function handler(req, res) {
  const { id, status } = req.body;

  const { success, message } = await updateDewormingStatusById(id, status);
  res.status(200).json({
    success,
    message,
  });
}
