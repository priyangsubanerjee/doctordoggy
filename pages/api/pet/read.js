import { getPersonalPet } from "@/prisma/pet";

export default async function handler(req, res) {
  let pets = await getPersonalPet(req.body.email);
  pets = JSON.parse(JSON.stringify(pets));
  res.status(200).json({
    pets: pets,
  });
}
