import prisma from "./prisma";

export const createDewormer = async (name, type) => {
  try {
    const dewormer = await prisma.dewormer.create({
      data: {
        name: name,
        type: type,
      },
    });
    return dewormer;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDewormers = async () => {
  try {
    const dewormers = await prisma.dewormer.findMany();
    return {
      success: true,
      dewormers: dewormers,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      dewormers: [],
    };
  }
};
