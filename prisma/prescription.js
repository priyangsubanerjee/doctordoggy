import prisma from "./prisma";

export const uploadPrescription = async (prescription) => {
  console.log(prescription);
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
