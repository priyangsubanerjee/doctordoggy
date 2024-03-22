import { ScheduleOnlineConsulation } from "@/prisma/appointment";

export default async function handler(req, res) {
  let { petId } = req.body;
  let { success, message } = await ScheduleOnlineConsulation(petId);
  res.status(200).json({ success, message });
}
