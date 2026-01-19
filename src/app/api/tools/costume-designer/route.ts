import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI, Modality } from "@google/genai"
import { auth } from "@/lib/auth"

const PROMPT = `
**ROLE:** You are a professional digital artist specializing in photorealistic apparel mockups. You will act as a photo editor.

**OBJECTIVE:** Your SOLE task is to edit the **first image** you receive (the "Source Image") by adding clothing and accessories from ALL subsequent images (the "Asset Images"). The final output must be a single, edited image.

**CRITICAL INSTRUCTIONS (FAILURE TO FOLLOW WILL RESULT IN AN INCORRECT OUTPUT):**
1.  **THE FIRST IMAGE IS THE BASE:** The very first image you receive is the Source Image containing the person. It is the canvas. All edits happen ON this image.
2.  **PRESERVE THE PERSON - DO NOT CHANGE THEM:** The person in the Source Image (their face, hair, body, pose, expression, skin tone) MUST remain **100% IDENTICAL** in the final output. You are FORBIDDEN from altering the person.
3.  **USE ALL ASSETS:** All images provided *after* the Source Image are Asset Images. You must incorporate **EVERY SINGLE ITEM** from these Asset Images into the final image, placing them realistically on the person.
4.  **WHITE BACKGROUND ONLY:** The final image must have a completely solid, plain white background (#FFFFFF). Remove the original background from the Source Image.
5.  **STUDIO QUALITY:** Ensure the lighting on the added assets matches a professional studio photo.

**FINAL CHECK:** Before outputting, verify that the person in your generated image is the exact same person from the Source Image. Do not merge or blend features. Your job is to overlay clothing, not create a new person. Your final output must be ONLY the edited image.
`

interface CostumePart {
  base64: string
  mimeType: string
}

interface RequestBody {
  dancerImageBase64: string
  dancerMimeType: string
  costumeItems: CostumePart[]
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    // TODO: Re-enable auth check before production
    // const session = await auth()
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    // Check subscription (this tool requires Pro)
    // TODO: Re-enable subscription check before production
    // const isSubscribed =
    //   (session.user.subscriptionStatus === "active" ||
    //     session.user.subscriptionStatus === "trialing") &&
    //   session.user.subscriptionTier === "pro"

    // if (!isSubscribed) {
    //   return NextResponse.json(
    //     { error: "Pro subscription required" },
    //     { status: 403 }
    //   )
    // }

    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error("GEMINI_API_KEY not configured")
      return NextResponse.json(
        { error: "Service not configured" },
        { status: 500 }
      )
    }

    const body: RequestBody = await request.json()
    const { dancerImageBase64, dancerMimeType, costumeItems } = body

    if (!dancerImageBase64 || !costumeItems || costumeItems.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const ai = new GoogleGenAI({ apiKey })

    const dancerPart = {
      inlineData: {
        data: dancerImageBase64,
        mimeType: dancerMimeType,
      },
    }

    const costumeParts = costumeItems.map((item) => ({
      inlineData: {
        data: item.base64,
        mimeType: item.mimeType,
      },
    }))

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: {
        parts: [
          dancerPart,
          { text: PROMPT },
          ...costumeParts,
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    })

    const part = response.candidates?.[0]?.content?.parts?.[0]
    if (part && "inlineData" in part && part.inlineData) {
      return NextResponse.json({ imageBase64: part.inlineData.data })
    }

    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    )
  } catch (error) {
    console.error("Costume designer error:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
