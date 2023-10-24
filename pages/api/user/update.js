import { update_user_phone_zip } from "@/prisma/user";

export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "POST":
      const { email, phone, zipcode, address } = req.body;
      const response = await update_user_phone_zip(
        email,
        phone,
        zipcode,
        address
      );

      return res.json(response);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
