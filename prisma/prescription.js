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
    return prescription;
  } catch (error) {
    console.log(error);
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
    return prescriptions;
  } catch (error) {
    console.log(error);
  }
};
