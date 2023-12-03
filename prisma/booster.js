import prisma from "./prisma";

export const createBooster = async (name) => {
  try {
    const booster = await prisma.booster.create({
      data: {
        name: name,
      },
    });
    return booster;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBoosters = async () => {
  try {
    const boosters = await prisma.booster.findMany();
    return boosters;
  } catch (error) {
    console.log(error);
    return null;
  }
};
