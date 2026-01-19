"use client"

import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  id: string
  label: string
  onImageSelect: (file: File | null) => void
  previewUrl: string | null
  icon: React.ReactNode
  className?: string
}

export function ImageUploader({
  id,
  label,
  onImageSelect,
  previewUrl,
  icon,
  className,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onImageSelect(file)
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <input
        type="file"
        id={id}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <label
        htmlFor={id}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "relative w-full aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50",
          previewUrl && "border-solid border-gray-200"
        )}
      >
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt={label}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-xl">
              <span className="text-white font-medium text-sm">Change</span>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 p-4">
            <div className="w-10 h-10 mx-auto text-gray-400">{icon}</div>
            <p className="mt-2 font-medium text-gray-700 text-sm">{label}</p>
            <p className="text-xs text-gray-400">Click or drag & drop</p>
          </div>
        )}
      </label>
    </div>
  )
}
