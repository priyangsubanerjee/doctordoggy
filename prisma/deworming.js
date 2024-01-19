import prisma from "./prisma";

export const scheduleDeworming = async (record) => {
  try {
    const newRecord = await prisma.deworming.create({
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
    };
  } catch (error) {
    console.log(error);
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

export const deleteDewormingById = async (id) => {
  try {
    const deworming = await prisma.deworming.delete({
      where: {
        id: id,
      },
    });
    return {
      success: true,
      message: "Deworming deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
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
        status: "DUE",
      },
    });

    for (let i = 0; i < dewormings.length; i++) {
      if (!emails.includes(dewormings[i].parentEmail)) {
        emails.push(dewormings[i].parentEmail);
      }
    }
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
    today.setHours(0, 0, 0, 0);

    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

    const dewormings = await prisma.deworming.findMany({
      where: {
        dueDate: {
          gt: yesterday,
          lt: tomorrow,
        },
        status: "DUE",
      },
    });

    for (let i = 0; i < dewormings.length; i++) {
      if (!emails.includes(dewormings[i].parentEmail)) {
        emails.push(dewormings[i].parentEmail);
      }
    }
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
