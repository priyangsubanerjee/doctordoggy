import { getPersonalPet, getPersonalPet_rf } from "@/prisma/pet";

export default async function handler(req, res) {
  const { email } = req.body;
  let { success, pets, message } = await getPersonalPet_rf(email);
  pets = JSON.parse(JSON.stringify(pets));
  res.status(200).json({ success, pets, message });
}
