"use client"

import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SUBSCRIPTION_TIERS } from "@/lib/stripe"

export default function BillingPage() {
  const { data: session, update } = useSession()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  const success = searchParams.get("success")
  const canceled = searchParams.get("canceled")
  const upgrade = searchParams.get("upgrade")

  const isSubscribed =
    (session?.user?.subscriptionStatus === "active" ||
      session?.user?.subscriptionStatus === "trialing") &&
    session?.user?.subscriptionTier === "pro"

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: "pro" }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleManageBilling = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Error creating portal session:", error)
    } finally {
      setLoading(false)
    }
  }

  // Refresh session after successful payment
  if (success) {
    update()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-gray-600 mt-1">Manage your subscription</p>
      </div>

      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-md">
          Payment successful! Your subscription is now active.
        </div>
      )}

      {canceled && (
        <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
          Payment was canceled. You can try again when you&apos;re ready.
        </div>
      )}

      {upgrade && !isSubscribed && (
        <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
          Upgrade to Pro to access all tools.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Free Tier */}
        <Card className={!isSubscribed ? "ring-2 ring-blue-500" : ""}>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Basic access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$0/month</div>
            <ul className="space-y-2 text-sm">
              {SUBSCRIPTION_TIERS.free.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {!isSubscribed ? (
              <span className="text-sm text-gray-500">Current plan</span>
            ) : null}
          </CardFooter>
        </Card>

        {/* Pro Tier */}
        <Card className={isSubscribed ? "ring-2 ring-blue-500" : ""}>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Full access to all tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$9.99/month</div>
            <ul className="space-y-2 text-sm">
              {SUBSCRIPTION_TIERS.pro.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {isSubscribed ? (
              <Button
                onClick={handleManageBilling}
                variant="outline"
                disabled={loading}
              >
                {loading ? "Loading..." : "Manage Subscription"}
              </Button>
            ) : (
              <Button onClick={handleSubscribe} disabled={loading}>
                {loading ? "Loading..." : "Upgrade to Pro"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      {isSubscribed && (
        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Status:</span>
              <p className="font-medium capitalize">
                {session?.user?.subscriptionStatus}
              </p>
            </div>
            <Button
              onClick={handleManageBilling}
              variant="outline"
              disabled={loading}
            >
              {loading ? "Loading..." : "Manage Billing in Stripe"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
