import { sendBulkNotification } from "@/helper/fcm/notifications";
import { sendBulkMail } from "@/helper/sendMail";
import { ScheduleOnlineConsulation } from "@/prisma/appointment";
import { getFCMTokens } from "@/prisma/token";
import { GeneralMessage } from "@/templates/General";

export default async function handler(req, res) {
  let { petId, doctorId, parentEmail, date, time, reason } = req.body;
  let code =
    Math.floor(100000 + Math.random() * 900000) +
    "-" +
    Math.floor(100000 + Math.random() * 900000);

  let { success, message, appointment } = await ScheduleOnlineConsulation(
    petId,
    doctorId,
    parentEmail,
    date,
    time,
    reason,
    code
  );

  let p_email = appointment.parent.email;
  let d_email = appointment.doctor.email;
  let d_tokens = await getFCMTokens(d_email);

  // send emails to parent and doctor

  await sendBulkMail(
    process.env.ZOHO_MAIL,
    process.env.ZOHO_PASS,
    p_email,
    "Appointment Scheduled",
    GeneralMessage(
      "Appointment Scheduled",
      `You have an appointment with ${appointment.doctor.name} on ${date} at ${time}, for ${appointment.pet.name}. Please be available at the scheduled time. You will be notified if the meeting is rescheduled by doctor.<br/> <br/> Click here to join the meet <a href="https://doctordoggy.vet/meet/${appointment.code}">Join Meet</a>`
    )
  );

  await sendBulkMail(
    process.env.ZOHO_MAIL,
    process.env.ZOHO_PASS,
    d_email,
    "Appointment Scheduled",
    GeneralMessage(
      "Appointment Scheduled",
      `You have an appointment with ${appointment.pet.name}'s parents on ${date} at ${time}, topic: ${appointment.reason}. Please be available at the scheduled time. You will be notified if the meeting is canceled by parent. <br/> <br/> Click here to join the meet <a href="https://doctors.doctordoggy.vet/meet/${appointment.code}">Join Meet</a> <br/> <br/>`
    )
  );

  await sendBulkNotification(
    d_tokens,
    "Appointment Scheduled",
    `You have an appointment with ${appointment.pet.name}'s parents on ${date} at ${time},`
  );

  res.status(200).json({ success, message });
}
