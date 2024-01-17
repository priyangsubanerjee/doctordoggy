import { getDewormers } from "@/prisma/dewormer";

export default async function handler(req, res) {
  const { success, dewormers } = await getDewormers();
  res.status(200).json({
    success: success,
    dewormers: dewormers,
  });
}
