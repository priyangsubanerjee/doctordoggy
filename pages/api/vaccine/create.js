import { sendMail } from "@/helper/sendMail";
import { sendSMS } from "@/helper/sendSMS";
import { scheduleVaccine } from "@/prisma/vaccine";
import { GeneralMessage } from "@/templates/General";

export default async function handler(req, res) {
  const vaccineProp = req.body;
  try {
    let { success, vaccine, message } = await scheduleVaccine(vaccineProp);
    let date = new Date(vaccine.dueDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    console.log(success, vaccine);
    if (success) {
      try {
        await sendSMS(
          `+91${vaccine.parentPhone}`,
          `Dear pet parent, ${vaccine.name} is due for vaccination on ${date} (Indian Standard Time). Please check the app for more details. \n\n- DoctorDoggy\nhttps://doctordoggy.vet`
        );
      } catch (error) {
        console.log(error);
      }
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
  } catch (error) {
    res.status(200).json({ message: "Something went wrong" });
  }
}
