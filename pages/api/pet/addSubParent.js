import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { addSubParent } from "@/prisma/pet";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ success: false, message: "You must be logged in." });
    return;
  }
  const { success, message } = await addSubParent(
    req.body.email,
    req.body.petId
  );
  res.status(200).json({
    success: success,
    message: message,
  });
}
