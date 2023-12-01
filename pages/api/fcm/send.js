// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getFCMTokens } from "@/prisma/token";

export default async function handler(req, res) {
  const { email, title, body } = req.body;
  const fcms = await getFCMTokens(email);
  if (!fcms) return res.status(200).json({ message: "No token found" });
  if (fcms.length == 0)
    return res.status(200).json({ message: "No token found" });
  try {
    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=AAAADk1G134:APA91bE8f01fVRakH3RUgnRRv88NT09BvgqN3CH2oQacyIt6p-YFeZofNwWYxiiErhkEEELHPaQVXNMlMoMe3RMqR0dR_3PasL4CpfevxKKL0P4_i4UT0OoKPoc5_uO5pXZVvvV6bvxP`,
      },
      body: JSON.stringify({
        registration_ids: fcms,
        priority: "high",
        data: {
          title,
          body,
        },
      }),
    });
    res.status(200).json({ message: "Notification sent" });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Something went wrong" });
  }
}
