import { getDueDewormingsToday } from "@/prisma/deworming";
import { getVaccinesDueToday, getVaccinesDueTomorrow } from "@/prisma/vaccine";

export default async function handler(req, res) {
  let { data } = await getVaccinesDueTomorrow();
  res.status(200).json({ data });
}
