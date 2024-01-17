import { scheduleDeworming } from "@/prisma/deworming";
import { uploadPathologyReport } from "@/prisma/pathology";

export default async function handler(req, res) {
  const n_record = req.body;
  let { success, message } = await scheduleDeworming(n_record);
  res.status(200).json({
    success: success,
    message: message,
  });
}
