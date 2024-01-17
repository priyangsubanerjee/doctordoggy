import { getBoosters } from "@/prisma/booster";

export default async function handler(req, res) {
  let { success, boosters } = await getBoosters();
  boosters = JSON.parse(JSON.stringify(boosters));
  res.status(200).json({
    success: success,
    boosters: boosters,
  });
}
