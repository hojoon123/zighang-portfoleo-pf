import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { cache } from "react"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

const createMockQueryBuilder = () => {
  const mockResult = { data: [], error: null, count: 0 }
  const queryBuilder = {
    select: () => queryBuilder,
    insert: () => queryBuilder,
    update: () => queryBuilder,
    delete: () => queryBuilder,
    eq: () => queryBuilder,
    neq: () => queryBuilder,
    gt: () => queryBuilder,
    gte: () => queryBuilder,
    lt: () => queryBuilder,
    lte: () => queryBuilder,
    like: () => queryBuilder,
    ilike: () => queryBuilder,
    is: () => queryBuilder,
    in: () => queryBuilder,
    contains: () => queryBuilder,
    containedBy: () => queryBuilder,
    rangeGt: () => queryBuilder,
    rangeGte: () => queryBuilder,
    rangeLt: () => queryBuilder,
    rangeLte: () => queryBuilder,
    rangeAdjacent: () => queryBuilder,
    overlaps: () => queryBuilder,
    textSearch: () => queryBuilder,
    match: () => queryBuilder,
    not: () => queryBuilder,
    or: () => queryBuilder,
    filter: () => queryBuilder,
    order: () => queryBuilder,
    limit: () => queryBuilder,
    range: () => queryBuilder,
    single: () => queryBuilder,
    maybeSingle: () => queryBuilder,
    csv: () => queryBuilder,
    geojson: () => queryBuilder,
    explain: () => queryBuilder,
    rollback: () => queryBuilder,
    returns: () => queryBuilder,
    then: (resolve: any) => resolve(mockResult),
    catch: () => queryBuilder,
  }
  return queryBuilder
}

const createMockClient = () => ({
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithPassword: async () => ({
      data: { user: null, session: null },
      error: { message: "Supabase not configured" },
    }),
    signUp: async () => ({
      data: { user: null, session: null },
      error: { message: "Supabase not configured" },
    }),
    signOut: async () => ({ error: null }),
  },
  from: () => createMockQueryBuilder(),
  rpc: async () => ({ data: [], error: null }),
})

// Create a cached version of the Supabase client for Server Components
export const createClient = cache(async () => {
  if (!isSupabaseConfigured) {
    console.warn("Supabase environment variables are not set. Using mock client.")
    return createMockClient() as any
  }

  try {
    const cookieStore = await cookies()

    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    })
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
    return createMockClient() as any
  }
})

// Helper function to check if Supabase operations are available
export const isSupabaseAvailable = () => isSupabaseConfigured
