"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { bannerImages } from "@/data/landing"

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]))
  const [isVisible, setIsVisible] = useState(false)

  // 다음 슬라이드 이미지 preload
  const preloadNextImage = useCallback(
    (index: number) => {
      const nextIndex = (index + 1) % bannerImages.length
      if (!loadedImages.has(nextIndex)) {
        setLoadedImages((prev) => new Set([...prev, nextIndex]))
      }
    },
    [loadedImages],
  )

  // 캐러셀 자동 재생 최적화
  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % bannerImages.length
        preloadNextImage(next)
        return next
      })
    }, 5000)

    return () => clearInterval(timer)
  }, [isVisible, preloadNextImage])

  // Intersection Observer로 뷰포트 진입 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // 첫 번째와 두 번째 이미지 preload
          setLoadedImages(new Set([0, 1]))
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("hero-carousel")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  // 슬라이드 변경 시 다음 이미지 preload
  const handleSlideChange = useCallback(
    (index: number) => {
      setCurrentSlide(index)
      preloadNextImage(index)
    },
    [preloadNextImage],
  )

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="hero-carousel" className="relative h-[200px] bg-gray-100 overflow-hidden rounded-2xl">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 carousel-slide ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* 조건부 이미지 렌더링으로 성능 최적화 */}
              {(loadedImages.has(index) || index === currentSlide) && (
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-2xl"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  quality={index === 0 ? 90 : 75}
                  onLoad={() => {
                    if (index === 0) {
                      // 첫 번째 이미지 로드 완료 후 다음 이미지 preload
                      setTimeout(() => preloadNextImage(0), 100)
                    }
                  }}
                />
              )}
              <div className="absolute inset-0 bg-black/30 rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-start px-8">
                <div className="text-white max-w-md">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">{image.title}</h2>
                  <p className="text-base text-gray-200">{image.subtitle}</p>
                </div>
              </div>
            </div>
          ))}

          {/* 네비게이션 버튼 접근성 개선 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/30 ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`슬라이드 ${index + 1}로 이동`}
                aria-current={index === currentSlide ? "true" : "false"}
              />
            ))}
          </div>

          {/* 이전/다음 버튼 추가 */}
          <button
            onClick={() => handleSlideChange((currentSlide - 1 + bannerImages.length) % bannerImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="이전 슬라이드"
          >
            ←
          </button>
          <button
            onClick={() => handleSlideChange((currentSlide + 1) % bannerImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="다음 슬라이드"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
