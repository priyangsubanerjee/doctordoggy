import { deleteDewormingById } from "@/prisma/deworming";

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    const report = await deleteDewormingById(id);
    res.status(200).json({
      message: "Report deleted successfully",
      report: report,
    });
  } catch (error) {
    res.status(200).json({ message: "Something went wrong" });
  }
}
