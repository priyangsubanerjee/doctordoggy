import { uploadPathologyReport } from "@/prisma/pathology";

export default async function handler(req, res) {
  const report = req.body;

  let { success, message } = await uploadPathologyReport(report);
  res.status(200).json({ success, message });
}
