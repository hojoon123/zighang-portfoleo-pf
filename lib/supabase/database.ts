import { createClient } from "@/lib/supabase/server"

export async function getJobCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("job_categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching job categories:", error)
    return { data: [], error }
  }

  return { data: data || [], error: null }
}

export async function getJobPostings(
  page = 1,
  limit = 10,
  filters?: {
    categories?: string[]
    experiences?: string[]
    locations?: string[]
    employmentTypes?: string[]
    search?: string
  },
) {
  const supabase = await createClient()

  let query = supabase
    .from("job_postings")
    .select("*", { count: "exact" })
    .eq("is_active", true)
    .order("posted_at", { ascending: false })

  // Apply filters with OR logic for arrays
  if (filters?.categories && filters.categories.length > 0) {
    query = query.in("category", filters.categories)
  }
  if (filters?.experiences && filters.experiences.length > 0) {
    query = query.in("experience", filters.experiences)
  }
  if (filters?.locations && filters.locations.length > 0) {
    // 위치는 부분 매칭을 위해 or 조건 사용
    const locationConditions = filters.locations.map((loc) => `location.ilike.%${loc}%`).join(",")
    query = query.or(locationConditions)
  }
  if (filters?.employmentTypes && filters.employmentTypes.length > 0) {
    query = query.in("employment_type", filters.employmentTypes)
  }
  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,company.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
    )
  }

  // Apply pagination
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await query.range(from, to)

  if (error) {
    console.error("Error fetching job postings:", error)
    return { data: [], count: 0, error }
  }

  return { data: data || [], count: count || 0, error: null }
}

export async function searchJobs(
  page = 1,
  limit = 10,
  filters?: {
    categories?: string[]
    experiences?: string[]
    locations?: string[]
    employmentTypes?: string[]
    search?: string
  },
) {
  return getJobPostings(page, limit, filters)
}

export async function getJobPosting(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("job_postings").select("*").eq("id", id).eq("is_active", true).single()

  if (error) {
    console.error("Error fetching job posting:", error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function incrementJobViews(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("job_postings")
    .update({ views: supabase.raw("views + 1") })
    .eq("id", id)

  if (error) {
    console.error("Error incrementing job views:", error)
  }
}

export async function getUserProfile(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function updateUserProfile(userId: string, updates: Partial<any>) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("user_profiles").update(updates).eq("id", userId).select().single()

  if (error) {
    console.error("Error updating user profile:", error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function getPageViews(startDate: Date, endDate?: Date) {
  const supabase = await createClient()

  let query = supabase
    .from("page_views")
    .select("*")
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: false })

  if (endDate) {
    query = query.lte("created_at", endDate.toISOString())
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching page views:", error)
    return []
  }

  return data || []
}

export async function getSearchEvents(startDate: Date, endDate?: Date) {
  const supabase = await createClient()

  let query = supabase
    .from("events")
    .select("*")
    .in("event_name", ["Search", "search"])
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: false })

  if (endDate) {
    query = query.lte("created_at", endDate.toISOString())
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching search events:", error)
    return []
  }

  return data || []
}

export async function getJobViewEvents(startDate: Date, endDate?: Date) {
  const supabase = await createClient()

  let query = supabase
    .from("events")
    .select("*")
    .in("event_name", ["Job Viewed", "job_view"])
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: false })

  if (endDate) {
    query = query.lte("created_at", endDate.toISOString())
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching job view events:", error)
    return []
  }

  return data || []
}

export async function getFilterEvents(startDate: Date) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .in("event_name", ["Filter Applied", "filter_applied"])
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching filter events:", error)
    return []
  }

  return data || []
}

