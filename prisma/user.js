import prisma from "./prisma";

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

export const update_user_phone_zip = async (
  email,
  phone,
  zipCode,
  address,
  accountPin
) => {
  console.log(email, phone, zipCode);
  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      phone: phone,
      zipCode: zipCode,
      address: address,
      accountPin: accountPin,
    },
  });
  return user;
};

export const GetAllUsers = async () => {
  let emails = [];
  const users = await prisma.user.findMany({});
  users.forEach((user) => {
    emails.push(user.email);
  });
  return emails;
};

export const CheckDuplicatePin = async (pin) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        accountPin: pin,
      },
    });
    if (user.length > 0) {
      console.log(user);
      return {
        success: false,
        message: "Pin already exists",
      };
    } else {
      return {
        success: true,
        message: "Pin is unique",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
