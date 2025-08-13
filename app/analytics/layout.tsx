import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "분석 대시보드",
  description: "실시간 사용자 활동 분석과 채용정보 트렌드를 확인하세요.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "분석 대시보드 | 직행",
    description: "실시간 사용자 활동 분석과 채용정보 트렌드를 확인하세요.",
  },
}

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
