import { getBoosters } from "@/prisma/booster";

export default async function handler(req, res) {
  let boosters = await getBoosters();
  boosters = JSON.parse(JSON.stringify(boosters));
  res.status(200).json(boosters);
}
