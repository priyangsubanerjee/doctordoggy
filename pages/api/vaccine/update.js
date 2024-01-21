import { updateVaccineById } from "@/prisma/vaccine";

export default async function handler(req, res) {
  const { id, doneBy, doneDate, files } = req.body;

  let { success, message } = await updateVaccineById(
    id,
    "DONE",
    doneDate,
    doneBy,
    files
  );

  res.status(200).json({
    success,
    message,
  });
}
