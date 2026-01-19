import Link from "next/link"
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

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold">
          Dance Studio Tools
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Pricing Section */}
      <main className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that works for your studio
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Tier */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>For studios just getting started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-6">
                $0<span className="text-lg font-normal text-gray-500">/month</span>
              </div>
              <ul className="space-y-3">
                {SUBSCRIPTION_TIERS.free.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <span className="mr-3 text-gray-400">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/signup" className="w-full">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pro Tier */}
          <Card className="border-blue-200 shadow-lg relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>
                Full access to all studio tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-6">
                $9.99<span className="text-lg font-normal text-gray-500">/month</span>
              </div>
              <ul className="space-y-3">
                {SUBSCRIPTION_TIERS.pro.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <span className="mr-3 text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/signup" className="w-full">
                <Button className="w-full">Start Pro Trial</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You&apos;ll
                continue to have access until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards through Stripe, including Visa,
                Mastercard, and American Express.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                You can explore the app with a free account. Upgrade to Pro when
                you&apos;re ready for full access to all tools.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What happens to my data if I downgrade?
              </h3>
              <p className="text-gray-600">
                Your data is always safe. If you downgrade, you&apos;ll lose
                access to Pro features but your data will be preserved.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
