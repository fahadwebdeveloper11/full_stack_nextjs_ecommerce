import { connectDB } from "@/lib/dbConfig";
import User from "@/models/UserModel";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("Invalid Credentials");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your email!");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid Password");
          }

          return user;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isAdmin = token.isAdmin;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.avatar = token.avatar;
        session.user.name = token.name;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isAdmin = user.isAdmin;
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.email = user.email;
        token.avatar = user.avatar;
        token.name = user.name;
      }

      return token;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
