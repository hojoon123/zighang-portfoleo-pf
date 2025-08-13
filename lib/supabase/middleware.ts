import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export const isSupabaseConfigured = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (typeof url !== "string" || url.length === 0) {
    console.warn("NEXT_PUBLIC_SUPABASE_URL is not set or empty")
    return false
  }

  if (typeof key !== "string" || key.length === 0) {
    console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set or empty")
    return false
  }

  try {
    new URL(url)
    return true
  } catch (error) {
    console.warn("NEXT_PUBLIC_SUPABASE_URL is not a valid URL:", url)
    return false
  }
})()

export async function updateSession(request: NextRequest) {
  if (!isSupabaseConfigured) {
    console.warn("Supabase is not properly configured. Skipping authentication.")
    return NextResponse.next({
      request,
    })
  }

  try {
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
          },
        },
      },
    )

    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    if (code) {
      try {
        await supabase.auth.exchangeCodeForSession(code)
        return NextResponse.redirect(new URL("/", request.url))
      } catch (error) {
        console.error("Error exchanging code for session:", error)
        return NextResponse.redirect(new URL("/auth/login?error=auth_callback_failed", request.url))
      }
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // 보호된 라우트 확인
    const isAuthRoute = request.nextUrl.pathname.startsWith("/auth/") || request.nextUrl.pathname === "/auth/callback"

    if (!isAuthRoute && !user) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    return supabaseResponse
  } catch (error) {
    console.error("Error in updateSession middleware:", error)
    return NextResponse.next({
      request,
    })
  }
}
