import { dewormingsDueTomorrowByEmail } from "@/prisma/deworming";
import { vaccinesDueTomorrowEmail } from "@/prisma/vaccine";

export default async function handler(req, res) {
  let { email } = req.body;
  let { vaccines } = await vaccinesDueTomorrowEmail(email);
  let { dewormings } = await dewormingsDueTomorrowByEmail(email);

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
