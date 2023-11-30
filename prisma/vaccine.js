import prisma from "./prisma";
import { getTokens } from "./token";

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

export const vaccinesDueToday = async () => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let parentEmails = [];
    let tokens = [];
    const vaccines = await prisma.vaccination.findMany({
      where: {
        status: "DUE",
        dueDate: {
          gte: today,
          lt: tomorrow,
        },
      },
    });
    let ids = [];
    if (vaccines.length > 0) {
      vaccines.forEach(async (vaccine) => {
        parentEmails.push(vaccine.parentEmail);
      });
    }

    // if (parentEmails.length > 0) {
    //   parentEmails.forEach(async (email) => {
    //     const token = await prisma.token.findUnique({
    //       where: {
    //         email: email,
    //       },
    //     });
    //     console.log(token);
    //   });
    // }

    let fcmObject = {
      emails: parentEmails || [],
      title: "Vaccination Reminder",
      body: "Your pet is due for vaccination tomorrow.",
    };
    return fcmObject;
  } catch (error) {
    console.log(error);
    return null;
  }
};
