import { Header } from "@/components/landing/header"
import { HeroCarousel } from "@/components/landing/hero-carousel"
import { FeaturedJobs } from "@/components/landing/featured-jobs"
import { JobCategories } from "@/components/landing/job-categories"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <JobCategories />
      <HeroCarousel />
      <FeaturedJobs />
      <Footer />
    </div>
  )
}
