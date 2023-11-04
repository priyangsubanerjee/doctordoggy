import prisma from "./prisma";

export async function uploadPathologyReport(report) {
  try {
    const newReport = await prisma.pathology.create({
      data: {
        petId: report.petId,
        name: report.name,
        image: report.image,
        testName: report.testName,
        parentEmail: report.parentEmail,
        refererredBy: report.referredBy,
        date: new Date(report.testedOn).toISOString(),
        bodyWeight: report.bodyWeight,
        temperature: report.temperature,
        files: report.files,
        notes: report.notes,
      },
    });
    return newReport;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getPathologyReportsByEmail(email) {
  try {
    const reports = await prisma.pathology.findMany({
      where: {
        parentEmail: email,
      },
    });
    return reports;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getPathologyReportById(id) {
  try {
    const report = await prisma.pathology.findUnique({
      where: {
        id: id,
      },
    });
    return report;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deletePathologyReportById(id) {
  try {
    const report = await prisma.pathology.delete({
      where: {
        id: id,
      },
    });
    return report;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getPathologyReportsByPetId(petId) {
  try {
    const reports = await prisma.pathology.findMany({
      where: {
        petId: petId,
      },
    });
    return reports;
  } catch (error) {
    console.log(error);
    return null;
  }
}
