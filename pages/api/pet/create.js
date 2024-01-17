import { registerPet } from "@/prisma/pet";

export default async function handler(req, res) {
  console.log("Create request received");
  const { pet, sessionEmail } = req.body;
  console.log("Register pet function called");
  const { success, message } = await registerPet(pet, sessionEmail);
  console.log("Returning response to create request");
  res.status(200).json({ success, message });
}
