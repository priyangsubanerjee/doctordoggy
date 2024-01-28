import { sendMail } from "@/helper/sendMail";
import { sendSMS } from "@/helper/sendSMS";
import { scheduleDeworming } from "@/prisma/deworming";
import { uploadPathologyReport } from "@/prisma/pathology";
import { GeneralMessage } from "@/templates/General";

export default async function handler(req, res) {
  const n_record = req.body;
  let { success, message, deworming } = await scheduleDeworming(n_record);
  let date = new Date(deworming.dueDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  if (success) {
    try {
      await sendSMS(
        `+91${deworming.parentPhone}`,
        `Deworming scheduled 📆\n\nDear pet parent, ${deworming.name} is due for vaccination on ${date} (Indian Standard Time). Please check the app for more details. \n\n- DoctorDoggy\nhttps://doctordoggy.vet/deworming`
      );
    } catch (error) {}
    await sendMail(
      process.env.ZOHO_MAIL,
      process.env.ZOHO_PASS,
      deworming.parentEmail,
      "Deworming scheduled 📅",
      GeneralMessage(
        `Deworming scheduled`,
        `Dear pet parent, ${deworming.name} is due for deworming on ${date} (Indian Standard Time). Please check the app for more details.`
      )
    );
  }
  res.status(200).json({
    success: success,
    message: message,
  });
}
