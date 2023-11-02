import { uploadPrescription } from "@/prisma/prescription";

export default async function handler(req, res) {
  const prescription = req.body;
  try {
    let prescriptionCreated = await uploadPrescription(prescription);
    res.status(200).json({
      message: "Prescription uploaded successfully",
      prescription: prescriptionCreated,
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading prescription" });
  }
}
