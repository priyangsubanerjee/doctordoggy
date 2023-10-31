import prisma from "./prisma";
export const registerPet = async (pet, sessionEmail) => {
  console.log(pet);
  try {
    const petCreated = await prisma.pet.create({
      data: {
        image: pet.image,
        name: pet.name,
        parentEmail: pet.parentEmail,
        sex: pet.sex,
        bodyWeight: pet.bodyWeight,
        breed: pet.breed,
        dateOfBirth: new Date(pet.dateOfBirth).toISOString(),
        species: pet.species,
        isPublic: pet.isPublic,
        color: pet.color,
        createdBy: sessionEmail,
      },
    });
    return petCreated;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPersonalPet = async (sessionEmail) => {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        parentEmail: sessionEmail,
      },
    });
    return pets;
  } catch (error) {
    return null;
  }
};

export const getPetById = async (id) => {
  try {
    const pet = await prisma.pet.findUnique({
      where: {
        id: id,
      },
    });
    return pet;
  } catch (error) {
    return null;
  }
};

export const updateVisibility = async (id, isPublic) => {
  try {
    const pet = await prisma.pet.update({
      where: {
        id: id,
      },
      data: {
        isPublic: isPublic,
      },
    });
    return pet;
  } catch (error) {
    return null;
  }
};

export const updatePetData = async (id, pet) => {
  try {
    const petUpdated = await prisma.pet.update({
      where: {
        id: id,
      },

      data: {
        image: pet.image,
        name: pet.name,
        sex: pet.sex,
        bodyWeight: pet.bodyWeight,
        breed: pet.breed,
        dateOfBirth: new Date(pet.dateOfBirth).toISOString(),
        species: pet.species,
        color: pet.color,
      },
    });

    return petUpdated;
  } catch (error) {
    console.log(error);
  }
};

export const deletePetById = async (id) => {
  try {
    const pet = await prisma.pet.delete({
      where: {
        id: id,
      },
    });
    return pet;
  } catch (error) {
    return null;
  }
};

export const getAllPets = async () => {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        isPublic: true,
      },
    });
    return pets;
  } catch (error) {
    return null;
  }
};
