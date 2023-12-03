import { getDewormers } from "@/prisma/dewormer";

export default async function handler(req, res) {
  const dewormers = await getDewormers();
  res.status(200).json(dewormers);
}
