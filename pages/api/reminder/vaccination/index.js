import connectDatabase from "@/db/connect";
import account from "@/db/models/account";
import pet from "@/db/models/pet";
const accountSid = "ACafc797bf508114ef358e8d7fe48f1ee3";
const authToken = "f93ce162413940ce90090c1260b2e491";
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
            // check if vaccine is today or tomorrow

            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            let vaccineDate = new Date(vaccineRecord.dueDate);

            if (
              vaccineDate.getDate() == today.getDate() &&
              vaccineDate.getMonth() == today.getMonth() &&
              vaccineDate.getFullYear() == today.getFullYear()
            ) {
              // send notification to parent
              const message = await client.messages.create({
                body: `Vaccination due today for ${pet.name}!`,
                from: "+14194556963",
                to: `+91${parent_.phone}`,
              });
            }

            if (
              vaccineDate.getDate() == tomorrow.getDate() &&
              vaccineDate.getMonth() == tomorrow.getMonth() &&
              vaccineDate.getFullYear() == tomorrow.getFullYear()
            ) {
              let msg = `Good evening, ${parent_.name}! This is a reminder that ${pet.name} has a vaccination due tomorrow. Please make sure to get it done. You can reach us for more information at +91 9996512944. Thank you! - Team DoctorDoggy`;
              const message = await client.messages.create({
                body: msg,
                from: "+14194556963",
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
