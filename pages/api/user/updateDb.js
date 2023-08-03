import connectDatabase from "@/db/connect";
import account from "@/db/models/account";

export default async function handler(req, res) {
  await connectDatabase();
  const { name, email, phone, pincode, address } = JSON.parse(req.body);

  try {
    let account_ = await account.findOneAndUpdate(
      { email: email },
      {
        phone: phone,
        pincode: pincode,
        address: address,
      }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
}
