import { CostumeDesigner } from "@/components/tools/costumes"

export default function CostumeToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Costume Designer</h1>
        <p className="text-gray-600 mt-1">
          Upload a dancer photo and costume items to visualize the complete look
        </p>
      </div>

      <CostumeDesigner />
    </div>
  )
}
