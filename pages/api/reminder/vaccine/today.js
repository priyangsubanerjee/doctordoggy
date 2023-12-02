import { sendBulkNotification } from "@/helper/fcm/notifications";
import { getFCMTokens } from "@/prisma/token";
import { getVaccinesDueToday, getVaccinesDueTomorrow } from "@/prisma/vaccine";

export default async function handler(req, res) {
  let tokens = [];
  let messageTitle = "Vaccinations Due Today";
  let messageBody =
    "You have schedules vaccinations for your pets today. Please check the app for more details.";
  const emails = await getVaccinesDueToday();

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
