import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const path = nextUrl.pathname

  // Public routes - allow without auth
  // TODO: Remove "/dashboard", "/api/tools" from public routes before production
  const publicRoutes = ["/", "/pricing", "/login", "/signup", "/api/webhooks", "/dashboard", "/api/tools"]
  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  )

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl.origin)
    loginUrl.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(loginUrl)
  }

  // Check subscription for /dashboard/tools/* routes
  // TODO: Re-enable subscription check before production
  // if (path.startsWith("/dashboard/tools")) {
  //   const subscriptionStatus = req.auth?.user?.subscriptionStatus
  //   const subscriptionTier = req.auth?.user?.subscriptionTier

  //   const isSubscribed =
  //     (subscriptionStatus === "active" || subscriptionStatus === "trialing") &&
  //     subscriptionTier === "pro"

  //   if (!isSubscribed) {
  //     // Redirect to billing page with upgrade prompt
  //     return NextResponse.redirect(
  //       new URL("/dashboard/settings/billing?upgrade=true", nextUrl.origin)
  //     )
  //   }
  // }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
