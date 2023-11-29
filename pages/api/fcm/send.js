// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getTokens } from "@/prisma/token";

export default async function handler(req, res) {
  const { email, title, body } = req.body;

  const fcms = await getTokens(email);
  console.log(fcms.tokens);

  try {
    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=AAAADk1G134:APA91bE8f01fVRakH3RUgnRRv88NT09BvgqN3CH2oQacyIt6p-YFeZofNwWYxiiErhkEEELHPaQVXNMlMoMe3RMqR0dR_3PasL4CpfevxKKL0P4_i4UT0OoKPoc5_uO5pXZVvvV6bvxP`,
      },
      body: JSON.stringify({
        registration_ids: fcms.tokens,
        priority: "high",
        data: {
          title,
          body,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ name: "John Doe" });
}
