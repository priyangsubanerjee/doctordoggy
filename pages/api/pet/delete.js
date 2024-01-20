import { deletePetById } from "@/prisma/pet";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const { id } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ success: false, message: "You must be logged in." });
    return;
  }
  const { success, message } = await deletePetById(id, session.user.email);
  res.status(200).json({
    success,
    message,
  });
}
