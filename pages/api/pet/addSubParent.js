import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { addSubParent } from "@/prisma/pet";
import { GeneralMessage } from "@/templates/General";
import { sendMail } from "@/helper/sendMail";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ success: false, message: "You must be logged in." });
    return;
  }
  const { success, message } = await addSubParent(
    req.body.email,
    req.body.petId
  );
  if (success) {
    await sendMail(
      process.env.ZOHO_MAIL,
      process.env.ZOHO_PASS,
      req.body.email,
      "Pet added to your account 🐾",
      GeneralMessage(
        `Shared pet added to your account`,
        `Dear pet parent, A pet has been added to your account. Please check the app for more details.`
      )
    );
  }
  res.status(200).json({
    success: success,
    message: message,
  });
}
