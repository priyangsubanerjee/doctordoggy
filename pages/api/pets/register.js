import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";

export default async function handler(req, res) {
  await connectDatabase();
  const {
    fileUrl,
    publicId,
    name,
    family,
    sex,
    dateOfBirth,
    breed,
    color,
    weight,
    historyOfComplications,
    parentEmail,
    createdOn,
  } = JSON.parse(req.body);

  try {
    const pet_ = await pet.create({
      image: {
        url: fileUrl,
        publicId: publicId,
      },
      createdOn: createdOn,
      name: name,
      family: family,
      sex: sex,
      dateOfBirth: dateOfBirth.toString(),
      breed: breed,
      color: color,
      weight: weight.toString(),
      historyOfComplications: historyOfComplications || "",
      parentEmail: parentEmail,
    });
    if (pet_) {
      res.status(200).json({ success: true, pet: pet_ });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(200).json({ success: false });
  }
}
