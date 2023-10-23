import { update_user_phone_zip } from "@/prisma/user";

export default async function handler(req, res) {
  const { email, phone, zip } = req.body;
  const response = await update_user_phone_zip(email, phone, zip);
  res.json(response);
}
