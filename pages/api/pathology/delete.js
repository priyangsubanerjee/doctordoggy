import { deletePathologyReportById } from "@/prisma/pathology";

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const report = await deletePathologyReportById(id);
    res.status(200).json({
      message: "Report deleted successfully",
      report: report,
    });
  } catch (error) {
    res.status(200).json({ message: "Something went wrong" });
  }
}
