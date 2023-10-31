import { updatePetData } from "@/prisma/pet";

export default async function handler(req, res) {
  const { id, pet, sessionEmail } = req.body;

  try {
    const petUpdated = await updatePetData(id, pet);
    res.status(200).json({ message: "Pet updated successfully", petUpdated });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Something went wrong" });
  }
}
