import { Suspense } from "react"
import Header from "@/components/landing/header"
import Footer from "@/components/landing/footer"
import { JobsPageClient } from "@/components/jobs/jobs-page-client"
import { getJobPostings } from "@/lib/supabase/database"

interface JobsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const initialData = await getInitialJobsData(searchParams)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Suspense fallback={<JobsPageSkeleton />}>
        <JobsPageClient initialData={initialData} />
      </Suspense>

      <Footer />
    </div>
  )
}

async function getInitialJobsData(searchParams: { [key: string]: string | string[] | undefined }) {
  try {
    const page = 1
    const limit = 10

    // URL 파라미터에서 필터 정보 추출
    const search = typeof searchParams.search === "string" ? searchParams.search : ""
    const categories = Array.isArray(searchParams.category)
      ? searchParams.category
      : typeof searchParams.category === "string"
        ? [searchParams.category]
        : []
    const experiences = Array.isArray(searchParams.experience)
      ? searchParams.experience
      : typeof searchParams.experience === "string"
        ? [searchParams.experience]
        : []
    const locations = Array.isArray(searchParams.location)
      ? searchParams.location
      : typeof searchParams.location === "string"
        ? [searchParams.location]
        : []
    const employmentTypes = Array.isArray(searchParams.employmentType)
      ? searchParams.employmentType
      : typeof searchParams.employmentType === "string"
        ? [searchParams.employmentType]
        : []

    const filters = {
      categories,
      experiences,
      locations,
      employmentTypes,
      search,
    }

    const { data, error, count } = await getJobPostings(page, limit, filters)

    if (error) {
      console.error("Failed to fetch initial jobs data:", error)
      return {
        jobs: [],
        totalCount: 0,
        initialFilters: filters,
        error: "Failed to load jobs",
      }
    }

    return {
      jobs: data || [],
      totalCount: count || 0,
      initialFilters: filters,
      error: null,
    }
  } catch (error) {
    console.error("Error in getInitialJobsData:", error)
    return {
      jobs: [],
      totalCount: 0,
      initialFilters: {
        categories: [],
        experiences: [],
        locations: [],
        employmentTypes: [],
        search: "",
      },
      error: "Failed to load jobs",
    }
  }
}

function JobsPageSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mb-6 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
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
          </div>
        </div>
      </div>
    </>
  )
}
