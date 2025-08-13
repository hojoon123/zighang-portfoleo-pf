import { type NextRequest, NextResponse } from "next/server"
import { updateUserProfile } from "@/lib/supabase/database"

export async function PUT(request: NextRequest) {
  try {
    const { userId, updates } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const { error } = await updateUserProfile(userId, updates)

    if (error) {
      console.error("Error updating profile:", error)
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in profile API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
