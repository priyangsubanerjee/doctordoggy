import { getPersonalPet } from "@/prisma/pet";

export default async function handler(req, res) {
  const { email } = req.body;
  console.log("Get request received");
  let pets = await getPersonalPet(email);
  pets = JSON.parse(JSON.stringify(pets));
  console.log(pets);
  res.status(200).json(pets);
}
