// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  const { name, email, phone, pincode, address } = JSON.parse(req.body);
  let userObj = {
    name,
    email,
    phone,
    pincode,
    address,
  };

  let token = await jwt.sign(userObj, process.env.USER_SECRET);

  await setCookie("user", token, {
    req,
    res,
    maxAge: 60 * 60 * 24 * 7 * 50000, // 1 week
  });

  res.status(200).json({ success: true });
}
