import { getPathologyReportsByEmail } from "@/prisma/pathology";

export default async function handler(req, res) {
  const { email } = req.body;
  console.log(email);
  let { success, message, reports } = await getPathologyReportsByEmail(email);
  reports = JSON.parse(JSON.stringify(reports));
  res.status(200).json({ success, message, reports });
}
