import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserModel } from "@/model/User.model";
import { dbConnect } from "@/lib/dbConnect";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Extend JWT to include custom fields
interface ExtendedJWT extends JWT {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
}

// Extend Session["user"] to include custom fields
interface ExtendedSessionUser extends User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Email/Username and password are required");
        }

        await dbConnect();

        // Find user by email or username
        const user = await UserModel.findOne({
          $or: [
            { email: credentials.identifier },
            { username: credentials.identifier },
          ],
        }).exec();

        if (!user) {
          throw new Error("No user found with this identifier");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }

        if (!user.isVerified) {
          throw new Error("Please verify your account before logging in");
        }

        return {
          id: user._id.toString(),
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
          isVerified: user.isVerified,
          isAcceptingMessages: user.isAcceptingMessages,
        } as ExtendedSessionUser;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    async jwt({ token, user }): Promise<ExtendedJWT> {
      if (user) {
        const u = user as ExtendedSessionUser;
        token._id = u._id;
        token.username = u.username;
        token.email = u.email ?? "";
        token.isVerified = u.isVerified;
        token.isAcceptingMessages = u.isAcceptingMessages;
      }
      return token as ExtendedJWT;
    },

    async session({ session, token }): Promise<Session> {
      if (session.user) {
        const t = token as ExtendedJWT;
        const sUser = session.user as ExtendedSessionUser;
        sUser._id = t._id;
        sUser.username = t.username;
        sUser.email = t.email ?? "";
        sUser.isVerified = t.isVerified;
        sUser.isAcceptingMessages = t.isAcceptingMessages;
      }
      return session;
    },
  },
};
