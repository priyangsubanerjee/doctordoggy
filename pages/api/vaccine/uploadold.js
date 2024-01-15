import { uploadOldVaccine } from "@/prisma/vaccine";

export default async function handler(req, res) {
  const vProp = req.body;
  let vaccine = await uploadOldVaccine(vProp);
  vaccine = JSON.parse(JSON.stringify(vaccine));
  res.status(200).json(vaccine);
}
