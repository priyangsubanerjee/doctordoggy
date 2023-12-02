import { sendBulkNotification } from "@/helper/fcm/notifications";
import { getFCMTokens } from "@/prisma/token";
import NextCors from "nextjs-cors";

export const config = {
  runtime: "edge",
};

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const email = "devpriyangsu@gmail.com";
  let tokens = await getFCMTokens(email);

  if (!tokens) return res.status(200).json({ message: "No token found" });

  if (tokens.length == 0)
    return res.status(200).json({ message: "No token found" });

  await sendBulkNotification(tokens, "Test data", "Ignore this notification");

  res.status(200).json({ message: "Notification sent" });
}
