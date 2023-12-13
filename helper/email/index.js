// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from "nodemailer";
export default async function sendMail(to, html, subject, text) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_SSID,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });
  var options = {
    from: `Priyangsu from Doctor Doggy <databasedoctordoggy@gmail.com>`,
    to,
    subject,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DD</title>
  </head>
  <body style="display: flex">
    <img
      src="https://res.cloudinary.com/db9kd4qbi/image/upload/v1702383397/iPhone_13_14_l6xu6e.png"
      alt=""
      style="
        width: 100%;
        object-fit: contain;
        max-width: 400px;
        margin: auto auto;
      "
    />
  </body>
</html>
`,
    text,
  };
  let response = await transporter.sendMail(options);
  if (response) {
    return {
      success: true,
      data: response,
    };
  } else {
    return {
      success: false,
      data: response,
    };
  }
}
