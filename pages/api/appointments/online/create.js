import { ScheduleOnlineConsulation } from "@/prisma/appointment";

export default async function handler(req, res) {
  let { petId, doctorId, parentEmail, date, time, reason } = req.body;
  let { success, message } = await ScheduleOnlineConsulation(
    petId,
    doctorId,
    parentEmail,
    date,
    time,
    reason
  );
  res.status(200).json({ success, message });
}
