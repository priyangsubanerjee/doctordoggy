import { updateVaccineById } from "@/prisma/vaccine";

export default async function handler(req, res) {
  const { id, doneBy, doneDate, files } = req.body;

  try {
    let { vaccine } = await updateVaccineById(
      id,
      "DONE",
      doneDate,
      doneBy,
      files
    );
    if (vaccine) {
      res.status(200).json({ vaccine });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}
