import prisma from "./prisma";
export const register_pet = async (pet, file, sessionEmail) => {
  console.log("Register pet function initiated");

  console.log("File public id getting stored in database");
  const fileCreated = await prisma.file.create({
    data: {
      name: new Date().toISOString() + "-" + pet.name,
      publicId: file.publicId,
      url: file.fileUrl,
    },
  });

  try {
    console.log("Pet getting stored in database");
    const petCreated = await prisma.pet.create({
      data: {
        image: [fileCreated.url],
        name: pet.name,
        parentEmail: pet.parentEmail,
        breed: pet.breed,
        dateOfBirth: new Date(pet.dateOfBirth).toISOString(),
        species: pet.species,
        isPublic: pet.isPublic,
        color: pet.color,
        createdBy: sessionEmail,
      },
    });
    console.log("Pet has been created successfully in database");
    return petCreated;
  } catch (error) {
    console.log(error);
    return null;
  }
};
