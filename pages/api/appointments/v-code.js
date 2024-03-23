import { GetAppointmentByCode } from "@/prisma/appointment";
import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { code, email } = req.body;
  let { success, message } = await GetAppointmentByCode(code, email);
  res.status(200).json({ success, message });
}
