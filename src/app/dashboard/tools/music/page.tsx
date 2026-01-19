import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MusicToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Music Tools</h1>
        <p className="text-gray-600 mt-1">
          Manage playlists and music for your dance classes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Your existing music tools will be migrated here. This is a
            placeholder for your React components.
          </p>
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-500">
              To add your existing music tools, migrate your React components to{" "}
              <code className="bg-gray-200 px-1 rounded">
                src/components/tools/music/
              </code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
