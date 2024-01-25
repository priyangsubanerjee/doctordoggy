import { sendBulkNotification } from "@/helper/fcm/notifications";
import { sendBulkMail } from "@/helper/sendMail";
import {
  getDueDewormingsToday,
  getOverDueDewormings,
} from "@/prisma/deworming";
import { getFCMTokens } from "@/prisma/token";
import { DewormingDue, DewormingOverDue } from "@/templates/Reminer";

export default async function handler(req, res) {
  let tokens = [];
  let messageTitle = "Dewormings Overdue";
  let messageBody =
    "You have overdue dewormings for your pets. Please check the app for more details.";
  const emails = await getOverDueDewormings();

  if (emails.length == 0) {
    res.status(200).json({ message: "No notifications sent" });
  } else {
    await sendBulkMail(
      process.env.ZOHO_MAIL,
      process.env.ZOHO_PASS,
      emails,
      "Dewormings overdue 🚨",
      DewormingOverDue()
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
}
