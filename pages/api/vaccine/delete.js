import { deleteVaccineById } from "@/prisma/vaccine";

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const vaccine = await deleteVaccineById(id);
    res.status(200).json({
      success: true,
      message: "Vaccine deleted successfully",
    });
  } catch (error) {
    res.status(200).json({ success: false, message: "Something went wrong" });
  }
}
