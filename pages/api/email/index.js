// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sendMail from "@/helper/email";
import nodemailer from "nodemailer";
export default async function handler(req, res) {
  const { to, html, subject, text } = req.body;
  try {
    let response = await sendMail(to, html, subject, text);
    if (response) {
      res.status(200).json({ message: "Email sent successfully" });
    } else {
      res.status(400).json({ message: "Error sending email" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error sending email" });
  }
}
