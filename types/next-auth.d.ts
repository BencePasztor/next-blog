import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id?: number,
            firstLogin?: boolean,
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        id?: number,
        firstLogin?: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: number,
        firstLogin?: boolean;
    }
  }