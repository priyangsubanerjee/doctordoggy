import prisma from "./prisma";

export const ScheduleAppointment = async (
  code,
  participants,
  date,
  time,
  reason
) => {
  try {
    await prisma.meeting.create({
      data: {
        date,
        time,
        participants,
        code,
        reason,
      },
    });

    return {
      success: true,
      message: "Appointment scheduled successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error scheduling appointment",
    };
  }
};
