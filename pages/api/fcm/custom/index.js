// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { sendBulkNotification } from "@/helper/fcm/notifications";
import { getFCMTokens } from "@/prisma/token";

export default async function handler(req, res) {
  const { email, title, body } = req.body;
  console.log(email, title, body);
  return res.status(200).json({ message: "Notification sent" });
  const fcms = await getFCMTokens(email);
  if (!fcms) return res.status(200).json({ message: "No token found" });
  if (fcms.length == 0)
    return res.status(200).json({ message: "No token found" });
  try {
    await sendBulkNotification(fcms, title, body);
    res.status(200).json({ message: "Notification sent" });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Something went wrong" });
  }
}
