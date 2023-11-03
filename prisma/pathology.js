import prisma from "./prisma";

export async function uploadPathologyReport(report) {
  try {
    const newReport = await prisma.pathology.create({
      data: {
        petId: report.petId,
        name: report.name,
        image: report.image,
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
