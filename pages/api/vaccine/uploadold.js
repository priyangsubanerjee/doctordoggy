import { sendMail } from "@/helper/sendMail";
import { sendSMS } from "@/helper/sendSMS";
import { uploadOldVaccine } from "@/prisma/vaccine";
import { GeneralMessage } from "@/templates/General";

export default async function handler(req, res) {
  const vProp = req.body;
  let { success, message, vaccine } = await uploadOldVaccine(vProp);
  let date = new Date(vaccine.dueDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  if (success) {
    await sendSMS(
      `+91${vaccine.parentPhone}`,
      `Old vaccination scheduled 📆\n\nDear pet parent, ${vaccine.name} is due for vaccination on ${date} (Indian Standard Time). Please check the app for more details. \n\n- DoctorDoggy\nhttps://doctordoggy.vet/vaccination?filter=due`
    );
    await sendMail(
      process.env.ZOHO_MAIL,
      process.env.ZOHO_PASS,
      vaccine.parentEmail,
      "Vaccination scheduled 📅",
      GeneralMessage(
        `Vaccination scheduled`,
        `Dear pet parent, ${vaccine.name} is due for vaccination on ${date} (Indian Standard Time). Please check the app for more details.`
      )
    );
  }
  res.status(200).json({
    success,
    vaccine,
    message,
  });
}
