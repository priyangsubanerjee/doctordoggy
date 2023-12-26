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
    return newRecord;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDewormingsByEmail = async (email) => {
  try {
    const dewormings = await prisma.deworming.findMany({
      where: {
        parentEmail: email,
      },
    });
    return dewormings;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDewormingsByPetId = async (petId) => {
  try {
    const dewormings = await prisma.deworming.findMany({
      where: {
        petId: petId,
      },
    });
    return dewormings;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDewormingById = async (id) => {
  try {
    const deworming = await prisma.deworming.findUnique({
      where: {
        id: id,
      },
    });
    return deworming;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteDewormingById = async (id) => {
  try {
    const deworming = await prisma.deworming.delete({
      where: {
        id: id,
      },
    });
    return deworming;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDueDewormingsTomorrow = async () => {
  let today = new Date();
  let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  let dayAfterTomorrow = new Date(new Date().setDate(new Date().getDate() + 2));
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

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

    let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
    tomorrow.setHours(0, 0, 0, 0);

    const dewormings = await prisma.deworming.findMany({
      where: {
        dueDate: {
          gte: today,
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
