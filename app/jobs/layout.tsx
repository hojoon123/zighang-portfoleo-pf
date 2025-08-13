import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "채용정보",
  description: "다양한 분야의 최신 채용공고를 확인하고 맞춤형 필터로 원하는 직장을 찾아보세요.",
  openGraph: {
    title: "채용정보 | 직행",
    description: "다양한 분야의 최신 채용공고를 확인하고 맞춤형 필터로 원하는 직장을 찾아보세요.",
  },
}

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
