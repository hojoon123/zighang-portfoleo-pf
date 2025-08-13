"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSetAtom } from "jotai"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { searchQueryAtom, searchFiltersAtom } from "@/lib/jotai"

interface JobCategory {
  id: string
  name: string
  icon: string
  color: string
  display_order: number
  is_active: boolean
}

export function JobCategories() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState<JobCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const setGlobalSearchQuery = useSetAtom(searchQueryAtom)
  const setGlobalFilters = useSetAtom(searchFiltersAtom)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const result = await response.json()

        if (!response.ok) {
          console.error("Failed to fetch categories:", result.error)
          return
        }

        setCategories(result.data || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setGlobalSearchQuery(searchQuery.trim())
      setGlobalFilters({
        categories: [],
        experiences: [],
        locations: [],
        employmentTypes: [],
      })
      router.push("/jobs")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleCategoryClick = (categoryName: string) => {
    setGlobalSearchQuery("")
    setGlobalFilters({
      categories: [categoryName],
      experiences: [],
      locations: [],
      employmentTypes: [],
    })
    router.push("/jobs")
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">직종별 채용정보</h2>
          <p className="text-lg text-gray-600 mb-8">관심있는 직종을 선택하고 맞춤 채용정보를 확인해보세요</p>

          <div className="max-w-2xl mx-auto relative">
            <Input
              type="text"
              placeholder="직무, 회사명, 키스워드를 검색해보세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-12 pr-4 py-3 text-lg border-2 border-gray-300 focus:border-blue-500 rounded-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-start">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="p-4 rounded-lg border border-gray-200 animate-pulse h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0"></div>
                  <div className="h-4 bg-gray-200 rounded flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-start">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group cursor-pointer h-16 w-full"
                style={{ backgroundColor: `${category.color}10` }}
              >
                <div className="flex items-center space-x-3 h-full">
                  <span className="text-xl flex-shrink-0 leading-none">{category.icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-left leading-tight truncate">
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">카테고리를 불러올 수 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  )
}
