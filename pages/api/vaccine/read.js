import { getVaccinesByEmail } from "@/prisma/vaccine";

export default async function handler(req, res) {
  console.log(req.body.email);
  let vaccinations = await getVaccinesByEmail(req.body.email);
  vaccinations = JSON.parse(JSON.stringify(vaccinations));
  res.status(200).json({
    vaccinations: vaccinations,
  });
}
