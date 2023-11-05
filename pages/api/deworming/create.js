import { scheduleDeworming } from "@/prisma/deworming";
import { uploadPathologyReport } from "@/prisma/pathology";

export default async function handler(req, res) {
  const record = req.body;
  try {
    let recordCreated = await scheduleDeworming(record);
    res.status(200).json({ report: recordCreated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
