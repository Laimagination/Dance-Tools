import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()

  const isSubscribed =
    (session?.user?.subscriptionStatus === "active" ||
      session?.user?.subscriptionStatus === "trialing") &&
    session?.user?.subscriptionTier === "pro"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name || "User"}!</h1>
        <p className="text-gray-600 mt-1">
          {isSubscribed
            ? "You have full access to all tools."
            : "Upgrade to Pro to access all tools."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Music Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Playlist management, tempo analysis, and music curation tools.
            </p>
            {isSubscribed ? (
              <Link
                href="/dashboard/tools/music"
                className="text-blue-600 hover:underline text-sm"
              >
                Open Music Tools →
              </Link>
            ) : (
              <Link
                href="/dashboard/settings/billing"
                className="text-orange-600 hover:underline text-sm"
              >
                Upgrade to access →
              </Link>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Costume Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Inventory management, assignment tracking, and costume organization.
            </p>
            {isSubscribed ? (
              <Link
                href="/dashboard/tools/costumes"
                className="text-blue-600 hover:underline text-sm"
              >
                Open Costume Tools →
              </Link>
            ) : (
              <Link
                href="/dashboard/settings/billing"
                className="text-orange-600 hover:underline text-sm"
              >
                Upgrade to access →
              </Link>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              Current plan:{" "}
              <span className="font-medium">
                {session?.user?.subscriptionTier === "pro" ? "Pro" : "Free"}
              </span>
            </p>
            <Link
              href="/dashboard/settings/billing"
              className="text-blue-600 hover:underline text-sm"
            >
              Manage subscription →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
