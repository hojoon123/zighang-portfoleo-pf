import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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

// Create a safe Supabase client that only initializes if properly configured
export const supabase = (() => {
  if (!isSupabaseConfigured) {
    console.warn("Supabase is not properly configured. Some features may not work.")
    // Return a mock client that prevents errors
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () =>
          Promise.resolve({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
        signUp: () =>
          Promise.resolve({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: { message: "Supabase not configured" } }),
        update: () => ({ data: null, error: { message: "Supabase not configured" } }),
        delete: () => ({ data: null, error: { message: "Supabase not configured" } }),
      }),
    } as any
  }

  try {
    return createClientComponentClient()
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
    // Return the same mock client as fallback
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () =>
          Promise.resolve({
            data: { user: null, session: null },
            error: { message: "Supabase client creation failed" },
          }),
        signUp: () =>
          Promise.resolve({
            data: { user: null, session: null },
            error: { message: "Supabase client creation failed" },
          }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: { message: "Supabase client creation failed" } }),
        update: () => ({ data: null, error: { message: "Supabase client creation failed" } }),
        delete: () => ({ data: null, error: { message: "Supabase client creation failed" } }),
      }),
    } as any
  }
})()

// Helper function to check if Supabase operations are available
export const isSupabaseAvailable = () => isSupabaseConfigured
