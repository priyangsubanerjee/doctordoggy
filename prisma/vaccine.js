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
