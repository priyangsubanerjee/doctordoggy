import prisma from "./prisma";

export const ScheduleOnlineConsulation = async (
  petId,
  doctorId,
  parentEmail,
  date,
  time,
  reason,
  code
) => {
  try {
    await prisma.appointment.create({
      data: {
        petId,
        parentEmail,
        doctorId,
        startDate: new Date(date).toISOString(),
        startTime: time,
        reason,
        type: "consultation",
        mode: "online",
        code,
      },
    });

    return { success: true, message: "Appointment scheduled successfully" };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};
