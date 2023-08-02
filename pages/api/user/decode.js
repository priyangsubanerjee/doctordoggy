// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

export default function handler(req, res) {
  const { token } = JSON.parse(req.body);
  const user = jwt.verify(token, "hello");

  res.status(200).json({ success: true, user });
}
