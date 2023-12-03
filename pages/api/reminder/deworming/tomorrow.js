import { sendBulkNotification } from "@/helper/fcm/notifications";
import { getDueDewormingsTomorrow } from "@/prisma/deworming";
import { getFCMTokens } from "@/prisma/token";

export default async function handler(req, res) {
  let tokens = [];
  let messageTitle = "Dewormings Due Tomorrow";
  let messageBody =
    "You have schedules dewormings for your pets tomorrow. Please check the app for more details.";
  const emails = await getDueDewormingsTomorrow();

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
