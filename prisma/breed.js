import prisma from "./prisma";

export const createBreed = async (name, type) => {
  try {
    let breed = await prisma.breed.create({
      data: {
        name,
        type,
      },
    });
    return breed;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getBreeds = async () => {
  try {
    let breeds = await prisma.breed.findMany();
    return {
      success: true,
      breeds: breeds,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      breeds: [],
    };
  }
};
