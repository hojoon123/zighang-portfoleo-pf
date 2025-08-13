export interface JobPosting {
  id: string
  title: string
  company: string
  category: string
  location: string
  experience: string
  employmentType: string
  salary: string
  tags: string[]
  description: string
  requirements: string[]
  benefits: string[]
  deadline: string
  postedAt: string
  updatedAt: string
  isUrgent?: boolean
  isNew?: boolean
  companyLogo: string
  companySize: string
  views: number
  applicants: number
}

export interface FilterOptions {
  categories: string[]
  experiences: string[]
  employmentTypes: string[]
  locations: string[]
  salaryRanges: string[]
}
