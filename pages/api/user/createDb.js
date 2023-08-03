import connectDatabase from "@/db/connect";
import account from "@/db/models/account";

export default async function handler(req, res) {
  await connectDatabase();
  const { name, email } = JSON.parse(req.body);
  let present = await account.findOne({ email: email });
  if (present) {
    res
      .status(200)
      .json({ success: true, user: present, message: "User already exists" });
    return;
  }
  try {
    let user = await account.create({
      name,
      email,
    });
    if (user) res.status(200).json({ success: true, user });
    else res.status(200).json({ success: false });
  } catch (error) {
    res.status(200).json({ success: false, message: error.message });
  }
}
