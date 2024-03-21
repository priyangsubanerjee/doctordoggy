import { ScheduleAppointment } from "@/prisma/meeting";
import { get_user } from "@/prisma/user";

export default async function handler(req, res) {
  let method = req.method;

  if (method == "POST") {
    let data = req.body;
    let parents = [];
    let doctors = [];

    for (let i = 0; i < data.participants.length; i++) {
      let participant = data.participants[i];
      if (participant.type == "doctor") {
        doctors.push({
          ...participant,
          email: "priyangsu26@gmail.com",
        });
      } else if (participant.type == "parent") {
        let user = await get_user(participant.email);
        if (user) {
          parents.push({
            ...participant,
            id: user.id,
          });
        }
      }
    }

    let participants = parents.concat(doctors);
    let code = Math.random().toString(36).substring(7);
    let date = new Date(data.date);
    let time = data.time;
    let reason = data.reason;

    let { success, message } = await ScheduleAppointment(
      code,
      participants,
      date,
      time,
      reason
    );

    res.status(200).json({ success, message });
  } else {
    res.status(405).json({ message: "Protected method" });
  }
}
