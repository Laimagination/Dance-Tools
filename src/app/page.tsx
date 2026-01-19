import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-xl font-bold">Dance Studio Tools</div>
        <div className="flex items-center gap-4">
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link href="/login">
            <Button variant="outline">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Tools for Modern
            <br />
            <span className="text-blue-600">Dance Studios</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Streamline your dance studio operations with powerful tools for
            music management, costume organization, and more. Everything you
            need in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Start Free Trial</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything Your Studio Needs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Music Tools</h3>
              <p className="text-gray-600">
                Manage playlists, analyze tempo, and organize music for all your
                dance classes and performances.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Costume Management</h3>
              <p className="text-gray-600">
                Track inventory, manage assignments, and organize costumes for
                recitals and competitions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">More Coming Soon</h3>
              <p className="text-gray-600">
                We&apos;re constantly adding new tools. Pro subscribers get
                access to all future features.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center bg-blue-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to streamline your studio?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join dance studios already using our tools to save time and stay
            organized.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-32 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2024 Dance Studio Tools. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
