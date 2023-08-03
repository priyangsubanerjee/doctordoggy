import pet from "@/db/models/pet";

export default async function handler(req, res) {
  const {
    image,
    name,
    family,
    sex,
    dateOfBirth,
    breed,
    color,
    weight,
    complications,
    parentEmail,
  } = JSON.parse(req.body);

  try {
    const pet_ = await pet.create({
      image,
      name,
      family,
      sex,
      dateOfBirth,
      breed,
      color,
      weight,
      complications,
      parentEmail,
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
