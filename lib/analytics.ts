import mixpanel from "mixpanel-browser"

// Mixpanel 초기화
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

if (MIXPANEL_TOKEN && typeof window !== "undefined") {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: true,
    persistence: "localStorage",
  })
}

let lastFilterApply = ""
let lastFilterApplyTime = 0

const saveEventToDatabase = async (eventName: string, properties: Record<string, any>) => {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name: eventName,
        event_data: properties,
        page_path: window.location.pathname,
      }),
    })
  } catch (error) {
    console.error("Failed to save event to database:", error)
  }
}

const savePageViewToDatabase = async (pagePath: string, properties?: Record<string, any>) => {
  try {
    await fetch("/api/page-views", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page_path: pagePath,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        ...properties,
      }),
    })
  } catch (error) {
    console.error("Failed to save page view to database:", error)
  }
}

// 이벤트 트래킹 함수들
export const analytics = {
  // 페이지 뷰 트래킹
  trackPageView: (pageName: string, properties?: Record<string, any>) => {
    if (typeof window === "undefined") return

    // Mixpanel 트래킹
    if (MIXPANEL_TOKEN) {
      mixpanel.track("Page View", {
        page: pageName,
        timestamp: new Date().toISOString(),
        ...properties,
      })
    }

    savePageViewToDatabase(pageName, properties)
  },

  // 사용자 식별
  identify: (userId: string, properties?: Record<string, any>) => {
    if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

    mixpanel.identify(userId)
    if (properties) {
      mixpanel.people.set(properties)
    }
  },

  trackJobSearch: (params: {
    query: string
    filters: Record<string, any>
    resultsCount: number
    page: number
  }) => {
    if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

    mixpanel.track("Job Search", {
      search_query: params.query,
      filters: params.filters,
      results_count: params.resultsCount,
      page: params.page,
      timestamp: new Date().toISOString(),
    })
  },

  trackInfiniteScroll: (params: {
    page: number
    totalLoaded: number
    totalAvailable: number
  }) => {
    if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

    mixpanel.track("Infinite Scroll", {
      page: params.page,
      total_loaded: params.totalLoaded,
      total_available: params.totalAvailable,
      timestamp: new Date().toISOString(),
    })
  },

  trackFilterChange: (filters: Record<string, any>) => {
    if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

    mixpanel.track("Filter Changed", {
      filters,
      timestamp: new Date().toISOString(),
    })
  },

  trackError: (errorType: string, properties?: Record<string, any>) => {
    if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

    mixpanel.track("Error", {
      error_type: errorType,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  },

  // 검색 이벤트
  trackSearch: (query: string, filters?: Record<string, any>, resultsCount?: number) => {
    if (typeof window === "undefined") return

    const eventData = {
      query,
      filters,
      results_count: resultsCount,
      timestamp: new Date().toISOString(),
    }

    // Mixpanel 트래킹
    if (MIXPANEL_TOKEN) {
      mixpanel.track("Search", eventData)
    }

    saveEventToDatabase("Search", eventData)
  },

  trackFilterApply: (filters: Record<string, any>) => {
    if (typeof window === "undefined") return

    // 중복 방지: 같은 필터를 3초 내에 다시 적용하면 무시
    const filterKey = JSON.stringify(filters)
    const now = Date.now()
    if (lastFilterApply === filterKey && now - lastFilterApplyTime < 3000) {
      return
    }
    lastFilterApply = filterKey
    lastFilterApplyTime = now

    const eventData = {
      filters,
      timestamp: new Date().toISOString(),
    }

    // Mixpanel 트래킹
    if (MIXPANEL_TOKEN) {
      mixpanel.track("Filter Applied", eventData)
    }

    saveEventToDatabase("Filter Applied", eventData)
  },

  // 채용 공고 조회 이벤트
  trackJobView: (jobId: string, jobTitle: string, company: string) => {
    if (typeof window === "undefined") return

    const eventData = {
      job_id: jobId,
      job_title: jobTitle,
      company,
      timestamp: new Date().toISOString(),
    }

    // Mixpanel 트래킹
    if (MIXPANEL_TOKEN) {
      mixpanel.track("Job Viewed", eventData)
    }

    saveEventToDatabase("Job Viewed", eventData)
  },

  // 북마크 이벤트
  trackBookmark: (jobId: string, action: "add" | "remove") => {
    if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

    mixpanel.track("Job Bookmarked", {
      job_id: jobId,
      action,
      timestamp: new Date().toISOString(),
    })
  },

  // 지원 이벤트
  trackJobApplication: (jobId: string, jobTitle: string, company: string) => {
    if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

    mixpanel.track("Job Applied", {
      job_id: jobId,
      job_title: jobTitle,
      company,
      timestamp: new Date().toISOString(),
    })
  },

  // 로그인/회원가입 이벤트
  trackAuth: (action: "login" | "signup", method: "email" = "email") => {
    if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

    mixpanel.track("Auth", {
      action,
      method,
      timestamp: new Date().toISOString(),
    })
  },

  // 프로필 업데이트 이벤트
  trackProfileUpdate: (fields: string[]) => {
    if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

    mixpanel.track("Profile Updated", {
      updated_fields: fields,
      timestamp: new Date().toISOString(),
    })
  },

  // 카테고리 클릭 이벤트
  trackCategoryClick: (category: string, source: "landing" | "filter") => {
    if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

    mixpanel.track("Category Clicked", {
      category,
      source,
      timestamp: new Date().toISOString(),
    })
  },

  // 일반적인 이벤트 트래킹
  track: (eventName: string, properties?: Record<string, any>) => {
    if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

    mixpanel.track(eventName, {
      timestamp: new Date().toISOString(),
      ...properties,
    })
  },
}

// 사용자 속성 설정
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

  mixpanel.people.set(properties)
}

// 이벤트 트래킹 비활성화 (GDPR 등)
export const optOut = () => {
  if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

  mixpanel.opt_out_tracking()
}

// 이벤트 트래킹 활성화
export const optIn = () => {
  if (typeof window === "undefined" || !MIXPANEL_TOKEN) return

  mixpanel.opt_in_tracking()
}
