import prisma from "./prisma";

export const scheduleVaccine = async (vaccineProp) => {
  try {
    const vaccineCreated = await prisma.vaccination.create({
      data: {
        image: vaccineProp.image,
        name: vaccineProp.name,
        petId: vaccineProp.petId,
        vaccineName: vaccineProp.vaccineName,
        dueDate: vaccineProp.dueDate,
        parentEmail: vaccineProp.parentEmail,
        status: "DUE",
      },
    });
    return vaccineCreated;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getVaccinesByEmail = async (email) => {
  try {
    const vaccines = await prisma.vaccination.findMany({
      where: {
        parentEmail: email,
      },
    });
    return vaccines;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getVaccineById = async (id) => {
  try {
    const vaccine = await prisma.vaccination.findUnique({
      where: {
        id: id,
      },
    });
    return vaccine;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getVaccineByPetId = async (petId) => {
  try {
    const vaccines = await prisma.vaccination.findMany({
      where: {
        petId: petId,
      },
    });
    return vaccines;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteVaccineById = async (id) => {
  try {
    const vaccine = await prisma.vaccination.delete({
      where: {
        id: id,
      },
    });
    return vaccine;
  } catch (error) {
    console.log(error);
    return null;
  }
};
