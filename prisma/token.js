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
  let tokenExist = await getTokens(email);
  if (tokenExist) {
    if (tokenExist.tokens.includes(token)) {
      return tokenExist;
    } else {
      try {
        let tokenArray = tokenExist.tokens;
        tokenArray.push(token);
        const updatedToken = await prisma.token.update({
          where: {
            email,
          },
          data: {
            tokens: {
              set: tokenArray,
            },
          },
        });
        return updatedToken;
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    try {
      let tokenArray = [];
      tokenArray.push(token);
      const newToken = await prisma.token.create({
        data: {
          email,
          tokens: {
            set: tokenArray,
          },
        },
      });
      return newToken;
    } catch (error) {
      console.log(error);
    }
  }
};
