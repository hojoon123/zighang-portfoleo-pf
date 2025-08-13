import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { cache } from "react"

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

// Create a mock query builder that supports method chaining
function createMockQueryBuilder() {
  const mockResult = { data: [], error: null, count: 0 }

  const queryBuilder = {
    // Selection methods
    select: (columns?: string, options?: any) => queryBuilder,

    // Filter methods
    eq: (column: string, value: any) => queryBuilder,
    neq: (column: string, value: any) => queryBuilder,
    gt: (column: string, value: any) => queryBuilder,
    gte: (column: string, value: any) => queryBuilder,
    lt: (column: string, value: any) => queryBuilder,
    lte: (column: string, value: any) => queryBuilder,
    like: (column: string, pattern: string) => queryBuilder,
    ilike: (column: string, pattern: string) => queryBuilder,
    in: (column: string, values: any[]) => queryBuilder,
    not: (column: string, operator: string, value: any) => queryBuilder,
    or: (filters: string) => queryBuilder,

    // Ordering and limiting
    order: (column: string, options?: any) => queryBuilder,
    range: (from: number, to: number) => queryBuilder,
    limit: (count: number) => queryBuilder,

    // Execution methods
    single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
    then: (callback: any) => callback(mockResult),

    // Make it thenable for async/await
    [Symbol.toStringTag]: "Promise",
  }

  // Add Promise-like behavior
  Object.defineProperty(queryBuilder, "then", {
    value: (onFulfilled?: any, onRejected?: any) => {
      return Promise.resolve(mockResult).then(onFulfilled, onRejected)
    },
  })

  return queryBuilder
}

// Create a cached version of the Supabase client for Server Components
export const createClient = cache(() => {
  if (!isSupabaseConfigured) {
    console.warn("Supabase is not properly configured. Using mock client for server components.")
    // Return a comprehensive mock client that matches Supabase API
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () =>
          Promise.resolve({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
        signUp: () =>
          Promise.resolve({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: (table: string) => {
        const queryBuilder = createMockQueryBuilder()

        return {
          ...queryBuilder,
          insert: (values: any) => ({
            select: () => ({ data: null, error: { message: "Supabase not configured" } }),
            single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
            then: (callback: any) => callback({ data: null, error: { message: "Supabase not configured" } }),
          }),
          update: (values: any) => ({
            eq: (column: string, value: any) => ({
              select: () => ({ data: null, error: { message: "Supabase not configured" } }),
              single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
              then: (callback: any) => callback({ data: null, error: { message: "Supabase not configured" } }),
            }),
          }),
          delete: () => ({
            eq: (column: string, value: any) =>
              Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
          }),
        }
      },
      rpc: (functionName: string, params?: any) =>
        Promise.resolve({ data: [], error: { message: "Supabase not configured" } }),
      raw: (sql: string) => sql,
    } as any
  }

  try {
    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookies().set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    })
  } catch (error) {
    console.error("Failed to create server Supabase client:", error)
    // Return the same mock client as fallback
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () =>
          Promise.resolve({
            data: { user: null, session: null },
            error: { message: "Supabase server client creation failed" },
          }),
        signUp: () =>
          Promise.resolve({
            data: { user: null, session: null },
            error: { message: "Supabase server client creation failed" },
          }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: (table: string) => {
        const queryBuilder = createMockQueryBuilder()

        return {
          ...queryBuilder,
          insert: (values: any) => ({
            select: () => ({ data: null, error: { message: "Supabase server client creation failed" } }),
            single: () => Promise.resolve({ data: null, error: { message: "Supabase server client creation failed" } }),
            then: (callback: any) =>
              callback({ data: null, error: { message: "Supabase server client creation failed" } }),
          }),
          update: (values: any) => ({
            eq: (column: string, value: any) => ({
              select: () => ({ data: null, error: { message: "Supabase server client creation failed" } }),
              single: () =>
                Promise.resolve({ data: null, error: { message: "Supabase server client creation failed" } }),
              then: (callback: any) =>
                callback({ data: null, error: { message: "Supabase server client creation failed" } }),
            }),
          }),
          delete: () => ({
            eq: (column: string, value: any) =>
              Promise.resolve({ data: null, error: { message: "Supabase server client creation failed" } }),
          }),
        }
      },
      rpc: (functionName: string, params?: any) =>
        Promise.resolve({ data: [], error: { message: "Supabase server client creation failed" } }),
      raw: (sql: string) => sql,
    } as any
  }
})

// Helper function to check if Supabase operations are available
export const isSupabaseAvailable = () => isSupabaseConfigured
