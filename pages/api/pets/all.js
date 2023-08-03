import pet from "@/db/models/pet";

export default async function handler(req, res) {
  const { email } = JSON.parse(req.body);
  try {
    let pets = await pet.find({ email: email });
    if (pets.length === 0) {
      return res.status(200).json({ success: true, pets: [] });
    } else {
      return res.status(200).json({ success: true, pets: pets });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
}
