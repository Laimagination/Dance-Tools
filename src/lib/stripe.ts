import Stripe from "stripe"

let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set")
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    })
  }
  return stripeInstance
}

// Convenience export for destructuring
export const stripe = {
  get webhooks() {
    return getStripe().webhooks
  },
  get customers() {
    return getStripe().customers
  },
  get subscriptions() {
    return getStripe().subscriptions
  },
  get checkout() {
    return getStripe().checkout
  },
  get billingPortal() {
    return getStripe().billingPortal
  },
}

export const SUBSCRIPTION_TIERS = {
  free: {
    name: "Free",
    price: 0,
    priceId: null,
    features: ["View tool previews", "Limited access"],
  },
  pro: {
    name: "Pro",
    price: 999, // $9.99/month in cents
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      "Full access to all music tools",
      "Full access to costume tools",
      "Priority support",
      "Future tools included",
    ],
  },
} as const

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS

export function isSubscribed(
  status: string | null | undefined,
  tier: string | null | undefined
): boolean {
  return (status === "active" || status === "trialing") && tier === "pro"
}
