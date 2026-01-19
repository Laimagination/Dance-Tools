import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function SettingsPage() {
  const session = await auth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Name:</span>
              <p className="font-medium">{session?.user?.name || "Not set"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Email:</span>
              <p className="font-medium">{session?.user?.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Current plan:</span>
              <p className="font-medium">
                {session?.user?.subscriptionTier === "pro" ? "Pro" : "Free"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Status:</span>
              <p className="font-medium capitalize">
                {session?.user?.subscriptionStatus || "Inactive"}
              </p>
            </div>
            <Link
              href="/dashboard/settings/billing"
              className="inline-block mt-2 text-blue-600 hover:underline text-sm"
            >
              Manage billing →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
