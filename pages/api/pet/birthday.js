// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { sendMail } from "@/helper/sendMail";
import { getBirthdaysToday } from "@/prisma/pet";
import { TodayBirthday } from "@/templates/Birthday";

export default async function handler(req, res) {
  let { pets, success, message } = await getBirthdaysToday();

  for (let i = 0; i < pets.length; i++) {
    let pet = pets[i];
    console.log(pet);

    try {
      let { message } = await sendMail(
        process.env.ZOHO_MAIL,
        process.env.ZOHO_PASS,
        pet.email,
        `Happy Birthday ${pet.name} 🎂`,
        TodayBirthday(pet.name)
      );
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  }

  res.status(200).json({ success, message });
}
