import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  let data = await prisma.appointment.findMany({
    include: {
      pet: true,
      parent: true,
    },
  });
  res.status(200).json(data);
}
