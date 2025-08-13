import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import Header from "@/components/landing/header"
import Footer from "@/components/landing/footer"

export default async function LoginPage() {
  console.log("🔍 [LOGIN PAGE] Checking Supabase configuration...")
  console.log("🔍 [LOGIN PAGE] isSupabaseConfigured:", isSupabaseConfigured)

  // If Supabase is not configured, show setup message directly
  if (!isSupabaseConfigured) {
    console.warn("⚠️ [LOGIN PAGE] Supabase not configured, showing setup message")
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Connect Supabase to get started</h1>
      </div>
    )
  }

  try {
    console.log("🔄 [LOGIN PAGE] Creating Supabase client...")
    const supabase = await createClient()
    console.log("✅ [LOGIN PAGE] Supabase client created successfully")

    console.log("🔄 [LOGIN PAGE] Checking existing session...")
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error("❌ [LOGIN PAGE] Error getting session:", error.message)
    } else {
      console.log("🔍 [LOGIN PAGE] Session check result:", session ? "logged in" : "not logged in")
    }

    // If user is logged in, redirect to home page
    if (session) {
      console.log("🔄 [LOGIN PAGE] User already logged in, redirecting to home...")
      redirect("/")
    }

    console.log("✅ [LOGIN PAGE] Rendering login form...")
  } catch (error) {
    console.error("💥 [LOGIN PAGE] Unexpected error:", error)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}
