import { deletePrescriptionById } from "@/prisma/prescription";

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const vaccine = await deletePrescriptionById(id);
    res.status(200).json({
      message: "Vaccine deleted successfully",
      vaccine: vaccine,
    });
  } catch (error) {
    res.status(200).json({ message: "Something went wrong" });
  }
}
