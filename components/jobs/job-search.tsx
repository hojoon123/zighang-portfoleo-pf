"use client"

import type React from "react"
import { useRef } from "react"
import { useAtomValue } from "jotai"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchQueryAtom } from "@/lib/jotai"

interface JobSearchProps {
  onSearch: (query: string) => void
}

export function JobSearch({ onSearch }: JobSearchProps) {
  const searchRef = useRef<HTMLInputElement>(null)
  const currentQuery = useAtomValue(searchQueryAtom)

  const handleSearch = () => {
    if (searchRef.current) {
      onSearch(searchRef.current.value)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex gap-2 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          ref={searchRef}
          placeholder="검색어를 입력하세요 (직책, 회사명, 기술스택 등)"
          className="pl-10 h-12"
          onKeyPress={handleKeyPress}
          defaultValue={currentQuery}
        />
      </div>
      <Button onClick={handleSearch} className="h-12 px-6">
        검색
      </Button>
    </div>
  )
}
