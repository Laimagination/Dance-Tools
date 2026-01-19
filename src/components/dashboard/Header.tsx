"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {session?.user?.email}
        </span>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </header>
  )
}
