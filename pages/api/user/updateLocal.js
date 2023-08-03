import connectDatabase from "@/db/connect";
import account from "@/db/models/account";

export default async function handler(req, res) {
  connectDatabase();
  const { email } = JSON.parse(req.body);
  var user = await account.findOne({ email: email });
  if (user) {
    res.status(200).json({ success: true, user: user });
  } else {
    res.status(200).json({ success: false, user: null });
  }
}
