import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, studioName, phone, message } = body

    // Validate required fields
    if (!name || !email || !studioName) {
      return NextResponse.json(
        { error: "Name, email, and studio name are required" },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Store the lead in the database
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        studioName,
        phone: phone || null,
        message: message || null,
        source: "website",
        status: "new",
      },
    })

    // Log for visibility (replace with email notification in production)
    console.log("New lead captured:", {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      studioName: lead.studioName,
      createdAt: lead.createdAt,
    })

    return NextResponse.json(
      { success: true, message: "Thank you for your interest! We'll be in touch soon." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error saving lead:", error)
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    )
  }
}
