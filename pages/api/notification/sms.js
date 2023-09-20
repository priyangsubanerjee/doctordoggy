const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = require("twilio")(accountSid, authToken);

export default async function handler(req, res) {
  const { to, body } = JSON.parse(req.body);

  try {
    await client.messages.create({
      body,
      from: process.env.TWILIO_NUMBER,
      to,
    });

    res.status(200).json({
      success: true,
      message: `Sent sms to ${to}!`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error sending sms to ${to}!`,
      error: error.message,
    });
  }
}
