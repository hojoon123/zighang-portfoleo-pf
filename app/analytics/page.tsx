import { Suspense } from "react"
import Header from "@/components/landing/header"
import Footer from "@/components/landing/footer"
import { AnalyticsPageClient } from "@/components/analytics/analytics-page-client"
import { getAnalyticsOverview, getRecentEvents, getTopSearchQueries, getTopCategories } from "@/lib/supabase/database"

export default async function AnalyticsPage() {
  const initialData = await getInitialAnalyticsData()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <Suspense fallback={<AnalyticsPageSkeleton />}>
          <AnalyticsPageClient initialData={initialData} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

async function getInitialAnalyticsData() {
  try {
    const [overview, recentEvents, topSearches, topCategories] = await Promise.all([
      getAnalyticsOverview("7d"),
      getRecentEvents(10, 0),
      getTopSearchQueries("7d"),
      getTopCategories("7d"),
    ])

    return {
      overview: overview || {
        totalUsers: 0,
        totalPageViews: 0,
        totalSearches: 0,
        totalJobViews: 0,
        totalBookmarks: 0,
        totalApplications: 0,
      },
      recentEvents: recentEvents || [],
      topSearches: topSearches || [],
      topCategories: topCategories || [],
      comparison: {
        usersChange: 0,
        pageViewsChange: 0,
        searchesChange: 0,
        jobViewsChange: 0,
      },
      hasMore: (recentEvents?.length || 0) >= 10,
      error: null,
    }
  } catch (error) {
    console.error("Error fetching initial analytics data:", error)
    return {
      overview: {
        totalUsers: 0,
        totalPageViews: 0,
        totalSearches: 0,
        totalJobViews: 0,
        totalBookmarks: 0,
        totalApplications: 0,
      },
      recentEvents: [],
      topSearches: [],
      topCategories: [],
      comparison: {
        usersChange: 0,
        pageViewsChange: 0,
        searchesChange: 0,
        jobViewsChange: 0,
      },
      hasMore: false,
      error: "Failed to load analytics data",
    }
  }
}

function AnalyticsPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* 탭 스켈레톤 */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded w-16 animate-pulse"></div>
          ))}
        </div>
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>

      {/* 카드 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>

      {/* 차트 스켈레톤 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 실시간 이벤트 스켈레톤 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-48 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
