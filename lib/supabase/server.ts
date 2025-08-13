import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"

// Simplified Supabase configuration check
export const isSupabaseConfigured = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn("Supabase environment variables not set")
    return false
  }

  try {
    new URL(url)
    return true
  } catch (error) {
    console.warn("Invalid Supabase URL:", url)
    return false
  }
})()

// Simple mock client that returns empty data
const createMockClient = () => ({
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signInWithPassword: () =>
      Promise.resolve({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
    signUp: () =>
      Promise.resolve({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
    signOut: () => Promise.resolve({ error: null }),
  },
  from: (table: string) => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
    update: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
    delete: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
  }),
  rpc: () => Promise.resolve({ data: [], error: null }),
})

// Create a cached version of the Supabase client for Server Components
export const createClient = cache(async () => {
  if (!isSupabaseConfigured) {
    console.warn("Using mock Supabase client - environment variables not configured")
    return createMockClient() as any
  }

  try {
    const cookieStore = await cookies()
    return createServerComponentClient({ cookies: () => cookieStore })
  } catch (error) {
    console.error("Failed to create server Supabase client:", error)
    return createMockClient() as any
  }
})

// Helper function to check if Supabase operations are available
export const isSupabaseAvailable = () => isSupabaseConfigured
