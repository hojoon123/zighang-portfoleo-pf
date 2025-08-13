import { NextResponse } from "next/server"
import { getJobCategories } from "@/lib/supabase/database"

export async function GET() {
  try {
    const { data, error } = await getJobCategories()

    if (error) {
      console.error("Failed to fetch categories:", error)
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
