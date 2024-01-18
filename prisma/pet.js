import prisma from "./prisma";
export const registerPet = async (pet, sessionEmail) => {
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
    return {
      success: true,
      message: "Pet created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
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

export const getPersonalPet_rf = async (sessionEmail) => {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        parentEmail: sessionEmail,
      },
    });
    return {
      success: true,
      message: "Pets fetched successfully",
      pets: pets,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      pets: null,
    };
  }
};

export const getPetById = async (id) => {
  try {
    const pet = await prisma.pet.findUnique({
      where: {
        id: id,
      },
    });
    return {
      success: true,
      message: "Pet fetched successfully",
      pet: pet,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      pet: null,
    };
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
    await prisma.pet.delete({
      where: {
        id: id,
      },
    });
    return {
      success: true,
      message: "Pet deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
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
