import connectDatabase from "@/db/connect";
import pets from "@/db/models/pet";

export default async function handler(req, res) {
  const apiSecret = req.headers.authorization;
  if (apiSecret !== process.env.CRON_API_SECRET) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
  await connectDatabase();
  let registeredToday = await pets.find({
    createdOn: new Date().toDateString(),
  });
  if (registeredToday) {
    res.status(200).json({ success: true, registeredToday: registeredToday });
  } else {
    res.status(200).json({ success: false });
  }
}
