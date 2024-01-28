const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

export const sendSMS = async (number, message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_NUMBER,
      to: number,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
// client.messages
//   .create({
//     body: "hi",
//     from: "+14194556963",
//     to: "+18777804236",
//   })
//   .then((message) => console.log(message.sid))
//   .done();
