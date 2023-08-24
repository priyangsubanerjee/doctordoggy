import booking from "@/db/models/booking";

export default async function handler(req, res) {
  const { petId, dateTime, serviceType, notes, email } = JSON.parse(req.body);

  let booking_ = new booking({
    petId,
    dateTime,
    serviceType,
    notes,
    email,
  });

  await booking_.save();
  res.status(200).json({
    success: true,
    message: "Booking created successfully",
  });
}
