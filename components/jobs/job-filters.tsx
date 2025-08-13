"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { filterOptions } from "@/data/jobs"
import { analytics } from "@/lib/analytics"

interface JobFiltersProps {
  onFiltersChange: (filters: any) => void
  currentFilters?: {
    categories: string[]
    experiences: string[]
    employmentTypes: string[]
    locations: string[]
  }
}

export function JobFilters({ onFiltersChange, currentFilters }: JobFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    experience: false,
    employmentType: false,
    location: false,
  })

  const [selectedFilters, setSelectedFilters] = useState({
    categories: currentFilters?.categories || [],
    experiences: currentFilters?.experiences || [],
    employmentTypes: currentFilters?.employmentTypes || [],
    locations: currentFilters?.locations || [],
  })
  const filtersRef = useRef(selectedFilters)

  useEffect(() => {
    if (currentFilters) {
      const newFilters = {
        categories: currentFilters.categories || [],
        experiences: currentFilters.experiences || [],
        employmentTypes: currentFilters.employmentTypes || [],
        locations: currentFilters.locations || [],
      }
      setSelectedFilters(newFilters)
      filtersRef.current = newFilters
    }
  }, [currentFilters])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleFilterChange = (type: keyof typeof selectedFilters, value: string) => {
    const newFilters = {
      ...selectedFilters,
      [type]: selectedFilters[type].includes(value)
        ? selectedFilters[type].filter((item) => item !== value)
        : [...selectedFilters[type], value],
    }
    setSelectedFilters(newFilters)
    filtersRef.current = newFilters
  }

  const applyFilters = () => {
    onFiltersChange(filtersRef.current)
    analytics.trackFilterApply(filtersRef.current)
  }

  const resetFilters = () => {
    const emptyFilters = {
      categories: [],
      experiences: [],
      employmentTypes: [],
      locations: [],
    }
    setSelectedFilters(emptyFilters)
    filtersRef.current = emptyFilters
    onFiltersChange(emptyFilters)
    analytics.track("Filter Reset")
  }

  const sectionKeyMap = {
    categories: "category" as keyof typeof expandedSections,
    experiences: "experience" as keyof typeof expandedSections,
    employmentTypes: "employmentType" as keyof typeof expandedSections,
    locations: "location" as keyof typeof expandedSections,
  }

  const getGridCols = (type: keyof typeof selectedFilters) => {
    switch (type) {
      case "categories":
        return "grid-cols-2"
      case "experiences":
        return "grid-cols-2"
      case "employmentTypes":
        return "grid-cols-2"
      case "locations":
        return "grid-cols-3"
      default:
        return "grid-cols-2"
    }
  }

  const FilterSection = ({
    title,
    items,
    type,
    isExpanded,
  }: {
    title: string
    items: string[]
    type: keyof typeof selectedFilters
    isExpanded: boolean
  }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection(sectionKeyMap[type])}
        className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900 hover:text-gray-700"
      >
        {title}
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-2">
          <div className={`grid ${getGridCols(type)} gap-2`}>
            {items.map((item) => (
              <button
                key={item}
                onClick={() => handleFilterChange(type, item)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors text-center whitespace-nowrap ${
                  selectedFilters[type].includes(item)
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <Card className="p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">필터</h3>
        <div className="flex gap-2">
          <Button onClick={applyFilters} size="sm">
            적용
          </Button>
          <Button onClick={resetFilters} variant="outline" size="sm">
            초기화
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <FilterSection
          title="직무 카테고리"
          items={filterOptions.categories}
          type="categories"
          isExpanded={expandedSections.category}
        />

        <FilterSection
          title="경력"
          items={filterOptions.experiences}
          type="experiences"
          isExpanded={expandedSections.experience}
        />

        <FilterSection
          title="고용형태"
          items={filterOptions.employmentTypes}
          type="employmentTypes"
          isExpanded={expandedSections.employmentType}
        />

        <FilterSection
          title="지역"
          items={filterOptions.locations}
          type="locations"
          isExpanded={expandedSections.location}
        />
      </div>
    </Card>
  )
}
