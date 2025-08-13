import { NextResponse } from "next/server"
import { searchJobs } from "@/lib/supabase/database"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const categories = searchParams.getAll("category").filter(Boolean)
    const locations = searchParams.getAll("location").filter(Boolean)
    const experiences = searchParams.getAll("experience").filter(Boolean)
    const employmentTypes = searchParams.getAll("employmentType").filter(Boolean)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const { data, error, count } = await searchJobs(page, limit, {
      search: search || undefined,
      categories: categories.length > 0 ? categories : undefined,
      locations: locations.length > 0 ? locations : undefined,
      experiences: experiences.length > 0 ? experiences : undefined,
      employmentTypes: employmentTypes.length > 0 ? employmentTypes : undefined,
    })

    if (error) {
      console.error("Failed to fetch jobs:", error)
      return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
    }

    return NextResponse.json({ data, count })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
