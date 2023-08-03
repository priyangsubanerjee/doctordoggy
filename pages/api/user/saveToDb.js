import connectDatabase from "@/db/connect";
import account from "@/db/models/account";

export default async function handler(req, res) {
  await connectDatabase();
  const { name, email, phone, pincode, address } = JSON.parse(req.body);

  let user = await account.findOneAndUpdate(
    {
      email,
    },
    {
      name,
      email,
      phone,
      pincode,
      address,
    }
  );
  if (user) res.status(200).json({ success: true, user });
  else res.status(200).json({ success: false });
}
