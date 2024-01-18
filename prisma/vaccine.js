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
    return {
      success: true,
      message: "Vaccines fetched successfully",
      vaccines: vaccines,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error fetching vaccines",
      vaccines: null,
    };
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

export const getVaccinesDueTomorrow = async () => {
  let emails = [];
  let vaccines = [];
  let today = new Date();
  let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  let dayAfterTomorrow = new Date(new Date().setDate(new Date().getDate() + 2));
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  vaccines = await prisma.vaccination.findMany({
    where: {
      status: "DUE",
      dueDate: {
        gt: today,
        lte: tomorrow,
      },
    },
  });

  if (vaccines.length > 0) {
    vaccines.forEach(async (vaccine) => {
      emails.includes(vaccine.parentEmail) == false &&
        emails.push(vaccine.parentEmail);
    });
  }

  return emails;
};

export const getVaccinesDueToday = async () => {
  let emails = [];
  let vaccines = [];
  let today = new Date();
  let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  let dayAfterTomorrow = new Date(new Date().setDate(new Date().getDate() + 2));
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  vaccines = await prisma.vaccination.findMany({
    where: {
      status: "DUE",
      dueDate: {
        gt: yesterday,
        lt: tomorrow,
      },
    },
  });

  if (vaccines.length > 0) {
    vaccines.forEach(async (vaccine) => {
      emails.includes(vaccine.parentEmail) == false &&
        emails.push(vaccine.parentEmail);
    });
  }

  return emails;
};

export const updateVaccineById = async (
  id,
  status,
  doneDate,
  doneBy,
  files
) => {
  try {
    const vaccine = await prisma.vaccination.update({
      where: {
        id: id,
      },
      data: {
        status: status,
        doneDate: doneDate,
        doneBy: doneBy,
        files: files,
      },
    });
    return { vaccine };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const uploadOldVaccine = async (vaccinatonProp) => {
  try {
    const vaccine = await prisma.vaccination.create({
      data: {
        status: "DONE",
        vaccineName: vaccinatonProp.vaccineName,
        petId: vaccinatonProp.petId,
        name: vaccinatonProp.name,
        image: vaccinatonProp.image,
        parentEmail: vaccinatonProp.parent,
        doneBy: vaccinatonProp.doneBy,
        dueDate: vaccinatonProp.dueDate,
        doneDate: vaccinatonProp.doneDate,
        files: vaccinatonProp.files,
      },
    });
    return { vaccine };
  } catch (error) {
    console.log(error);
    return null;
  }
};
