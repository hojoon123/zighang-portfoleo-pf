import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { JotaiProvider } from "@/components/jotai-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
})

export const metadata: Metadata = {
  title: {
    default: "직행 - 맞춤형 채용정보 플랫폼",
    template: "%s | 직행",
  },
  description:
    "AI 기반 맞춤형 채용정보를 제공하는 직행에서 당신의 꿈의 직장을 찾아보세요. IT개발, 디자인, 마케팅 등 다양한 분야의 최신 채용공고를 확인하세요.",
  keywords: ["채용", "구인구직", "취업", "채용정보", "IT개발", "디자인", "마케팅", "직장", "커리어"],
  authors: [{ name: "직행 팀" }],
  creator: "직행",
  publisher: "직행",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"
      : "http://localhost:3000",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "직행 - 맞춤형 채용정보 플랫폼",
    description: "AI 기반 맞춤형 채용정보를 제공하는 직행에서 당신의 꿈의 직장을 찾아보세요.",
    url:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"
        : "http://localhost:3000",
    siteName: "직행",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "직행 - 맞춤형 채용정보 플랫폼",
      },
      {
        url: "/images/og-logo.png",
        width: 512,
        height: 512,
        alt: "직행 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "직행 - 맞춤형 채용정보 플랫폼",
    description: "AI 기반 맞춤형 채용정보를 제공하는 직행에서 당신의 꿈의 직장을 찾아보세요.",
    images: ["/images/og-image.png"],
    creator: "@jikhang_official",
    site: "@jikhang_official",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" },
      { rel: "shortcut icon", url: "/favicon.ico" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "Business",
  classification: "Job Board Platform",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  applicationName: "직행",
  appleWebApp: {
    capable: true,
    title: "직행",
    statusBarStyle: "default",
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "naver-site-verification": "your-naver-verification-code",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <JotaiProvider>{children}</JotaiProvider>
      </body>
    </html>
  )
}
