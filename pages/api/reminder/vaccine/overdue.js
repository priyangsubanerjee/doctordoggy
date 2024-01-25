import { sendBulkNotification } from "@/helper/fcm/notifications";
import { sendBulkMail } from "@/helper/sendMail";
import { getFCMTokens } from "@/prisma/token";
import {
  getOverDueVaccines,
  getVaccinesDueToday,
  getVaccinesDueTomorrow,
} from "@/prisma/vaccine";
import { VaccinationDue, VaccinationOverDue } from "@/templates/Reminer";

export default async function handler(req, res) {
  let tokens = [];
  let messageTitle = "Vaccinations overdue";
  let messageBody =
    "You have overdue vaccinations for your pets. Please check the app for more details.";
  const emails = await getOverDueVaccines();

  if (emails.length > 0) {
    await sendBulkMail(
      process.env.ZOHO_MAIL,
      process.env.ZOHO_PASS,
      emails,
      "Vaccination overdue 🚨",
      VaccinationOverDue()
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
  } else {
    res.status(200).json({ message: "No notifications sent" });
  }
}
