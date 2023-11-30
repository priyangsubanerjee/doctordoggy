import { vaccinesDueToday } from "@/prisma/vaccine";

export default async function handler(req, res) {
  try {
    let { emails, title, body } = await vaccinesDueToday();
    console.log(emails, title, body);
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      try {
        await fetch("http://localhost:3000/api/fcm/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            title,
            body,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).json({ message: "Notification sent" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
}
