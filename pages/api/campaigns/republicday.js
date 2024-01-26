// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { sendBulkNotification } from "@/helper/fcm/notifications";
import { sendBulkMail } from "@/helper/sendMail";
import { getFCMTokens } from "@/prisma/token";
import { GetAllUsers } from "@/prisma/user";
import { Republicday } from "@/templates/Republicday";

export default async function handler(req, res) {
  //   let title = "Happy Republic Day 🇮🇳";
  //   let body =
  //     "We wish you a very happy republic day. We are proud to be an Indian.";
  //   const fcms = await getFCMTokens();
  //   let emails = await GetAllUsers();
  //   //await sendBulkNotification(fcms, title, body);
  //   await sendBulkMail(
  //     process.env.ZOHO_MAIL,
  //     process.env.ZOHO_PASS,
  //     ["devpriyangsu@gmail.com"],
  //     "Happy Republic Day 🇮🇳",
  //     Republicday()
  //   );
  res.status(200).json({
    message: "Notification sent",
  });
}
