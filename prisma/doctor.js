import prisma from "./prisma";

export const GetAllDoctors = async (isProtected) => {
  switch (isProtected) {
    case true:
      let doctors = await prisma.doctor.findMany({
        select: {
          id: true,
          email: false,
          phone: false,
          name: true,
        },
      });
      return {
        success: true,
        message: "Doctors fetched successfully",
        doctors,
      };
    case false:
      let doctorsPublic = await prisma.doctor.findMany();
      console.log(doctorsPublic);
      return {
        success: true,
        message: "Doctors fetched successfully",
        doctors: doctorsPublic,
      };
  }
};

export const GetDoctorById = async (doctorId) => {
  let doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId,
    },
  });

  return {
    success: true,
    message: "Doctor fetched successfully",
    doctor,
  };
};
