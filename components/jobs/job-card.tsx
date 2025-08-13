"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Eye } from "lucide-react"
import { analytics } from "@/lib/analytics"
import type { JobPosting } from "@/types/jobs"

interface JobCardProps {
  job: JobPosting
}

export function JobCard({ job }: JobCardProps) {
  const [hasTracked, setHasTracked] = useState(false) // 중복 클릭 방지를 위한 상태 추가

  const getCompanyInitial = (company: string) => {
    return company.charAt(0).toUpperCase()
  }

  const getCompanyColor = (company: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ]
    const index = company.length % colors.length
    return colors[index]
  }

  const handleJobClick = () => {
    if (!hasTracked) {
      console.log("👁️ [DEBUG] JobCard clicked:", job.title, job.company) // 디버깅 로그 추가
      analytics.trackJobView(job.id, job.title, job.company)
      setHasTracked(true)

      // 5초 후 다시 클릭 가능하도록 리셋 (같은 카드를 다시 클릭할 경우를 위해)
      setTimeout(() => {
        setHasTracked(false)
      }, 5000)
    } else {
      console.log("⚠️ [DEBUG] JobCard click ignored (already tracked):", job.title)
    }
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={handleJobClick}>
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div
          className={`w-12 h-12 rounded-lg ${getCompanyColor(job.company)} flex items-center justify-center text-white font-bold text-lg`}
        >
          {getCompanyInitial(job.company)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              {job.is_new && (
                <Badge variant="secondary" className="mb-1 bg-green-100 text-green-800">
                  신규
                </Badge>
              )}
              <div>{new Date(job.posted_at).toLocaleDateString("ko-KR", { month: "long", day: "numeric" })}</div>
            </div>
          </div>

          {/* Job Details */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div>{job.experience}</div>
            <div className="font-medium text-blue-600">{job.salary}</div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {job.views.toLocaleString()}명 조회
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {job.company_size}
              </div>
            </div>
            {job.is_urgent && (
              <Badge variant="destructive" className="text-xs">
                급구
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
