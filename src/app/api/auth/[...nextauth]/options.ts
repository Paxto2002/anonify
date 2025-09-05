import { NextAuthOptions, Session, User, DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User.model";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      username?: string;
      email?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username?: string;
    email?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize: credentials received", {
          identifier: credentials?.identifier ? "present" : "missing",
          password: credentials?.password ? "present" : "missing"
        });

        if (!credentials?.identifier || !credentials?.password) {
          console.error("Authorize: missing credentials");
          throw new Error("Missing credentials");
        }

        try {
          await dbConnect();
          console.log("Authorize: database connected");

          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          console.log("Authorize: found user", user ? {
            id: user._id,
            email: user.email,
            username: user.username,
            isVerified: user.isVerified,
            isAcceptingMessages: user.isAcceptingMessages
          } : "No user found");

          if (!user) {
            console.error("Authorize: no user found with identifier:", credentials.identifier);
            throw new Error("No user found");
          }
          
          if (!user.isVerified) {
            console.error("Authorize: user not verified", user.email);
            throw new Error("Please verify your account");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log("Authorize: password correct?", isPasswordCorrect);

          if (!isPasswordCorrect) {
            console.error("Authorize: incorrect password for user:", user.email);
            throw new Error("Incorrect password");
          }

          const userData = {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            isAcceptingMessages: user.isAcceptingMessages || false,
          };

          console.log("Authorize: successful login", userData);
          return userData;

        } catch (error) {
          console.error("Authorize: error occurred", error);
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      console.log("JWT callback:", { token, user });

      if (user) {
        console.log("JWT: adding user data to token", user);
        token._id = user.id;
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
      }

      console.log("JWT: returning token", token);
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session callback:", { session, token });

      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        
        console.log("Session: user data set", session.user);
      }

      console.log("Session: returning session", session);
      return session;
    },

    async redirect({ url, baseUrl }) {
      console.log("Redirect callback:", { url, baseUrl });
      
      // Allows relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      
      return baseUrl;
    }
  },

  pages: {
    signIn: "/sign-in",
    error: "/sign-in", 
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async signIn(message) {
      console.log("SignIn event:", message);
    },
    async signOut(message) {
      console.log("SignOut event:", message);
    },
    async createUser(message) {
      console.log("CreateUser event:", message);
    },
    async updateUser(message) {
      console.log("UpdateUser event:", message);
    },
    async linkAccount(message) {
      console.log("LinkAccount event:", message);
    },
    async session(message) {
      console.log("Session event:", message);
    }
  }
};