import { getDewormingsByPetId } from "@/prisma/deworming";
import { getPathologyReportsByPetId } from "@/prisma/pathology";
import { getPersonalPet, getPetById } from "@/prisma/pet";
import { getPrescriptionsByPetId } from "@/prisma/prescription";

export default async function handler(req, res) {
  const { id } = req.body;
  let { success, message, reports } = await getPathologyReportsByPetId(id);
  reports = JSON.parse(JSON.stringify(reports));
  res.status(200).json({ success, message, reports });
}
