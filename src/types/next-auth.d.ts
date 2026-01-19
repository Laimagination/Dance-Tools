import "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      subscriptionTier: string
      subscriptionStatus: string
    } & DefaultSession["user"]
  }

  interface User {
    subscriptionTier?: string | null
    subscriptionStatus?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    subscriptionTier?: string | null
    subscriptionStatus?: string | null
  }
}
