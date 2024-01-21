import { sendBulkNotification } from "@/helper/fcm/notifications";
import { sendBulkMail } from "@/helper/sendMail";
import { getDueDewormingsTomorrow } from "@/prisma/deworming";
import { getFCMTokens } from "@/prisma/token";
import { DewormingDue } from "@/templates/Reminer";

export default async function handler(req, res) {
  let tokens = [];
  let messageTitle = "Dewormings Due Tomorrow";
  let messageBody =
    "You have scheduled dewormings for your pets tomorrow. Please check the app for more details.";
  const emails = await getDueDewormingsTomorrow();

  if (emails.length == 0) {
    res.status(200).json({ message: "No notifications sent" });
  }

  await sendBulkMail(
    process.env.ZOHO_MAIL,
    process.env.ZOHO_PASS,
    emails,
    "Deworming due tomorrow ⏰",
    DewormingDue("tomorrow")
  );

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
