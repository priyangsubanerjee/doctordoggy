import connectDatabase from "@/db/connect";
import account from "@/db/models/account";
import pet from "@/db/models/pet";
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = require("twilio")(accountSid, authToken);

export default async function handler(req, res) {
  await connectDatabase();

  let pets_ = await pet.find({});

  if (pets_.length != 0) {
    for (let i = 0; i < pets_.length; i++) {
      let pet = pets_[i];
      let parentEmail = pet.parentEmail;
      let parent_ = await account.findOne({ email: parentEmail });
      let vaccineRecords = pet.vaccinationRecords;
      if (vaccineRecords.length != 0) {
        for (let j = 0; j < vaccineRecords.length; j++) {
          let vaccineRecord = vaccineRecords[j];
          if (vaccineRecord.vaccineStatus == "due") {
            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            let vaccineDate = new Date(vaccineRecord.dueDate);

            if (
              vaccineDate.getDate() == tomorrow.getDate() &&
              vaccineDate.getMonth() == tomorrow.getMonth() &&
              vaccineDate.getFullYear() == tomorrow.getFullYear()
            ) {
              let msg = `Good evening, ${parent_.name}! This is a reminder that ${pet.name} has a vaccination due tomorrow. Please make sure to get it done. You can reach us for more information at +91 9996512944. Thank you! - Team DoctorDoggy`;
              await client.messages.create({
                body: msg,
                from: process.env.TWILIO_NUMBER,
                to: `+91${parent_.phone}`,
              });
            }
          }
        }
      }
    }
  }

  res.status(200).json({ name: "John Doe" });
}
