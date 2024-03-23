import { GetAppointmentByCode } from "@/prisma/appointment";
import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { code } = req.body;
  let { success, message } = await GetAppointmentByCode(code);
  res.status(200).json({ success, message });
}
