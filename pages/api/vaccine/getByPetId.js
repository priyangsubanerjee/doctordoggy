import {
  getVaccineById,
  getVaccineByPetId,
  getVaccinesByEmail,
} from "@/prisma/vaccine";

export default async function handler(req, res) {
  const { id } = req.body;
  let { success, vaccines, message } = await getVaccineByPetId(id);
  vaccines = JSON.parse(JSON.stringify(vaccines));
  res.status(200).json({
    success,
    message,
    vaccines,
  });
}
