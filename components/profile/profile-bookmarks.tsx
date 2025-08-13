"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Building, DollarSign, Bookmark, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { JobBookmark } from "@/types/profile"

interface ProfileBookmarksProps {
  userId: string
}

export default function ProfileBookmarks({ userId }: ProfileBookmarksProps) {
  const [bookmarks, setBookmarks] = useState<JobBookmark[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch user bookmarks from Supabase
    // This is a placeholder - implement actual data fetching
    setBookmarks([])
    setLoading(false)
  }, [userId])

  const removeBookmark = async (bookmarkId: string) => {
    // TODO: Implement bookmark removal
    setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
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

  if (bookmarks.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="text-gray-400">
              <Bookmark className="h-12 w-12 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">북마크한 공고가 없습니다</h3>
            <p className="text-gray-600">관심 있는 채용 공고를 북마크해보세요</p>
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
        <h2 className="text-xl font-semibold">관심 공고</h2>
        <span className="text-sm text-gray-600">총 {bookmarks.length}개</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookmarks.map((bookmark) => (
          <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-3">
                  {bookmark.job_posting?.company_logo && (
                    <Image
                      src={bookmark.job_posting.company_logo || "/placeholder.svg"}
                      alt={`${bookmark.job_posting.company} 로고`}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  )}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{bookmark.job_posting?.title}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="h-4 w-4 mr-1" />
                      {bookmark.job_posting?.company}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBookmark(bookmark.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {bookmark.job_posting?.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {bookmark.job_posting?.salary}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  북마크: {new Date(bookmark.created_at).toLocaleDateString()}
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/jobs/${bookmark.job_id}`}>공고 보기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
