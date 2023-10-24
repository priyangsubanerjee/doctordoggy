import prisma from "./prisma";

// READ
export const get_all_users = async () => {
  const users = await prisma.user.findMany({});
  return users;
};

export const get_user = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

export const create_user = async (name, email) => {
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });
  return user;
};

export const update_user_phone_zip = async (email, phone, zipCode, address) => {
  console.log(email, phone, zipCode);
  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      phone: phone,
      zipCode: zipCode,
      address: address,
    },
  });
  return user;
};
