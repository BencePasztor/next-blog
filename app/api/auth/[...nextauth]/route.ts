import { db } from "@/lib/db"
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { comparePasswords } from "@/utils/passwordUtils"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (typeof credentials !== "undefined") {
                    const { email, password } = credentials
                    const user = await db.user.findFirst({ where: { email } })
                    if (user && await comparePasswords(password, user.password)) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            firstLogin: user.firstLogin
                        } as any
                    }
                }
                return null
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id
                token.firstLogin = user.firstLogin
            }
            return token
        },
        async session({ session, token }) {
            if (session.user && typeof token.userId === "number" && typeof token.firstLogin === "boolean") {
                session.user.id = token.userId
                session.user.firstLogin = token.firstLogin
            }
            return session
        }
    },
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }