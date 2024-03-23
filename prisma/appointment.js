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
        title: "Online Consultation",
        description: `Online Consultation with on ${date} at ${time} for ${reason}`,
      },
    });

    return { success: true, message: "Appointment scheduled successfully" };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};

export async function GetAppointmentsByEmail(email) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        parentEmail: email,
      },
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        startTime: true,
        reason: true,
        type: true,
        mode: true,
        status: true,
        code: true,
        pet: {
          select: {
            name: true,
            image: true,
          },
        },
        doctor: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      success: true,
      appointments: appointments,
      message: "Appointments fetched successfully",
    };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
}

export async function CheckParentSession(code, email) {
  try {
    const appointment = await prisma.appointment.findFirst({
      where: {
        code: code,
        status: "upcoming",
      },
      select: {
        parent: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!appointment) {
      return { success: false, message: "Appointment not found" };
    } else {
      if (appointment.parent.email === email) {
        return {
          success: true,
          message: "Appointment fetched successfully",
        };
      } else {
        return { success: false, message: "Appointment not found" };
      }
    }
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
}
