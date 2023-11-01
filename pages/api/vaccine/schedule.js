import { scheduleVaccine } from "@/prisma/vaccine";

export default async function handler(req, res) {
  const vaccineProp = req.body;
  try {
    let vaccineCreated = await scheduleVaccine(vaccineProp);
    res.status(200).json({
      message: "Vaccine scheduled successfully",
      vaccine: vaccineCreated,
    });
  } catch (error) {}
  res.status(200).json({ message: "Something went wrong" });
}
