import { CheckDuplicatePin } from "@/prisma/user";

export default async function handler(req, res) {
  let { pin } = req.body;
  let { success, message } = await CheckDuplicatePin(pin);
  res.status(200).json({
    success,
    message,
  });
}
