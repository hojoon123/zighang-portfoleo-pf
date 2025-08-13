"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, Search, Eye, Bookmark, MousePointer, TrendingUp, Calendar, Filter, Activity } from "lucide-react"
import { analytics } from "@/lib/analytics"

const getAnalyticsData = async (limit = 10, offset = 0) => {
  try {
    const response = await fetch(`/api/analytics?limit=${limit}&offset=${offset}`)
    if (!response.ok) {
      throw new Error("Failed to fetch analytics data")
    }
    return await response.json()
  } catch (error) {
    console.error("Analytics data fetch error:", error)
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
    }
  }
}

interface AnalyticsPageClientProps {
  initialData: {
    overview: {
      totalUsers: number
      totalPageViews: number
      totalSearches: number
      totalJobViews: number
      totalBookmarks: number
      totalApplications: number
    }
    recentEvents: any[]
    topSearches: any[]
    topCategories: any[]
    comparison: {
      usersChange: number
      pageViewsChange: number
      searchesChange: number
      jobViewsChange: number
    }
    hasMore: boolean
    error: string | null
  }
}

export function AnalyticsPageClient({ initialData }: AnalyticsPageClientProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [analyticsData, setAnalyticsData] = useState(initialData)
  const [isLive, setIsLive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [allEvents, setAllEvents] = useState(initialData.recentEvents)
  const [hasMore, setHasMore] = useState(initialData.hasMore)
  const [hasTrackedPageView, setHasTrackedPageView] = useState(false)
  const observerRef = useRef(null)

  const getComparisonText = (period: string) => {
    switch (period) {
      case "1d":
        return "전일 대비"
      case "7d":
        return "지난 주 대비"
      case "30d":
        return "전월 대비"
      case "90d":
        return "3개월 전 대비"
      default:
        return "이전 기간 대비"
    }
  }

  const fetchAnalyticsData = async (reset = false) => {
    if (reset) {
      setIsLoading(true)
    } else {
      setIsLoadingMore(true)
    }

    const offset = reset ? 0 : allEvents.length
    const data = await getAnalyticsData(10, offset)

    if (reset) {
      setAnalyticsData(data)
      setAllEvents(data.recentEvents)
      setIsLoading(false)
    } else {
      setAllEvents((prev) => [...prev, ...data.recentEvents])
      setIsLoadingMore(false)
    }

    setHasMore(data.hasMore)
  }

  const lastEventElementRef = useCallback(
    (node) => {
      if (isLoadingMore) return
      if (observerRef.current) observerRef.current.disconnect()
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchAnalyticsData(false)
        }
      })
      if (node) observerRef.current.observe(node)
    },
    [isLoadingMore, hasMore],
  )

  useEffect(() => {
    if (!hasTrackedPageView) {
      analytics.trackPageView("Analytics Dashboard")
      setHasTrackedPageView(true)
    }

    const interval = setInterval(() => {
      if (isLive) {
        fetchAnalyticsData(true)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isLive, hasTrackedPageView])

  useEffect(() => {
    fetchAnalyticsData(true)
  }, [selectedPeriod])

  if (initialData.error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">분석 데이터를 불러오는 중 오류가 발생했습니다.</p>
          <p className="text-gray-400 mt-2">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">분석 대시보드</h1>
            <p className="text-gray-600 mt-2">사용자 행동과 사이트 성과를 실시간으로 모니터링하세요</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500" : "bg-gray-400"}`}></div>
            <span className="text-sm text-gray-600">{isLive ? "실시간" : "일시정지"}</span>
            <Button variant="outline" size="sm" onClick={() => setIsLive(!isLive)}>
              <Activity className="h-4 w-4 mr-2" />
              {isLive ? "일시정지" : "재시작"}
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="1d">1일</TabsTrigger>
            <TabsTrigger value="7d">7일</TabsTrigger>
            <TabsTrigger value="30d">30일</TabsTrigger>
            <TabsTrigger value="90d">90일</TabsTrigger>
          </TabsList>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            사용자 정의 기간
          </Button>
        </div>

        <TabsContent value={selectedPeriod} className="space-y-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">🎯 Mixpanel 이벤트 트래킹 활성화됨</CardTitle>
              <CardDescription className="text-blue-600">
                사용자의 모든 행동이 실시간으로 추적되고 있습니다. 검색, 필터 변경, 채용공고 조회 등의 이벤트를 확인할
                수 있습니다.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* 개요 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 사용자</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(analyticsData.overview.totalUsers || 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={(analyticsData.comparison.usersChange || 0) >= 0 ? "text-green-600" : "text-red-600"}
                  >
                    {(analyticsData.comparison.usersChange || 0) >= 0 ? "+" : ""}
                    {(analyticsData.comparison.usersChange || 0).toFixed(1)}%
                  </span>{" "}
                  {getComparisonText(selectedPeriod)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">페이지 뷰</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(analyticsData.overview.totalPageViews || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={(analyticsData.comparison.pageViewsChange || 0) >= 0 ? "text-green-600" : "text-red-600"}
                  >
                    {(analyticsData.comparison.pageViewsChange || 0) >= 0 ? "+" : ""}
                    {(analyticsData.comparison.pageViewsChange || 0).toFixed(1)}%
                  </span>{" "}
                  {getComparisonText(selectedPeriod)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">검색 횟수</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(analyticsData.overview.totalSearches || 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={(analyticsData.comparison.searchesChange || 0) >= 0 ? "text-green-600" : "text-red-600"}
                  >
                    {(analyticsData.comparison.searchesChange || 0) >= 0 ? "+" : ""}
                    {(analyticsData.comparison.searchesChange || 0).toFixed(1)}%
                  </span>{" "}
                  {getComparisonText(selectedPeriod)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">공고 조회</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(analyticsData.overview.totalJobViews || 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={(analyticsData.comparison.jobViewsChange || 0) >= 0 ? "text-green-600" : "text-red-600"}
                  >
                    {(analyticsData.comparison.jobViewsChange || 0) >= 0 ? "+" : ""}
                    {(analyticsData.comparison.jobViewsChange || 0).toFixed(1)}%
                  </span>{" "}
                  {getComparisonText(selectedPeriod)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">북마크</CardTitle>
                <Bookmark className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(analyticsData.overview.totalBookmarks || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+22.1%</span> {getComparisonText(selectedPeriod)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">지원 횟수</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(analyticsData.overview.totalApplications || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+18.9%</span> {getComparisonText(selectedPeriod)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 상세 분석 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 인기 검색어 */}
            <Card>
              <CardHeader>
                <CardTitle>인기 검색어</CardTitle>
                <CardDescription>가장 많이 검색된 키워드</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topSearches.map((search, index) => (
                    <div
                      key={`search-${index}-${search.query || "empty"}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{index + 1}</Badge>
                        <span className="font-medium">{search.query || "검색어 없음"}</span>
                      </div>
                      <span className="text-sm text-gray-600">{(search.count || 0).toLocaleString()}회</span>
                    </div>
                  ))}
                  {analyticsData.topSearches.length === 0 && (
                    <div className="text-center py-4 text-gray-500">아직 검색 데이터가 없습니다.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 카테고리별 조회수 */}
            <Card>
              <CardHeader>
                <CardTitle>카테고리별 조회수</CardTitle>
                <CardDescription>직종별 관심도 분석</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topCategories.map((category, index) => (
                    <div key={`category-${index}-${category.category}`} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.category}</span>
                        <span className="text-sm text-gray-600">{(category.views || 0).toLocaleString()}회</span>
                      </div>
                      <Progress value={category.percentage || 0} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 실시간 이벤트 - 무한 스크롤 적용 */}
          <Card>
            <CardHeader>
              <CardTitle>실시간 이벤트</CardTitle>
              <CardDescription>최근 사용자 활동 로그 (10개씩 무한 스크롤)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allEvents.map((event, index) => (
                  <div
                    key={`${event.timestamp}-${index}`}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                    ref={index === allEvents.length - 1 ? lastEventElementRef : null}
                  >
                    <div className="flex-shrink-0">
                      {event.event === "Job Viewed" && <Eye className="h-5 w-5 text-blue-500" />}
                      {event.event === "Search" && <Search className="h-5 w-5 text-green-500" />}
                      {event.event === "Job Bookmarked" && <Bookmark className="h-5 w-5 text-yellow-500" />}
                      {event.event === "Filter Applied" && <Filter className="h-5 w-5 text-purple-500" />}
                      {event.event === "Page View" && <MousePointer className="h-5 w-5 text-gray-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {event.event === "Job Viewed" && "채용공고 조회"}
                        {event.event === "Search" && "검색"}
                        {event.event === "Job Bookmarked" && "북마크 추가"}
                        {event.event === "Filter Applied" && "필터 적용"}
                        {event.event === "Page View" && "페이지 조회"}
                        {!["Job Viewed", "Search", "Job Bookmarked", "Filter Applied", "Page View"].includes(
                          event.event,
                        ) && event.event}
                      </p>
                      <p className="text-sm text-gray-600">
                        {event.event === "Filter Applied" && event.properties.filters && (
                          <span className="mr-2">
                            {event.properties.filters.categories && event.properties.filters.categories.length > 0 && (
                              <span>카테고리: {event.properties.filters.categories.join(", ")} </span>
                            )}
                            {event.properties.filters.experiences &&
                              event.properties.filters.experiences.length > 0 && (
                                <span>경력: {event.properties.filters.experiences.join(", ")} </span>
                              )}
                            {event.properties.filters.locations && event.properties.filters.locations.length > 0 && (
                              <span>지역: {event.properties.filters.locations.join(", ")} </span>
                            )}
                            {event.properties.filters.employmentTypes &&
                              event.properties.filters.employmentTypes.length > 0 && (
                                <span>고용형태: {event.properties.filters.employmentTypes.join(", ")} </span>
                              )}
                          </span>
                        )}
                        {event.event === "Search" && event.properties.query && (
                          <span className="mr-2">검색어: {event.properties.query}</span>
                        )}
                        {event.event === "Job Viewed" && event.properties.job_title && (
                          <span className="mr-2">공고: {event.properties.job_title}</span>
                        )}
                        {event.event === "Page View" && event.properties.page && (
                          <span className="mr-2">페이지: {event.properties.page}</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                {!hasMore && allEvents.length > 0 && (
                  <div className="text-center py-4 text-gray-500">모든 이벤트를 불러왔습니다.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
