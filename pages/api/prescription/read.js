import { getPrescriptionsByEmail } from "@/prisma/prescription";

export default async function handler(req, res) {
  console.log(req.body.email);
  let prescriptions = await getPrescriptionsByEmail(req.body.email);
  prescriptions = JSON.parse(JSON.stringify(prescriptions));
  res.status(200).json({
    prescriptions: prescriptions,
  });
}
