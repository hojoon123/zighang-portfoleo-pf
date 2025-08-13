export interface JobPosting {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  experience: string
  tags: string[]
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  deadline: string
  isActive: boolean
  featured: boolean
  remote: boolean
  companyLogo: string
}

export interface JobCategory {
  id: string
  name: string
  icon: string
  color: string
}

export interface BannerImage {
  src: string
  alt: string
  title: string
  subtitle: string
}

export interface HeroBanner {
  url: string
  alt: string
  title: string
  description: string
  badge: string
  primaryCta: string
  secondaryCta: string
}

export interface NavigationLink {
  label: string
  href: string
  ariaLabel: string
}

export interface FooterData {
  company: {
    name: string
    description: string
  }
  sections: {
    title: string
    links: {
      label: string
      href: string
    }[]
  }[]
  copyright: {
    text: string
    tagline: string
  }
}
