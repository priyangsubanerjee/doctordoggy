import prisma from "./prisma";

export const ScheduleOnlineConsulation = async (petId) => {
  try {
    await prisma.appointment.create({
      data: {
        petId,
      },
    });

    return { success: true, message: "Appointment scheduled successfully" };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};
