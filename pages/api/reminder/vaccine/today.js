import { sendBulkNotification } from "@/helper/fcm/notifications";
import { sendBulkMail } from "@/helper/sendMail";
import { getFCMTokens } from "@/prisma/token";
import { getVaccinesDueToday, getVaccinesDueTomorrow } from "@/prisma/vaccine";
import { VaccinationDue } from "@/templates/Reminer";

export default async function handler(req, res) {
  let tokens = [];
  let messageTitle = "Vaccinations Due Today";
  let messageBody =
    "You have scheduled vaccinations for your pets today. Please check the app for more details.";
  const emails = await getVaccinesDueToday();

  if (emails.length > 0) {
    await sendBulkMail(
      process.env.ZOHO_MAIL,
      process.env.ZOHO_PASS,
      emails,
      "Vaccination due today ⏰",
      VaccinationDue("today")
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
