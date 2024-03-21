import prisma from "./prisma";

export const ScheduleAppointment = async (
  code,
  participants,
  date,
  time,
  reason
) => {
  let parentEmail = participants[0].email;
  let doctorEmail = participants[1].email;
  try {
    await prisma.meeting.create({
      data: {
        date,
        parentEmail,
        doctorEmail,
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
    console.log(error);
    return {
      success: false,
      message: "Error scheduling appointment",
    };
  }
};
