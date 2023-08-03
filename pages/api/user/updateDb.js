import account from "@/db/models/account";

export default async function handler(req, res) {
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
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: "error",
      message: "Something went wrong",
      error: err.message,
    });
  }
}
