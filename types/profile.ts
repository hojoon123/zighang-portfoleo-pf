export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  age?: number
  gender?: "male" | "female" | "other" | "prefer_not_to_say"
  education_level?: string
  university?: string
  major?: string
  experience_years?: number
  preferred_locations?: string[]
  preferred_categories?: string[]
  skills?: string[]
  resume_url?: string
  phone?: string
  address?: string
  bio?: string
  is_profile_complete: boolean
  created_at: string
  updated_at: string
}

export interface JobApplication {
  id: string
  job_id: string
  user_id: string
  status: "applied" | "reviewing" | "interview" | "rejected" | "accepted"
  cover_letter?: string
  resume_url?: string
  applied_at: string
  updated_at: string
  job_posting?: {
    title: string
    company: string
    location: string
    salary: string
  }
}

export interface JobBookmark {
  id: string
  job_id: string
  user_id: string
  created_at: string
  job_posting?: {
    title: string
    company: string
    location: string
    salary: string
    company_logo: string
  }
}
