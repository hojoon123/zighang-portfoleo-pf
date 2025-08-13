"use client"

import { useState, useCallback, useEffect } from "react"
import { useAtom } from "jotai"
import { JobFilters } from "@/components/jobs/job-filters"
import { JobCard } from "@/components/jobs/job-card"
import { JobSearch } from "@/components/jobs/job-search"
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { analytics } from "@/lib/analytics"
import { searchQueryAtom, searchFiltersAtom, jobPostingsAtom, isLoadingAtom } from "@/lib/jotai"
import type { JobPosting } from "@/types/jobs"

const JOBS_PER_PAGE = 10

interface JobsPageClientProps {
  initialData: {
    jobs: JobPosting[]
    totalCount: number
    initialFilters: {
      categories: string[]
      experiences: string[]
      locations: string[]
      employmentTypes: string[]
      search: string
    }
    error: string | null
  }
}

export function JobsPageClient({ initialData }: JobsPageClientProps) {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [filters, setFilters] = useAtom(searchFiltersAtom)
  const [jobPostings, setJobPostings] = useAtom(jobPostingsAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(initialData.totalCount)
  const [allLoadedJobs, setAllLoadedJobs] = useState<JobPosting[]>(initialData.jobs)
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasTrackedPageView, setHasTrackedPageView] = useState(false)

  useEffect(() => {
    if (!isInitialized) {
      setJobPostings(initialData.jobs)
      setAllLoadedJobs(initialData.jobs)
      setTotalCount(initialData.totalCount)

      // 초기 필터 설정
      if (initialData.initialFilters.search) {
        setSearchQuery(initialData.initialFilters.search)
      }
      if (
        initialData.initialFilters.categories.length > 0 ||
        initialData.initialFilters.experiences.length > 0 ||
        initialData.initialFilters.locations.length > 0 ||
        initialData.initialFilters.employmentTypes.length > 0
      ) {
        setFilters(initialData.initialFilters)
      }

      setIsInitialized(true)

      if (!hasTrackedPageView) {
        analytics.trackPageView("Jobs Page")
        setHasTrackedPageView(true)
      }
    }
  }, [isInitialized, initialData, setJobPostings, setSearchQuery, setFilters, hasTrackedPageView])

  const fetchJobs = useCallback(
    async (page: number, resetData = false) => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: JOBS_PER_PAGE.toString(),
          ...(searchQuery && { search: searchQuery }),
        })

        // 배열 형태로 필터 추가
        filters.categories?.forEach((category) => {
          if (category) params.append("category", category)
        })
        filters.experiences?.forEach((experience) => {
          if (experience) params.append("experience", experience)
        })
        filters.locations?.forEach((location) => {
          if (location) params.append("location", location)
        })
        filters.employmentTypes?.forEach((employmentType) => {
          if (employmentType) params.append("employmentType", employmentType)
        })

        const response = await fetch(`/api/jobs?${params}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        const { data, count } = result

        if (resetData) {
          setAllLoadedJobs(data)
          setJobPostings(data)
          analytics.trackJobSearch({
            query: searchQuery,
            filters: filters,
            resultsCount: count,
            page: 1,
          })
        } else {
          setAllLoadedJobs((prevJobs) => {
            const newJobs = [...prevJobs, ...data]
            setJobPostings(newJobs)
            return newJobs
          })
          analytics.trackInfiniteScroll({
            page,
            totalLoaded: allLoadedJobs.length + data.length,
            totalAvailable: count,
          })
        }

        setTotalCount(count)
      } catch (error) {
        analytics.trackError("job_fetch_error", {
          error: error instanceof Error ? error.message : "Unknown error",
          page,
          filters,
          searchQuery,
        })
      } finally {
        setIsLoading(false)
      }
    },
    [filters, searchQuery, setJobPostings, setIsLoading, allLoadedJobs.length],
  )

  useEffect(() => {
    if (isInitialized) {
      setCurrentPage(1)
      fetchJobs(1, true)
    }
  }, [searchQuery, filters, isInitialized, fetchJobs])

  const hasNextPage = allLoadedJobs.length < totalCount
  const displayedJobs = allLoadedJobs

  const fetchNextPage = useCallback(() => {
    if (hasNextPage && !isLoading) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      fetchJobs(nextPage, false)
    }
  }, [hasNextPage, isLoading, currentPage, fetchJobs])

  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage: isLoading,
    fetchNextPage,
  })

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query)
      if (query.trim()) {
        analytics.trackSearch(query, filters)
      }
    },
    [setSearchQuery, filters],
  )

  const handleFiltersChange = useCallback(
    (newFilters: any) => {
      setFilters(newFilters)
      const hasActiveFilters =
        (newFilters.categories && newFilters.categories.length > 0) ||
        (newFilters.experiences && newFilters.experiences.length > 0) ||
        (newFilters.locations && newFilters.locations.length > 0) ||
        (newFilters.employmentTypes && newFilters.employmentTypes.length > 0)

      if (hasActiveFilters) {
        analytics.trackFilterApply(newFilters)
      }
    },
    [setFilters],
  )

  if (initialData.error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">데이터를 불러오는 중 오류가 발생했습니다.</p>
          <p className="text-gray-400 mt-2">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">채용 공고</h1>
          <p className="text-gray-600 mb-6">원하는 직무를 찾아보세요.</p>

          <JobSearch onSearch={handleSearchChange} />

          <div className="text-sm text-gray-600">
            총 <span className="font-semibold text-blue-600">{totalCount}</span>개의 채용 공고 중{" "}
            <span className="font-semibold text-blue-600">{displayedJobs.length}</span>개 표시
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-20">
              <JobFilters onFiltersChange={handleFiltersChange} currentFilters={filters} />
            </div>
          </div>

          {/* Job List */}
          <div className="flex-1">
            <div className="space-y-4">
              {isLoading && displayedJobs.length === 0 && (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                          <div className="flex gap-2">
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                            <div className="h-6 bg-gray-200 rounded w-18"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {displayedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}

              {!isLoading && displayedJobs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
                  <p className="text-gray-400 mt-2">다른 검색어나 필터를 시도해보세요.</p>
                </div>
              )}

              {hasNextPage && <div ref={loadMoreRef} className="h-20" />}

              {/* 모든 데이터 로드 완료 메시지 */}
              {!hasNextPage && displayedJobs.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">모든 채용공고를 확인했습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
