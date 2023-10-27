import { register_pet } from "@/prisma/pet";

export default async function handler(req, res) {
  console.log("Create request received");
  const { pet, file, sessionEmail } = req.body;
  try {
    console.log("Register pet function called");
    const petCreated = await register_pet(pet, file, sessionEmail);
    console.log("Returning response to create request");
    res.status(200).json({ message: "Pet created successfully", petCreated });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
}
