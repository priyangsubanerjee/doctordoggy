import prisma from "./prisma";

export const ScheduleAppointment = async (
  code,
  participants,
  date,
  time,
  reason
) => {
  await prisma.meeting.create({
    data: {
      name: "John Doe",
      email: "",
    },
  });
};
