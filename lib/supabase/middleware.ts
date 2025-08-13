import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, type NextRequest } from "next/server"

// Enhanced Supabase configuration check with URL validation
export const isSupabaseConfigured = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if environment variables exist and are not empty
  if (typeof url !== "string" || url.length === 0) {
    console.warn("NEXT_PUBLIC_SUPABASE_URL is not set or empty")
    return false
  }

  if (typeof key !== "string" || key.length === 0) {
    console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set or empty")
    return false
  }

  // Validate URL format
  try {
    new URL(url)
    // Check if it's a valid Supabase URL pattern
    if (!url.includes("supabase.co") && !url.includes("localhost")) {
      console.warn("NEXT_PUBLIC_SUPABASE_URL does not appear to be a valid Supabase URL")
      return false
    }
    return true
  } catch (error) {
    console.warn("NEXT_PUBLIC_SUPABASE_URL is not a valid URL:", url)
    return false
  }
})()

export async function updateSession(request: NextRequest) {
  // If Supabase is not configured, just continue without auth
  if (!isSupabaseConfigured) {
    console.warn("Supabase is not properly configured. Skipping authentication.")
    return NextResponse.next({
      request,
    })
  }

  try {
    const res = NextResponse.next()

    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req: request, res })

    // Check if this is an auth callback
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    if (code) {
      try {
        // Exchange the code for a session
        await supabase.auth.exchangeCodeForSession(code)
        // Redirect to home page after successful auth
        return NextResponse.redirect(new URL("/", request.url))
      } catch (error) {
        console.error("Error exchanging code for session:", error)
        // Redirect to login on error
        return NextResponse.redirect(new URL("/auth/login?error=auth_callback_failed", request.url))
      }
    }

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession()

    // Protected routes - redirect to login if not authenticated
    const isAuthRoute =
      request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/sign-up") ||
      request.nextUrl.pathname === "/auth/callback"

    if (!isAuthRoute) {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        const redirectUrl = new URL("/auth/login", request.url)
        return NextResponse.redirect(redirectUrl)
      }
    }

    return res
  } catch (error) {
    console.error("Error in updateSession middleware:", error)
    // If there's any error with Supabase, continue without auth
    return NextResponse.next({
      request,
    })
  }
}
