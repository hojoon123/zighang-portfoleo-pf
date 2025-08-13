import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { featuredJobs } from "@/data/landing"
import { MapPin } from "lucide-react"

export function FeaturedJobs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">추천 채용공고</h2>
          <p className="text-lg text-gray-600">엄선된 우수 기업의 채용 정보를 놓치지 마세요</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredJobs.map((job, index) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 flex-shrink-0">
                      <Image
                        src={job.companyLogo || "/placeholder.svg"}
                        alt={`${job.company} 로고`}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                        loading={index < 3 ? "eager" : "lazy"}
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    지원
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {job.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-semibold">{job.salary}</span>
                    <span className="text-gray-500">{job.postedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            모든 채용공고 보기
          </Button>
        </div>
      </div>
    </section>
  )
}
