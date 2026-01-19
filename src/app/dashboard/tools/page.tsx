import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tools</h1>
        <p className="text-gray-600 mt-1">
          Access all your dance studio tools
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/tools/music">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Music Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Playlist management, tempo analysis, and music curation tools
                for your dance classes.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/tools/costumes">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Costume Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Inventory management, assignment tracking, and costume
                organization for performances.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
