// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GetAllDoctors } from "@/prisma/doctor";

export default async function handler(req, res) {
  let { success, doctors } = await GetAllDoctors(false);
  res.status(200).json({ success, doctors });
}
