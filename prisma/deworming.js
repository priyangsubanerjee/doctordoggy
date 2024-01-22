import prisma from "./prisma";
import { DewormingDue } from "@/templates/Reminer";

export const scheduleDeworming = async (record) => {
  try {
    let newRecord = await prisma.deworming.create({
      data: {
        petId: record.petId,
        name: record.name,
        image: record.image,
        parentEmail: record.parentEmail,
        dueDate: new Date(record.dueDate).toISOString(),
        bodyWeight: record.bodyWeight,
        medicineName: record.medicineName,
        dosage: record.dosage,
        status: "DUE",
      },
    });
    return {
      success: true,
      message: "Deworming scheduled successfully",
      deworming: newRecord,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getDewormingsByEmail = async (email) => {
  try {
    const dewormings = await prisma.deworming.findMany({
      where: {
        parentEmail: email,
        petId: {
          not: null,
        },
      },
    });
    return {
      success: true,
      message: "Dewormings fetched successfully",
      dewormings: dewormings,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
      dewormings: null,
    };
  }
};

export const getDewormingsByPetId = async (petId) => {
  try {
    const dewormings = await prisma.deworming.findMany({
      where: {
        petId: petId,
      },
    });
    return {
      success: true,
      message: "Dewormings fetched successfully",
      dewormings: dewormings,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
      dewormings: null,
    };
  }
};

export const getDewormingById = async (id) => {
  try {
    const deworming = await prisma.deworming.findUnique({
      where: {
        id: id,
      },
    });
    return {
      success: true,
      message: "Deworming fetched successfully",
      deworming: deworming,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error fetching deworming",
      deworming: null,
    };
  }
};

export const deleteDewormingById = async (id, email) => {
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
      message: "You must provide a deworming id.",
    };
  } else if (id.length == 0) {
    return {
      success: false,
      message: "You must provide a deworming id.",
    };
  } else {
    let deworming = await prisma.deworming.findUnique({
      where: {
        id: id,
      },
    });
    if (deworming == null) {
      return {
        success: false,
        message: "Deworming not found",
      };
    } else {
      if (deworming.parentEmail !== email) {
        return {
          success: false,
          message: "You are not authorized to delete this deworming",
        };
      } else {
        try {
          await prisma.deworming.delete({
            where: {
              id: id,
            },
          });
          return {
            success: true,
            message: "Deworming deleted successfully",
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

export const getDueDewormingsTomorrow = async () => {
  let today = new Date();
  let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  try {
    let emails = [];

    const dewormings = await prisma.deworming.findMany({
      where: {
        dueDate: {
          gt: today,
          lte: tomorrow,
        },
        petId: {
          not: null,
        },
        status: "DUE",
      },
    });

    for (let i = 0; i < dewormings.length; i++) {
      if (!emails.includes(dewormings[i].parentEmail)) {
        emails.push(dewormings[i].parentEmail);
      }
    }

    // await sendBulkMail(
    //   process.env.ZOHO_MAIL,
    //   process.env.ZOHO_PASS,
    //   emails,
    //   "Deworming due tomorrow ⏰",
    //   DewormingDue("tomorrow")
    // );

    return emails;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDueDewormingsToday = async () => {
  try {
    let emails = [];
    let today = new Date();
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

    const dewormings = await prisma.deworming.findMany({
      where: {
        dueDate: {
          gt: yesterday,
          lte: today,
        },
        petId: {
          not: null,
        },
        status: "DUE",
      },
    });

    for (let i = 0; i < dewormings.length; i++) {
      if (!emails.includes(dewormings[i].parentEmail)) {
        emails.push(dewormings[i].parentEmail);
      }
    }

    // await sendBulkMail(
    //   process.env.ZOHO_MAIL,
    //   process.env.ZOHO_PASS,
    //   emails,
    //   "Deworming due today ⏰",
    //   DewormingDue("today")
    // );

    return emails;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateDewormingStatusById = async (id, status) => {
  try {
    const deworming = await prisma.deworming.update({
      where: {
        id: id,
      },
      data: {
        status: status,
        doneDate: status == "DONE" ? new Date().toISOString() : null,
      },
    });
    return {
      success: true,
      message: "Deworming status updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const dewormingsDueTodayByEmail = async (email) => {
  let today = new Date();
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  let dewormings = await prisma.deworming.findMany({
    where: {
      status: "DUE",
      dueDate: {
        gt: yesterday,
        lte: today,
      },
      petId: {
        not: null,
      },
      parentEmail: email,
    },
  });

  return {
    success: true,
    message: "Dewormings fetched successfully",
    dewormings: dewormings,
  };
};

export const dewormingsDueTomorrowByEmail = async (email) => {
  let today = new Date();
  let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  let dewormings = await prisma.deworming.findMany({
    where: {
      status: "DUE",
      dueDate: {
        gt: today,
        lte: tomorrow,
      },
      petId: {
        not: null,
      },
      parentEmail: email,
    },
  });

  return {
    success: true,
    message: "Dewormings fetched successfully",
    dewormings: dewormings,
  };
};
