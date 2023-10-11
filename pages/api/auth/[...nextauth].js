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

      // TODO: Add database logic here to check if the user's account is already created

      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  },
  secret: process.env.AUTH_SECRET_SALT,
};

export default NextAuth(authOptions);
