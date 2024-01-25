import prisma from "./prisma";
import { getTokens } from "./token";
import { VaccinationDue } from "@/templates/Reminer";

export const scheduleVaccine = async (vaccineProp) => {
  try {
    let vaccineCreated = await prisma.vaccination.create({
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
    let user = await prisma.user.findUnique({
      where: {
        email: vaccineCreated.parentEmail,
      },
    });
    console.log(user);
    vaccineCreated = {
      ...vaccineCreated,
      parentName: user.name,
      parentPhone: user.phone,
    };
    return {
      success: true,
      message: "Vaccine scheduled successfully",
      vaccine: vaccineCreated,
    };
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
        petId: {
          not: null,
        },
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
    return {
      success: true,
      message: "Vaccine fetched successfully",
      vaccine: vaccine,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error fetching vaccine",
      vaccine: null,
    };
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

export const deleteVaccineById = async (id, email) => {
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
      message: "You must provide a vaccine id.",
    };
  } else if (id.length == 0) {
    return {
      success: false,
      message: "You must provide a vaccine id.",
    };
  } else {
    let vaccine = await prisma.vaccination.findUnique({
      where: {
        id: id,
      },
    });
    if (vaccine == null) {
      return {
        success: false,
        message: "Vaccine not found",
      };
    } else {
      if (vaccine.parentEmail !== email) {
        return {
          success: false,
          message: "You are not authorized to delete this vaccine",
        };
      } else {
        try {
          await prisma.vaccination.delete({
            where: {
              id: id,
            },
          });
          return {
            success: true,
            message: "Vaccine deleted successfully",
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
        petId: {
          not: null,
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
      petId: {
        not: null,
      },
    },
  });

  if (vaccines.length > 0) {
    vaccines.forEach(async (vaccine) => {
      emails.includes(vaccine.parentEmail) == false &&
        emails.push(vaccine.parentEmail);
    });
  }

  //   await sendBulkMail(
  //     process.env.ZOHO_MAIL,
  //     process.env.ZOHO_PASS,
  //     emails,
  //     "Vaccination due tomorrow ⏰",
  //     VaccinationDue("tomorrow")
  //   );

  return emails;
};

export const getVaccinesDueToday = async () => {
  let emails = [];
  let vaccines = [];
  let today = new Date();
  let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  vaccines = await prisma.vaccination.findMany({
    where: {
      status: "DUE",
      dueDate: {
        gt: yesterday,
        lte: today,
      },
      petId: {
        not: null,
      },
    },
  });

  if (vaccines.length > 0) {
    vaccines.forEach(async (vaccine) => {
      emails.includes(vaccine.parentEmail) == false &&
        emails.push(vaccine.parentEmail);
    });
  }

  //   await sendBulkMail(
  //     process.env.ZOHO_MAIL,
  //     process.env.ZOHO_PASS,
  //     emails,
  //     "Vaccination due today ⏰",
  //     VaccinationDue("today")
  //   );

  console.log(emails);

  return emails;
};

export const getOverDueVaccines = async () => {
  let emails = [];
  let vaccines = [];
  let today = new Date();
  let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  vaccines = await prisma.vaccination.findMany({
    where: {
      status: "DUE",
      dueDate: {
        lte: yesterday,
      },
      petId: {
        not: null,
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
    await prisma.vaccination.update({
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
    return {
      success: true,
      message: "Vaccine updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error updating vaccine",
    };
  }
};

export const uploadOldVaccine = async (vaccinatonProp) => {
  try {
    let vaccine = await prisma.vaccination.create({
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
    let user = await prisma.user.findUnique({
      where: {
        email: vaccine.parentEmail,
      },
    });

    vaccine = {
      ...vaccine,
      parentName: user.name,
      parentPhone: user.phone,
    };

    return {
      success: true,
      message: "Vaccine uploaded successfully",
      vaccine: vaccine,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error uploading vaccine",
    };
  }
};

export const vaccinesDueTodayByEmail = async (email) => {
  try {
    const today = new Date();
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const vaccines = await prisma.vaccination.findMany({
      where: {
        status: "DUE",
        parentEmail: email,
        dueDate: {
          gt: yesterday,
          lte: today,
        },
        petId: {
          not: null,
        },
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

export const vaccinesDueTomorrowEmail = async (email) => {
  try {
    const today = new Date();
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
    const vaccines = await prisma.vaccination.findMany({
      where: {
        status: "DUE",
        parentEmail: email,
        dueDate: {
          gt: today,
          lte: tomorrow,
        },
        petId: {
          not: null,
        },
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
