import { getDewormingsByEmail } from "@/prisma/deworming";

export default async function handler(req, res) {
  let dewormings = await getDewormingsByEmail(req.body.email);
  dewormings = JSON.parse(JSON.stringify(dewormings));
  res.status(200).json({
    dewormings: dewormings,
  });
}
