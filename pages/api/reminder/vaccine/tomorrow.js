import { sendBulkNotification } from "@/helper/fcm/notifications";
import { getFCMTokens } from "@/prisma/token";
import { getVaccinesDueTomorrow, vaccinesDueToday } from "@/prisma/vaccine";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  let tokens = [];
  let messageTitle = "Vaccinations Due Tomorrow";
  let messageBody =
    "You have schedules vaccinations for your pets tomorrow. Please check the app for more details.";
  const emails = await getVaccinesDueTomorrow();

  for (let i = 0; i < emails.length; i++) {
    let userTokens = await getFCMTokens(emails[i]);
    tokens = tokens.concat(userTokens);
  }

  let sentResponse = await sendBulkNotification(
    tokens,
    messageTitle,
    messageBody
  );

  if (sentResponse) {
    res.status(200).json({ message: "Notification sent" });
  } else {
    res.status(200).json({ message: "Something went wrong" });
  }
}
