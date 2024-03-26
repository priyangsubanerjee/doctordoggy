import { DeleteAppointment } from "@/prisma/appointment";
import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { id } = req.body;
  let { success, message } = await DeleteAppointment(id);
  if (success) {
    res.status(200).json({ success, message });
  } else {
    res.status(400).json({ success, message });
  }
}
