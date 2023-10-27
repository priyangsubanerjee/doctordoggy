import { getAllPets, registerPet } from "@/prisma/pet";

export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "POST":
      let { pet, sessionEmail } = req.body;
      await registerPet(pet, sessionEmail);
      res.status(200).json({ message: "Pet registered successfully" });
      break;
    case "GET":
      let pets = await getAllPets();
      res.status(200).json({ pets });
      break;
  }
}
