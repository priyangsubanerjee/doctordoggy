import { get_my_pets } from "@/prisma/pet";

export default async function handler(req, res) {
  let pets = await get_my_pets("devpriyangsu@gmail.com");
  pets = JSON.parse(JSON.stringify(pets));
  res.status(200).json(pets);
}
