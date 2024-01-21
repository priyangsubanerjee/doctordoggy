import { getDueDewormingsToday } from "@/prisma/deworming";
import { getVaccinesDueToday } from "@/prisma/vaccine";

export default async function handler(req, res) {
  let { data } = await getVaccinesDueToday();
  res.status(200).json({ data });
}
