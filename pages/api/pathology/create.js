import { uploadPathologyReport } from "@/prisma/pathology";

export default async function handler(req, res) {
  const report = req.body;
  try {
    let reportCreated = await uploadPathologyReport(report);
    res.status(200).json({ report: reportCreated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
