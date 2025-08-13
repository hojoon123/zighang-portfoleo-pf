"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signIn(prevState: any, formData: FormData) {
  console.log("🔐 [LOGIN] Starting login process...")

  // Check if formData is valid
  if (!formData) {
    console.error("❌ [LOGIN] Form data is missing")
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  console.log("📧 [LOGIN] Email:", email ? "provided" : "missing")
  console.log("🔑 [LOGIN] Password:", password ? "provided" : "missing")

  // Validate required fields
  if (!email || !password) {
    console.error("❌ [LOGIN] Email or password missing")
    return { error: "Email and password are required" }
  }

  try {
    console.log("🔄 [LOGIN] Creating Supabase client...")
    const supabase = await createClient()
    console.log("✅ [LOGIN] Supabase client created successfully")

    console.log("🔄 [LOGIN] Attempting to sign in with password...")
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      console.error("❌ [LOGIN] Supabase auth error:", error.message)
      return { error: error.message }
    }

    if (data.user) {
      console.log("✅ [LOGIN] User signed in successfully:", data.user.email)
      console.log("🔄 [LOGIN] Session created:", data.session ? "yes" : "no")
    } else {
      console.warn("⚠️ [LOGIN] No user data returned")
    }

    // Return success instead of redirecting directly
    console.log("✅ [LOGIN] Login process completed successfully")
    return { success: true }
  } catch (error) {
    console.error("💥 [LOGIN] Unexpected error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signUp(prevState: any, formData: FormData) {
  console.log("📝 [SIGNUP] Starting signup process...")

  // Check if formData is valid
  if (!formData) {
    console.error("❌ [SIGNUP] Form data is missing")
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  console.log("📧 [SIGNUP] Email:", email ? "provided" : "missing")
  console.log("🔑 [SIGNUP] Password:", password ? "provided" : "missing")

  // Validate required fields
  if (!email || !password) {
    console.error("❌ [SIGNUP] Email or password missing")
    return { error: "Email and password are required" }
  }

  try {
    console.log("🔄 [SIGNUP] Creating Supabase client...")
    const supabase = await createClient()
    console.log("✅ [SIGNUP] Supabase client created successfully")

    console.log("🔄 [SIGNUP] Attempting to sign up...")
    const { data, error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      console.error("❌ [SIGNUP] Supabase auth error:", error.message)
      return { error: error.message }
    }

    if (data.user) {
      console.log("✅ [SIGNUP] User created successfully:", data.user.email)
    }

    console.log("✅ [SIGNUP] Signup process completed successfully")
    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("💥 [SIGNUP] Unexpected error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  console.log("🚪 [LOGOUT] Starting logout process...")

  try {
    const supabase = await createClient()
    console.log("✅ [LOGOUT] Supabase client created successfully")

    await supabase.auth.signOut()
    console.log("✅ [LOGOUT] User signed out successfully")

    redirect("/auth/login")
  } catch (error) {
    console.error("💥 [LOGOUT] Unexpected error:", error)
    redirect("/auth/login")
  }
}
