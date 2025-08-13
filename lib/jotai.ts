import { atom } from "jotai"
import type { JobPosting } from "@/types/jobs"
import type { UserProfile } from "@/types/profile"

// 사용자 정보 atom
export const userAtom = atom<{
  id: string
  email: string
  name?: string
} | null>(null)

// 사용자 프로필 atom
export const userProfileAtom = atom<UserProfile | null>(null)

// 검색 관련 atoms
export const searchQueryAtom = atom("")
export const searchFiltersAtom = atom({
  categories: [] as string[],
  experiences: [] as string[],
  employmentTypes: [] as string[],
  locations: [] as string[],
})

// 채용 공고 관련 atoms
export const jobPostingsAtom = atom<JobPosting[]>([])
export const selectedJobAtom = atom<JobPosting | null>(null)
export const bookmarkedJobsAtom = atom<string[]>([])

// UI 상태 atoms
export const isLoadingAtom = atom(false)
export const sidebarOpenAtom = atom(false)
export const themeAtom = atom<"light" | "dark">("light")

// 파생된 atoms
export const filteredJobsAtom = atom((get) => {
  const jobs = get(jobPostingsAtom)
  const query = get(searchQueryAtom)
  const filters = get(searchFiltersAtom)

  return jobs.filter((job) => {
    // 검색어 필터
    if (
      query &&
      !job.title.toLowerCase().includes(query.toLowerCase()) &&
      !job.company.toLowerCase().includes(query.toLowerCase())
    ) {
      return false
    }

    // 카테고리 필터
    if (filters.categories.length > 0 && !filters.categories.includes(job.category)) {
      return false
    }

    // 경력 필터
    if (filters.experiences.length > 0 && !filters.experiences.includes(job.experience)) {
      return false
    }

    // 고용형태 필터
    if (filters.employmentTypes.length > 0 && !filters.employmentTypes.includes(job.employmentType)) {
      return false
    }

    // 지역 필터
    if (filters.locations.length > 0 && !filters.locations.some((loc) => job.location.includes(loc))) {
      return false
    }

    return true
  })
})

export const bookmarkedJobsCountAtom = atom((get) => {
  return get(bookmarkedJobsAtom).length
})

// 기술 스택 데모용 atoms (기존 유지)
export const techStackAtom = atom([
  { name: "Next.js 15", category: "Framework", status: "active" },
  { name: "React 19", category: "Library", status: "active" },
  { name: "Jotai", category: "State Management", status: "active" },
  { name: "Tailwind CSS 4", category: "Styling", status: "active" },
  { name: "TypeScript", category: "Language", status: "active" },
  { name: "Supabase", category: "Database", status: "active" },
  { name: "Mixpanel", category: "Analytics", status: "active" },
])

export const activeTechCountAtom = atom((get) => {
  const techStack = get(techStackAtom)
  return techStack.filter((tech) => tech.status === "active").length
})
