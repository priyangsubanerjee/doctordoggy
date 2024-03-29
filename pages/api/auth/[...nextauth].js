import { sendNotification } from "@/helper/telegram/sendNotification";
import { create_user, get_user } from "@/prisma/user";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 80000,
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (!session) return;

      let userDB = await get_user(session.user.email);
      if (!userDB) {
        let createdUser = await create_user(
          session.user.name,
          session.user.email
        );
        userDB = createdUser;
        sendNotification(
          `New user: ${session.user.name} ${session.user.email} joined !`
        );
      }

      return {
        ...session,
        user: {
          ...session.user,
          onBoardingSuccess: !userDB.phone || !userDB.zipCode ? false : true,
          phone: userDB.phone,
          zipCode: userDB.zipCode,
          address: userDB.address,
          accountPin: userDB.accountPin,
        },
      };
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

export default NextAuth(authOptions);
