import { deletePathologyReportById } from "@/prisma/pathology";

export default async function handler(req, res) {
  const { id } = req.body;
  const { success, message } = await deletePathologyReportById(id);
  res.status(200).json({
    success,
    message,
  });
}
