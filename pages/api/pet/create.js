import { registerPet } from "@/prisma/pet";

export default async function handler(req, res) {
  console.log("Create request received");
  const { pet, sessionEmail } = req.body;
  try {
    console.log("Register pet function called");
    const petCreated = await registerPet(pet, sessionEmail);
    console.log("Returning response to create request");
    res.status(200).json({ message: "Pet created successfully", petCreated });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Something went wrong" });
  }
}
