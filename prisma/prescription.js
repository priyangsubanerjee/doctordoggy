import prisma from "./prisma";

export const uploadPrescription = async (prescription) => {
  try {
    let prescriptionCreated = await prisma.prescription.create({
      data: {
        reasonOfVisit: prescription.reasonOfVisit,
        dateOfVisit: new Date(prescription.dateOfVisit).toISOString(),
        doctorName: prescription.doctorName,
        bodyWeight: prescription.bodyWeight,
        temperature: prescription.temperature,
        notes: prescription.notes,
        files: prescription.files,
        petId: prescription.petId,
        image: prescription.image,
        name: prescription.name,
        parentEmail: prescription.parentEmail,
      },
    });
    return prescriptionCreated;
  } catch (error) {
    console.log(error);
  }
};

export const getPrescriptionsByEmail = async (email) => {
  try {
    let prescriptions = await prisma.prescription.findMany({
      where: {
        parentEmail: email,
      },
    });
    return prescriptions;
  } catch (error) {
    console.log(error);
  }
};

export const getPrescriptionById = async (id) => {
  try {
    let prescription = await prisma.prescription.findUnique({
      where: {
        id: id,
      },
    });
    return {
      success: true,
      message: "Prescription retrieved successfully",
      prescription: prescription,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unable to retrieve prescription",
      prescription: null,
    };
  }
};

export const deletePrescriptionById = async (id) => {
  try {
    let prescription = await prisma.prescription.delete({
      where: {
        id: id,
      },
    });
    return prescription;
  } catch (error) {
    console.log(error);
  }
};

export const getPrescriptionsByPetId = async (id) => {
  try {
    let prescriptions = await prisma.prescription.findMany({
      where: {
        petId: id,
      },
    });
    return {
      success: true,
      message: "Prescriptions retrieved successfully",
      prescriptions: prescriptions,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unable to retrieve prescriptions",
      prescriptions: [],
    };
  }
};
