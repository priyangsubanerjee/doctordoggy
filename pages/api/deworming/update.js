import { updateDewormingStatusById } from "@/prisma/deworming";

export default async function handler(req, res) {
  const { id, status } = req.body;
  try {
    const deworming = await updateDewormingStatusById(id, status);
    res.status(200).json({
      message: "Deworming status updated successfully",
      deworming,
    });
  } catch (error) {
    res.status(200).json({ message: "Something went wrong" });
  }
}
