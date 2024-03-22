import prisma from "./prisma";

export const ScheduleOnlineConsulation = async (
  petId,
  doctorId,
  parentEmail,
  date,
  time,
  reason
) => {
  try {
    await prisma.appointment.create({
      data: {
        petId,
        parentEmail,
        date: new Date(date).toISOString(),
        time,
      },
    });

    return { success: true, message: "Appointment scheduled successfully" };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};
