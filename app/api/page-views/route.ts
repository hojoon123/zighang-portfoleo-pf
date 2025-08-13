import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase.from("page_views").insert({
      page_path: body.page_path,
      referrer: body.referrer,
      user_agent: body.user_agent,
      user_id: null, // 로그인된 사용자가 있다면 추가
      session_id: null, // 세션 ID가 있다면 추가
    })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save page view" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Page views API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
