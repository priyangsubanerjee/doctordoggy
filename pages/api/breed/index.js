import { getBreeds } from "@/prisma/breed";

export default async function handler(req, res) {
  let { success, breeds } = await getBreeds();
  res.status(200).json({
    success: success,
    breeds: breeds,
  });
}
