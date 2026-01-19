import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )
        if (!isValid) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          subscriptionTier: user.subscriptionTier,
          subscriptionStatus: user.subscriptionStatus,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.subscriptionTier = user.subscriptionTier
        token.subscriptionStatus = user.subscriptionStatus
      }

      // Update session when triggered (e.g., after subscription change)
      if (trigger === "update" && session) {
        token.subscriptionTier = session.subscriptionTier
        token.subscriptionStatus = session.subscriptionStatus
      }

      // Refresh subscription data from database
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { subscriptionTier: true, subscriptionStatus: true },
        })
        if (dbUser) {
          token.subscriptionTier = dbUser.subscriptionTier
          token.subscriptionStatus = dbUser.subscriptionStatus
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.subscriptionTier = token.subscriptionTier as string
        session.user.subscriptionStatus = token.subscriptionStatus as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
})
