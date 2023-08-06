import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";

export default async function handler(req, res) {
  await connectDatabase();
  const { id } = JSON.parse(req.body);
  try {
    let pet_ = await pet.findByIdAndDelete(id);
    if (pet_) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(200).json({ success: false });
  }
}
