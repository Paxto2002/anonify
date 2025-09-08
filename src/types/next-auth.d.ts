// src/types/next-auth.d.ts
import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    _id: string;
    username: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
  }
}
