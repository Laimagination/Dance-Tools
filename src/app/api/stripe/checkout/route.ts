import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getStripe, SUBSCRIPTION_TIERS, SubscriptionTier } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { tier } = (await request.json()) as { tier: SubscriptionTier }

    if (!tier || !SUBSCRIPTION_TIERS[tier]) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 })
    }

    const tierConfig = SUBSCRIPTION_TIERS[tier]

    if (!tierConfig.priceId) {
      return NextResponse.json(
        { error: "This tier does not require payment" },
        { status: 400 }
      )
    }

    const stripe = getStripe()

    // Get or create Stripe customer
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true, email: true },
    })

    let customerId = user?.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user?.email || session.user.email!,
        metadata: { userId: session.user.id },
      })
      customerId = customer.id

      await prisma.user.update({
        where: { id: session.user.id },
        data: { stripeCustomerId: customerId },
      })
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: tierConfig.priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings/billing?canceled=true`,
      metadata: { userId: session.user.id, tier },
      subscription_data: {
        metadata: { userId: session.user.id, tier },
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
