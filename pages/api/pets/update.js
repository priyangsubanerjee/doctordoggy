import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";

export default async function handler(req, res) {
  await connectDatabase();
  const {
    petId,
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
  } = JSON.parse(req.body);

  try {
    let pet_ = await pet.findByIdAndUpdate(
      { _id: petId },
      {
        image: {
          url: fileUrl,
          publicId: publicId,
        },
        name: name,
        family: family,
        sex: sex,
        dateOfBirth: dateOfBirth.toString(),
        breed: breed,
        color: color,
        weight: weight.toString(),
        historyOfComplications: historyOfComplications || "",
      }
    );
    if (pet_) {
      res.status(200).json({ success: true, pet: pet_ });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(200).json({ success: false });
  }
}
