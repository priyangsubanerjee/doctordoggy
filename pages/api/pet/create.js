import { registerPet } from "@/prisma/pet";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ success: false, message: "You must be logged in." });
    return;
  }
  console.log("Create request received");
  const { pet, sessionEmail } = req.body;
  console.log("Register pet function called");
  const { success, message } = await registerPet(pet, sessionEmail);
  console.log("Returning response to create request");
  res.status(200).json({ success, message });
}
