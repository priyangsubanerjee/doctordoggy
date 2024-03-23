import { GetAppointmentsByEmail } from "@/prisma/appointment";
import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { email } = req.body;
  let { success, appointments, message } = await GetAppointmentsByEmail(email);
  if (success) {
    res.status(200).json({ success, appointments, message });
  } else {
    res.status(400).json({ success, message });
  }
}
