import { sendBulkNotification } from "@/helper/fcm/notifications";
import { getFCMTokens } from "@/prisma/token";

export default async function handler(req, res) {
  const email = "devpriyangsu@gmail.com";
  let tokens = await getFCMTokens(email);

  if (!tokens) return res.status(200).json({ message: "No token found" });

  if (tokens.length == 0)
    return res.status(200).json({ message: "No token found" });

  await sendBulkNotification(tokens, "Test data", "Ignore this notification");

  res.status(200).json({ message: "Notification sent" });
}
