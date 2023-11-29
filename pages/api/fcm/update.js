import { updateToken } from "@/prisma/token";

export default async function handler(req, res) {
  const { token, email } = req.body;
  let objectUpdateed = await updateToken(email, token);
  res.status(200).json({ message: "Token updated" });
}
