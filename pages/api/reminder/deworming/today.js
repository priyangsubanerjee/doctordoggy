import { sendBulkNotification } from "@/helper/fcm/notifications";
import { getDueDewormingsToday } from "@/prisma/deworming";
import { getFCMTokens } from "@/prisma/token";

export default async function handler(req, res) {
  let tokens = [];
  let messageTitle = "Dewormings Due Today";
  let messageBody =
    "You have scheduled dewormings for your pets today. Please check the app for more details.";
  const emails = await getDueDewormingsToday();

  if (emails.length == 0) {
    res.status(200).json({ message: "No notifications sent" });
  } else {
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
