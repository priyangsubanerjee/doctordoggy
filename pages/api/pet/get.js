import { getPersonalPet } from "@/prisma/pet";

export default async function handler(req, res) {
  const { email } = req.body;
  console.log(email);
  let pets = await getPersonalPet(email);
  pets = JSON.parse(JSON.stringify(pets));
  res.status(200).json(pets);
}
