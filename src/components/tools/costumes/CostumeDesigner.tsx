"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageUploader } from "./ImageUploader"
import {
  DancerIcon,
  SparklesIcon,
  ErrorIcon,
  RefreshIcon,
  PlusIcon,
  CloseIcon,
  DownloadIcon,
} from "./icons"
import type { ImageState } from "./types"

export function CostumeDesigner() {
  const [dancerImage, setDancerImage] = useState<ImageState | null>(null)
  const [costumeItems, setCostumeItems] = useState<ImageState[]>([])
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("AI is designing...")
  const [error, setError] = useState<string | null>(null)

  const fileToImageState = (file: File): Promise<ImageState> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(",")[1]
        const previewUrl = URL.createObjectURL(file)
        resolve({
          file: file,
          base64: base64String,
          previewUrl: previewUrl,
        })
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleDancerImageSelect = async (file: File | null) => {
    if (file) {
      const imageState = await fileToImageState(file)
      setDancerImage(imageState)
      setError(null)
    } else {
      setDancerImage(null)
    }
  }

  const handleAddCostumeItem = async (file: File | null) => {
    if (file) {
      const imageState = await fileToImageState(file)
      setCostumeItems((prev) => [...prev, imageState])
      setError(null)
    }
  }

  const handleRemoveCostumeItem = (indexToRemove: number) => {
    setCostumeItems((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleGenerate = useCallback(async () => {
    if (!dancerImage || costumeItems.length === 0) {
      setError("Please upload a dancer image and at least one costume item.")
      return
    }

    setIsLoading(true)
    setError(null)
    setGeneratedImage(null)
    setLoadingMessage("Initializing...")

    try {
      let currentDancerBase64 = dancerImage.base64
      let currentDancerMimeType = dancerImage.file.type

      for (let i = 0; i < costumeItems.length; i++) {
        const item = costumeItems[i]
        setLoadingMessage(`Adding item ${i + 1} of ${costumeItems.length}...`)

        const response = await fetch("/api/tools/costume-designer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dancerImageBase64: currentDancerBase64,
            dancerMimeType: currentDancerMimeType,
            costumeItems: [{ base64: item.base64, mimeType: item.file.type }],
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || `Failed while adding item ${i + 1}`)
        }

        const data = await response.json()

        if (data.imageBase64) {
          currentDancerBase64 = data.imageBase64
          currentDancerMimeType = "image/png"
        } else {
          throw new Error(`The AI failed while adding item ${i + 1}. Please try again.`)
        }
      }

      setGeneratedImage(`data:image/png;base64,${currentDancerBase64}`)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "An unknown error occurred.")
    } finally {
      setIsLoading(false)
      setLoadingMessage("AI is designing...")
    }
  }, [dancerImage, costumeItems])

  const handleStartOver = () => {
    setDancerImage(null)
    setCostumeItems([])
    setGeneratedImage(null)
    setError(null)
    setIsLoading(false)
  }

  const handleDownload = () => {
    if (!generatedImage) return
    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `costume-design-${Date.now()}.png`
    link.click()
  }

  const canGenerate = dancerImage && costumeItems.length > 0 && !isLoading

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Inputs */}
        <div className="space-y-4">
          {/* Dancer Upload */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3 text-sm text-gray-700">
                Dancer Image
              </h3>
              <ImageUploader
                id="dancer-upload"
                label="Upload Dancer"
                onImageSelect={handleDancerImageSelect}
                previewUrl={dancerImage?.previewUrl || null}
                icon={<DancerIcon className="w-full h-full" />}
              />
            </CardContent>
          </Card>

          {/* Costume Items */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3 text-sm text-gray-700">
                Costume & Accessories
              </h3>

              {/* Grid of added items */}
              {costumeItems.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {costumeItems.map((item, index) => (
                    <div
                      key={item.previewUrl}
                      className="relative group aspect-square"
                    >
                      <img
                        src={item.previewUrl}
                        alt={`Costume item ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <button
                        onClick={() => handleRemoveCostumeItem(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        aria-label="Remove item"
                      >
                        <CloseIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add item uploader */}
              <ImageUploader
                id="costume-upload"
                label="Add Item"
                onImageSelect={handleAddCostumeItem}
                previewUrl={null}
                icon={<PlusIcon className="w-full h-full" />}
                className="max-w-[120px]"
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full"
              size="lg"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              Generate Design
            </Button>

            {(generatedImage || error || costumeItems.length > 0 || dancerImage) && (
              <Button
                onClick={handleStartOver}
                variant="outline"
                className="w-full"
              >
                <RefreshIcon className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6 min-h-[400px] flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center text-center">
                <SparklesIcon className="h-16 w-16 animate-pulse text-blue-500" />
                <p className="mt-4 text-lg font-medium">{loadingMessage}</p>
                <p className="text-gray-500 text-sm">
                  This may take a few moments.
                </p>
              </div>
            )}

            {error && !isLoading && (
              <div className="flex flex-col items-center text-center text-red-500">
                <ErrorIcon className="h-16 w-16" />
                <p className="mt-4 text-lg font-medium">An Error Occurred</p>
                <p className="text-gray-600 max-w-md text-sm">{error}</p>
              </div>
            )}

            {generatedImage && !isLoading && !error && (
              <div className="w-full h-full flex flex-col items-center gap-4">
                <img
                  src={generatedImage}
                  alt="Generated dancer with costume"
                  className="max-w-full max-h-[500px] object-contain rounded-lg shadow-lg"
                />
                <Button onClick={handleDownload} variant="outline" size="sm">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Download Image
                </Button>
              </div>
            )}

            {!isLoading && !generatedImage && !error && (
              <div className="text-center text-gray-400">
                <SparklesIcon className="h-16 w-16 mx-auto" />
                <p className="mt-4 text-lg font-medium">
                  Your creation will appear here
                </p>
                <p className="text-sm">
                  Upload a dancer and add costume items to begin.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
