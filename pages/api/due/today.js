import { dewormingsDueTodayByEmail } from "@/prisma/deworming";
import { getVaccinesDueToday, vaccinesDueTodayByEmail } from "@/prisma/vaccine";

export default async function handler(req, res) {
  let { email } = req.body;

  let { vaccines } = await vaccinesDueTodayByEmail(email);
  let { dewormings } = await dewormingsDueTodayByEmail(email);

  vaccines = vaccines.map((vaccine) => {
    return {
      ...vaccine,
      type: "vaccine",
    };
  });

  dewormings = dewormings.map((deworming) => {
    return {
      ...deworming,
      type: "deworming",
    };
  });

  res.status(200).json({
    success: true,
    vaccines: vaccines,
    dewormings: dewormings,
  });
}