export async function getTopSearchQueries(period = "7d") {
  const now = new Date()
  const startDate = new Date()

  switch (period) {
    case "1d":
      startDate.setDate(now.getDate() - 1)
      break
    case "7d":
      startDate.setDate(now.getDate() - 7)
      break
    case "30d":
      startDate.setDate(now.getDate() - 30)
      break
    case "90d":
      startDate.setDate(now.getDate() - 90)
      break
    default:
      startDate.setDate(now.getDate() - 7)
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("events")
    .select("event_data")
    .in("event_name", ["Search", "search"])
    .gte("created_at", startDate.toISOString())
    .not("event_data", "is", null)

  if (error) {
    console.error("Error fetching top search queries:", error)
    return []
  }

  // 검색어별 카운트 계산
  const queryCount = (data || []).reduce((acc: Record<string, number>, item) => {
    try {
      const eventData = typeof item.event_data === "string" ? JSON.parse(item.event_data) : item.event_data
      const searchQuery = eventData?.query || eventData?.search_query
      if (searchQuery && searchQuery.trim()) {
        acc[searchQuery] = (acc[searchQuery] || 0) + 1
      }
    } catch (e) {
      // JSON 파싱 에러 무시
    }
    return acc
  }, {})

  // 상위 5개 검색어 반환
  return Object.entries(queryCount)
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
}

export async function getTopCategories(period = "7d") {
  const now = new Date()
  const startDate = new Date()

  switch (period) {
    case "1d":
      startDate.setDate(now.getDate() - 1)
      break
    case "7d":
      startDate.setDate(now.getDate() - 7)
      break
    case "30d":
      startDate.setDate(now.getDate() - 30)
      break
    case "90d":
      startDate.setDate(now.getDate() - 90)
      break
    default:
      startDate.setDate(now.getDate() - 7)
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("events")
    .select("event_data")
    .in("event_name", ["Filter Applied", "filter_applied"])
    .gte("created_at", startDate.toISOString())
    .not("event_data", "is", null)

  if (error) {
    console.error("Error fetching top categories:", error)
    return []
  }

  // 카테고리별 카운트 계산
  const categoryCount = (data || []).reduce((acc: Record<string, number>, item) => {
    try {
      const eventData = typeof item.event_data === "string" ? JSON.parse(item.event_data) : item.event_data
      const categories = eventData?.categories || eventData?.filters?.categories || []

      if (Array.isArray(categories)) {
        categories.forEach((category: string) => {
          if (category && category.trim()) {
            acc[category] = (acc[category] || 0) + 1
          }
        })
      }
    } catch (e) {
      // JSON 파싱 에러 무시
    }
    return acc
  }, {})

  const totalViews = Object.values(categoryCount).reduce((sum: number, count: number) => sum + count, 0)

  // 상위 5개 카테고리 반환 (백분율 포함)
  return Object.entries(categoryCount)
    .map(([category, views]) => ({
      category,
      views: views as number,
      percentage: totalViews > 0 ? Math.round(((views as number) / totalViews) * 100) : 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
}

export async function getAnalyticsOverview(period = "7d") {
  const supabase = await createClient()

  // 기간에 따른 날짜 계산
  const now = new Date()
  const startDate = new Date()

  switch (period) {
    case "1d":
      startDate.setDate(now.getDate() - 1)
      break
    case "7d":
      startDate.setDate(now.getDate() - 7)
      break
    case "30d":
      startDate.setDate(now.getDate() - 30)
      break
    case "90d":
      startDate.setDate(now.getDate() - 90)
      break
    default:
      startDate.setDate(now.getDate() - 7)
  }

  try {
    // 병렬로 모든 데이터 조회
    const [pageViewsResult, searchEventsResult, jobViewEventsResult, totalUsersResult] = await Promise.all([
      supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startDate.toISOString()),
      supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .in("event_name", ["Search", "search"])
        .gte("created_at", startDate.toISOString()),
      supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .in("event_name", ["Job Viewed", "job_view"])
        .gte("created_at", startDate.toISOString()),
      supabase.from("user_profiles").select("*", { count: "exact", head: true }),
    ])

    return {
      totalUsers: totalUsersResult.count || 0,
      totalPageViews: pageViewsResult.count || 0,
      totalSearches: searchEventsResult.count || 0,
      totalJobViews: jobViewEventsResult.count || 0,
      totalBookmarks: 0, // TODO: 북마크 테이블이 있다면 추가
      totalApplications: 0, // TODO: 지원 테이블이 있다면 추가
    }
  } catch (error) {
    console.error("Error fetching analytics overview:", error)
    return {
      totalUsers: 0,
      totalPageViews: 0,
      totalSearches: 0,
      totalJobViews: 0,
      totalBookmarks: 0,
      totalApplications: 0,
    }
  }
}

export async function trackPageView(pagePath: string, userId?: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("page_views").insert({
    page_path: pagePath,
    user_id: userId,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error tracking page view:", error)
  }
}

export async function trackSearchEvent(searchQuery: string, resultsCount: number, userId?: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("events").insert({
    event_name: "Search",
    event_data: {
      query: searchQuery,
      results_count: resultsCount,
    },
    page_path: "/jobs",
    user_id: userId,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error tracking search event:", error)
  }
}

export async function trackJobViewEvent(jobId: string, userId?: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("events").insert({
    event_name: "Job Viewed",
    event_data: {
      job_id: jobId,
    },
    page_path: `/jobs/${jobId}`,
    user_id: userId,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error tracking job view event:", error)
  }
}

export async function trackFilterEvent(filters: any, userId?: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("events").insert({
    event_name: "Filter Applied",
    event_data: {
      filters,
      categories: filters.categories,
      experiences: filters.experiences,
      locations: filters.locations,
      employmentTypes: filters.employmentTypes,
    },
    page_path: "/jobs",
    user_id: userId,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error tracking filter event:", error)
  }
}

export async function getTotalUsers() {
  const supabase = await createClient()

  const { count, error } = await supabase.from("user_profiles").select("*", { count: "exact", head: true })

  if (error) {
    console.error("Error fetching total users:", error)
    return 0
  }

  return count || 0
}

export async function getRecentEvents(limit = 20, offset = 0) {
  const supabase = await createClient()

  // events와 page_views를 UNION으로 합쳐서 최신 순으로 조회
  const { data, error } = await supabase.rpc("get_recent_events", {
    limit_count: limit,
    offset_count: offset,
  })

  if (error) {
    console.error("Error fetching recent events:", error)
    return []
  }

  return data || []
}

export async function createRecentEventsFunction() {
  const supabase = await createClient()

  const { error } = await supabase.rpc("exec", {
    sql: `
      CREATE OR REPLACE FUNCTION get_recent_events(limit_count INT DEFAULT 20, offset_count INT DEFAULT 0)
      RETURNS TABLE (
        id UUID,
        event_type TEXT,
        event_name TEXT,
        event_data JSONB,
        page_path TEXT,
        user_id UUID,
        created_at TIMESTAMPTZ
      )
      LANGUAGE SQL
      AS $$
        (
          SELECT 
            id,
            'event' as event_type,
            event_name,
            event_data,
            page_path,
            user_id,
            created_at
          FROM events
        )
        UNION ALL
        (
          SELECT 
            id,
            'page_view' as event_type,
            '페이지 조회' as event_name,
            jsonb_build_object('page_path', page_path) as event_data,
            page_path,
            user_id,
            created_at
          FROM page_views
        )
        ORDER BY created_at DESC
        LIMIT limit_count
        OFFSET offset_count;
      $$;
    `,
  })

  return { error }
}
