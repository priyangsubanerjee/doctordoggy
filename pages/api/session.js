import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getDueDewormingsTomorrow } from "@/prisma/deworming";

export default async function handler(req, res) {
  //const session = await getDueDewormingsTomorrow();
  res.status(200).json({ session: null });
}
