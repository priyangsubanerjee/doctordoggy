import connectDatabase from "@/db/connect";
import pets from "@/db/models/pet";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const apiSecret = req.headers.authorization;
  //   if (apiSecret !== process.env.CRON_API_SECRET) {
  //     res.status(401).json({ success: false, message: "Unauthorized" });
  //   }
  await connectDatabase();
  let registeredToday = await pets.find({
    createdOn: new Date().toDateString(),
  });
  if (registeredToday) {
    res.status(200).json({
      success: true,
      registeredToday: registeredToday,
      // date of india today

      createdOn: new Date().toDateString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    });
  } else {
    res.status(200).json({ success: false });
  }
}
