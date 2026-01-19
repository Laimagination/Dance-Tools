import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionChange(subscription, event.id)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription, event.id)
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  if (!userId) return

  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: session.customer as string },
  })
}

async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
  eventId: string
) {
  const customerId = subscription.customer as string

  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  })

  if (!user) {
    console.error("No user found for customer:", customerId)
    return
  }

  const subscriptionItem = subscription.items.data[0]
  const priceId = subscriptionItem?.price.id
  const tier = priceId === process.env.STRIPE_PRO_PRICE_ID ? "pro" : "free"

  const currentPeriodEnd = subscriptionItem?.current_period_end

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        subscriptionTier: tier,
        subscriptionPriceId: priceId,
        currentPeriodEnd: currentPeriodEnd
          ? new Date(currentPeriodEnd * 1000)
          : null,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    }),
    prisma.subscriptionHistory.create({
      data: {
        userId: user.id,
        event:
          subscription.status === "active" ? "updated" : subscription.status,
        previousTier: user.subscriptionTier,
        newTier: tier,
        stripeEventId: eventId,
      },
    }),
  ])
}

async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  eventId: string
) {
  const customerId = subscription.customer as string

  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  })

  if (!user) return

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: "canceled",
        subscriptionTier: "free",
        cancelAtPeriodEnd: false,
      },
    }),
    prisma.subscriptionHistory.create({
      data: {
        userId: user.id,
        event: "canceled",
        previousTier: user.subscriptionTier,
        newTier: "free",
        stripeEventId: eventId,
      },
    }),
  ])
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id

  if (!customerId) return

  await prisma.user.updateMany({
    where: { stripeCustomerId: customerId },
    data: { subscriptionStatus: "past_due" },
  })
}
