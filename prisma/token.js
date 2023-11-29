import prisma from "./prisma";

export const getTokens = async (email) => {
  const token = await prisma.token.findUnique({
    where: {
      email,
    },
  });
  return token;
};

export const updateToken = async (email, token) => {
  const updatedToken = await prisma.token.update({
    where: {
      email,
    },
    data: {
      token,
    },
  });
  return updatedToken;
};
