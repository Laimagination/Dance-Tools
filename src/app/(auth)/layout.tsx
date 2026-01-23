import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Link href="/" className="text-xl font-bold text-gray-900 mb-8">
        AI for Dance Studios
      </Link>
      <div className="max-w-md w-full px-4">{children}</div>
    </div>
  )
}
