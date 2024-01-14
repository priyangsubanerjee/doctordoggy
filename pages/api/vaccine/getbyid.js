import { getVaccineById, getVaccinesByEmail } from "@/prisma/vaccine";

export default async function handler(req, res) {
  const { id } = req.body;
  let vaccination = await getVaccineById(id);
  vaccination = JSON.parse(JSON.stringify(vaccination));
  res.status(200).json({
    vaccination: vaccination,
  });
}
