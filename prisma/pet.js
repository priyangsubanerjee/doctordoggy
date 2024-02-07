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

export const deletePetById = async (id, email) => {
  if (email == null) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  } else if (email.length == 0) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  } else if (id == null) {
    return {
      success: false,
      message: "You must provide a pet id.",
    };
  } else if (id.length == 0) {
    return {
      success: false,
      message: "You must provide a pet id.",
    };
  } else {
    let pet = await prisma.pet.findUnique({
      where: {
        id: id,
      },
    });
    if (pet == null) {
      return {
        success: false,
        message: "Pet not found",
      };
    } else {
      if (pet.parentEmail !== email) {
        return {
          success: false,
          message: "You are not authorized to delete this pet",
        };
      } else {
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
      }
    }
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

export const getBirthdaysToday = async () => {
  let today = new Date();
  let selectedPets = [];
  try {
    const pets = await prisma.pet.findMany({
      where: {
        isPublic: true,
        parentEmail: {
          not: null,
        },
      },
    });
    pets.forEach((pet) => {
      let birthday = new Date(pet.dateOfBirth);
      if (
        birthday.getDate() == today.getDate() &&
        birthday.getMonth() == today.getMonth()
      ) {
        selectedPets.push({
          name: pet.name,
          email: pet.parentEmail,
        });
      }
    });
    return {
      success: true,
      message: "Pets fetched successfully",
      pets: selectedPets,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const addSubParent = async (email, petId) => {
  let pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });

  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user == null) {
    return {
      success: false,
      message: "User not found",
    };
  } else {
    if (pet == null) {
      return {
        success: false,
        message: "Pet not found",
      };
    } else {
      if (pet.parentEmail == email) {
        return {
          success: false,
          message: "User is already a parent",
        };
      } else {
        if (pet.sharedWith.includes(email)) {
          return {
            success: false,
            message: "User is already a parent",
          };
        } else {
          let sharedWith = pet.sharedWith || [];
          let sharedPets = user.sharedPets || [];
          sharedPets.push(petId);
          sharedWith.push(email);
          try {
            await prisma.pet.update({
              where: {
                id: petId,
              },
              data: {
                sharedWith: sharedWith,
              },
            });
            await prisma.user.update({
              where: {
                email: email,
              },
              data: {
                sharedPets: sharedPets,
              },
            });
            return {
              success: true,
              message: "Parent added successfully",
            };
          } catch (error) {
            return {
              success: false,
              message: error.message,
            };
          }
        }
      }
    }
  }
};

export const removeSubParent = async (email, petId) => {
  let pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });

  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user == null) {
    return {
      success: false,
      message: "User not found",
    };
  } else {
    if (pet == null) {
      return {
        success: false,
        message: "Pet not found",
      };
    } else {
      if (pet.parentEmail == email) {
        return {
          success: false,
          message: "User is the main parent",
        };
      } else {
        if (pet.sharedWith.includes(email)) {
          let sharedWith = pet.sharedWith || [];
          let sharedPets = user.sharedPets || [];
          sharedPets = sharedPets.filter((id) => id !== petId);
          sharedWith = sharedWith.filter((id) => id !== email);
          try {
            await prisma.pet.update({
              where: {
                id: petId,
              },
              data: {
                sharedWith: sharedWith,
              },
            });
            await prisma.user.update({
              where: {
                email: email,
              },
              data: {
                sharedPets: sharedPets,
              },
            });
            return {
              success: true,
              message: "Parent removed successfully",
            };
          } catch (error) {
            return {
              success: false,
              message: error.message,
            };
          }
        } else {
          return {
            success: false,
            message: "User is not a parent",
          };
        }
      }
    }
  }
};
