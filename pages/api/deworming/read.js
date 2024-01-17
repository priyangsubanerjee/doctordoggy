import { getDewormingsByEmail } from "@/prisma/deworming";

export default async function handler(req, res) {
  let { dewormings, success, message } = await getDewormingsByEmail(
    req.body.email
  );
  dewormings = JSON.parse(JSON.stringify(dewormings));
  res.status(200).json({
    success: success,
    message: message,
    dewormings: dewormings,
  });
}
