import { getBoosters } from "@/prisma/booster";

export default async function handler(req, res) {
  // check headers for authorization
  let boosters = await getBoosters();
  boosters = JSON.parse(JSON.stringify(boosters));
  res.status(200).json(boosters);
}
