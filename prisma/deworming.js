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
