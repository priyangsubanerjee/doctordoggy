import { ScheduleOnlineConsulation } from "@/prisma/appointment";

export default async function handler(req, res) {
  let { petId, doctorId, parentEmail, date, time, reason } = req.body;
  let code =
    Math.floor(100000 + Math.random() * 900000) +
    "-" +
    Math.floor(100000 + Math.random() * 900000);

  let { success, message } = await ScheduleOnlineConsulation(
    petId,
    doctorId,
    parentEmail,
    date,
    time,
    reason,
    code
  );
  res.status(200).json({ success, message });
}
