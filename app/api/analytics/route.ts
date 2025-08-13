import { type NextRequest, NextResponse } from "next/server"
import {
  getPageViews,
  getSearchEvents,
  getJobViewEvents,
  getFilterEvents,
  getTopSearchQueries,
  getTopCategories,
  getTotalUsers,
  getRecentEvents, // 새로운 함수 추가
} from "@/lib/supabase/database"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get("period") || "7d"
    const limit = Number.parseInt(searchParams.get("limit") || "10") // 기본 limit을 50에서 10으로 변경
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // 기간에 따른 날짜 계산
    const now = new Date()
    const daysAgo = period === "1d" ? 1 : period === "7d" ? 7 : period === "30d" ? 30 : 90
    const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)

    const previousStartDate = new Date(startDate.getTime() - daysAgo * 24 * 60 * 60 * 1000)
    const previousEndDate = startDate

    const [
      totalUsers,
      pageViews,
      searchEvents,
      jobViewEvents,
      filterEvents,
      topSearches,
      topCategories,
      previousPageViews,
      previousSearchEvents,
      previousJobViewEvents,
      recentEventsData, // 새로운 함수로 실시간 이벤트 조회
    ] = await Promise.all([
      getTotalUsers(),
      getPageViews(startDate),
      getSearchEvents(startDate),
      getJobViewEvents(startDate),
      getFilterEvents(startDate),
      getTopSearchQueries(startDate),
      getTopCategories(startDate),
      getPageViews(previousStartDate, previousEndDate),
      getSearchEvents(previousStartDate, previousEndDate),
      getJobViewEvents(previousStartDate, previousEndDate),
      getRecentEvents(limit, offset), // 새로운 함수 사용
    ])

    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0
      return ((current - previous) / previous) * 100
    }

    const currentUsers = new Set(
      [
        ...pageViews.map((e) => e.user_id),
        ...searchEvents.map((e) => e.user_id),
        ...jobViewEvents.map((e) => e.user_id),
      ].filter(Boolean),
    ).size

    const previousUsers = new Set(
      [
        ...previousPageViews.map((e) => e.user_id),
        ...previousSearchEvents.map((e) => e.user_id),
        ...previousJobViewEvents.map((e) => e.user_id),
      ].filter(Boolean),
    ).size

    const recentEvents = recentEventsData.map((event) => {
      if (event.event_type === "page_view") {
        return {
          event: "Page View",
          properties: { page: event.page_path },
          timestamp: event.created_at,
        }
      } else {
        let eventData = {}
        try {
          if (typeof event.event_data === "string") {
            eventData = JSON.parse(event.event_data)
          } else if (event.event_data && typeof event.event_data === "object") {
            eventData = event.event_data
          }
        } catch (error) {
          eventData = {}
        }

        if (event.event_name === "Search") {
          return {
            event: "Search",
            properties: {
              query: eventData?.query || eventData?.search_query,
              results_count: eventData?.results_count,
            },
            timestamp: event.created_at,
          }
        } else if (event.event_name === "Job Viewed") {
          return {
            event: "Job Viewed",
            properties: {
              job_id: eventData?.job_id,
            },
            timestamp: event.created_at,
          }
        } else if (event.event_name === "Filter Applied") {
          return {
            event: "Filter Applied",
            properties: {
              categories: eventData?.categories || eventData?.filters?.categories || [],
              filters: eventData?.filters || eventData,
            },
            timestamp: event.created_at,
          }
        } else {
          return {
            event: event.event_name,
            properties: eventData || {},
            timestamp: event.created_at,
          }
        }
      }
    })

    const processedTopCategories = topCategories.map((item) => {
      const category = item.category || item.name || "Unknown"
      const views = item.count || item.views || 0
      return {
        category,
        views,
        percentage: Math.round((views / Math.max(...topCategories.map((c) => c.count || c.views || 1), 1)) * 100),
      }
    })

    const analyticsData = {
      overview: {
        totalUsers: totalUsers,
        totalPageViews: pageViews.length,
        totalSearches: searchEvents.length,
        totalJobViews: jobViewEvents.length,
        totalBookmarks: 0,
        totalApplications: 0,
      },
      comparison: {
        usersChange: calculateChange(currentUsers, previousUsers),
        pageViewsChange: calculateChange(pageViews.length, previousPageViews.length),
        searchesChange: calculateChange(searchEvents.length, previousSearchEvents.length),
        jobViewsChange: calculateChange(jobViewEvents.length, previousJobViewEvents.length),
      },
      recentEvents,
      topSearches: topSearches.map((item) => ({
        query: item.query || "검색어 없음", // fallback 값 추가
        count: item.count,
      })),
      topCategories: processedTopCategories,
      hasMore: recentEventsData.length === limit, // 더 많은 데이터가 있는지 표시
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 })
  }
}
