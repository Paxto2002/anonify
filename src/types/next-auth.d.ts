import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

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
  interface JWT {
    _id: string;
    username: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
  }
}
