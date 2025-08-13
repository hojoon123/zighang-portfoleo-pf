"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Building, DollarSign } from "lucide-react"
import Link from "next/link"
import type { JobApplication } from "@/types/profile"

interface ProfileApplicationsProps {
  userId: string
}

export default function ProfileApplications({ userId }: ProfileApplicationsProps) {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch user applications from Supabase
    // This is a placeholder - implement actual data fetching
    setApplications([])
    setLoading(false)
  }, [userId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800"
      case "reviewing":
        return "bg-yellow-100 text-yellow-800"
      case "interview":
        return "bg-purple-100 text-purple-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "applied":
        return "지원 완료"
      case "reviewing":
        return "검토 중"
      case "interview":
        return "면접 예정"
      case "accepted":
        return "합격"
      case "rejected":
        return "불합격"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="text-gray-400">
              <Building className="h-12 w-12 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">아직 지원한 공고가 없습니다</h3>
            <p className="text-gray-600">관심 있는 채용 공고에 지원해보세요</p>
            <Button asChild>
              <Link href="/jobs">채용 공고 보기</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">지원 현황</h2>
        <span className="text-sm text-gray-600">총 {applications.length}개</span>
      </div>

      {applications.map((application) => (
        <Card key={application.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{application.job_posting?.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {application.job_posting?.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {application.job_posting?.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {application.job_posting?.salary}
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(application.status)}>{getStatusText(application.status)}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                지원일: {new Date(application.applied_at).toLocaleDateString()}
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/jobs/${application.job_id}`}>공고 보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
