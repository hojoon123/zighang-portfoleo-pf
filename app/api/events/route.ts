import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase.from("events").insert({
      event_name: body.event_name,
      event_data: body.event_data,
      page_path: body.page_path,
      user_id: null, // 로그인된 사용자가 있다면 추가
      session_id: null, // 세션 ID가 있다면 추가
    })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save event" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Events API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
