import type { BannerImage, HeroBanner, JobPosting, JobCategory, NavigationLink, FooterData } from "@/types/landing"

// 히어로 배너 데이터
export const heroBanner: HeroBanner = {
  url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  alt: "취업 기회",
  title: "새로운 기회를 찾아보세요",
  description: "최고의 기업들이 당신을 기다립니다. 전문가들과 함께 성장하며 혁신을 만드는 일터에서 일해보세요.",
  badge: "새로운 기회",
  primaryCta: "지금 시작하기",
  secondaryCta: "더 알아보기",
}

// 배너 캐러셀 이미지 데이터
export const bannerImages: BannerImage[] = [
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    alt: "취업 성공",
    title: "새로운 기회를 찾아보세요",
    subtitle: "최고의 기업들이 당신을 기다립니다",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    alt: "커리어 성장",
    title: "커리어 성장의 기회",
    subtitle: "전문가들과 함께 성장하세요",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    alt: "혁신적인 업무환경",
    title: "혁신을 만드는 일터",
    subtitle: "창의적인 환경에서 일해보세요",
  },
]

export const featuredJobs: JobPosting[] = [
  {
    id: "1",
    title: "프론트엔드 개발자",
    company: "카카오",
    location: "판교",
    type: "full-time",
    salary: "6000-8000만원",
    experience: "3-5년",
    tags: ["React", "TypeScript", "Next.js", "CSS"],
    description: "React 기반의 웹 애플리케이션 개발을 담당하실 프론트엔드 개발자를 모집합니다.",
    requirements: ["React, TypeScript 3년 이상 경험", "컴포넌트 기반 설계 경험", "상태 관리 라이브러리 활용 경험"],
    benefits: ["4대보험", "연차 15일", "교육비 지원", "유연근무제"],
    postedDate: "2025-01-15",
    deadline: "2025-02-15",
    isActive: true,
    featured: true,
    remote: false,
    companyLogo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    title: "Product Designer",
    company: "토스",
    location: "강남",
    type: "full-time",
    salary: "5000-7000만원",
    experience: "2-3년",
    tags: ["Figma", "Sketch", "Prototyping", "User Research"],
    description: "사용자 중심의 금융 서비스 디자인을 담당하실 프로덕트 디자이너를 찾습니다.",
    requirements: ["UI/UX 디자인 2년 이상 경험", "Figma, Sketch 능숙한 활용", "사용자 리서치 및 데이터 분석 경험"],
    benefits: ["4대보험", "연차 15일", "맥북 지급", "자기계발비"],
    postedDate: "2025-01-08",
    deadline: "2025-02-08",
    isActive: true,
    featured: true,
    remote: false,
    companyLogo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    title: "풀스택 개발자",
    company: "카카오",
    location: "판교",
    type: "full-time",
    salary: "7000-9000만원",
    experience: "4-6년",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    description: "프론트엔드부터 백엔드까지 전체 스택을 담당하실 풀스택 개발자를 찾습니다.",
    requirements: ["프론트엔드 및 백엔드 개발 경험", "React, Node.js 4년 이상 경험", "Database 설계 및 API 개발 경험"],
    benefits: ["4대보험", "연차 20일", "스톡옵션", "해외 컨퍼런스"],
    postedDate: "2025-01-12",
    deadline: "2025-02-12",
    isActive: true,
    featured: true,
    remote: false,
    companyLogo: "/placeholder.svg?height=40&width=40",
  },
]

// 랜딩 페이지 직종별 카테고리 데이터
export const jobCategories: JobCategory[] = [
  {
    id: "it-development",
    name: "IT·개발",
    icon: "⚡",
    color: "rgb(99, 102, 241)",
  },
  {
    id: "ai-data",
    name: "AI·데이터",
    icon: "🔬",
    color: "rgb(147, 51, 234)",
  },
  {
    id: "game",
    name: "게임",
    icon: "🎮",
    color: "rgb(59, 130, 246)",
  },
  {
    id: "design",
    name: "디자인",
    icon: "✏️",
    color: "rgb(236, 72, 153)",
  },
  {
    id: "planning",
    name: "기획·전략",
    icon: "📋",
    color: "rgb(34, 197, 94)",
  },
  {
    id: "marketing",
    name: "마케팅·광고",
    icon: "📢",
    color: "rgb(249, 115, 22)",
  },
  {
    id: "sales",
    name: "영업",
    icon: "🤝",
    color: "rgb(6, 182, 212)",
  },
  {
    id: "finance",
    name: "무역·물류",
    icon: "🚛",
    color: "rgb(168, 85, 247)",
  },
  {
    id: "manufacturing",
    name: "운송·배송",
    icon: "🚚",
    color: "rgb(14, 165, 233)",
  },
  {
    id: "legal",
    name: "법률·법무",
    icon: "⚖️",
    color: "rgb(139, 69, 19)",
  },
  {
    id: "hr",
    name: "HR·총무",
    icon: "👥",
    color: "rgb(220, 38, 127)",
  },
  {
    id: "research",
    name: "회계·세무",
    icon: "💰",
    color: "rgb(16, 185, 129)",
  },
  {
    id: "rnd",
    name: "엔지니어링·R&D",
    icon: "🔬",
    color: "rgb(245, 101, 101)",
  },
  {
    id: "construction",
    name: "건설·간직",
    icon: "🏗️",
    color: "rgb(251, 146, 60)",
  },
  {
    id: "production",
    name: "생산·기능직",
    icon: "⚙️",
    color: "rgb(52, 211, 153)",
  },
  {
    id: "medical",
    name: "의료·보건",
    icon: "🏥",
    color: "rgb(248, 113, 113)",
  },
  {
    id: "education",
    name: "교육",
    icon: "📚",
    color: "rgb(34, 197, 94)",
  },
  {
    id: "media",
    name: "미디어·엔터",
    icon: "🎬",
    color: "rgb(168, 85, 247)",
  },
  {
    id: "consulting",
    name: "고객상담·TM",
    icon: "📞",
    color: "rgb(59, 130, 246)",
  },
  {
    id: "service",
    name: "서비스",
    icon: "🛎️",
    color: "rgb(245, 158, 11)",
  },
]

// 네비게이션 링크 데이터
export const navigationLinks: NavigationLink[] = [
  { label: "채용정보", href: "/jobs", ariaLabel: "채용정보 페이지로 이동" },
  { label: "기업정보", href: "#company-jobs", ariaLabel: "기업별 공고 섹션으로 이동" },
  { label: "실시간 공고", href: "#realtime-jobs", ariaLabel: "실시간 공고 섹션으로 이동" },
  { label: "공고 제보", href: "#job-report", ariaLabel: "공고 제보 섹션으로 이동" },
  { label: "오픈 채팅", href: "#open-chat", ariaLabel: "오픈 채팅 섹션으로 이동" },
]

// 푸터 데이터
export const footerData: FooterData = {
  company: {
    name: "직행",
    description: "당신의 취업을 향한 직행로를 제공합니다. 최고의 기업과 인재를 연결하는 플랫폼입니다.",
  },
  sections: [
    {
      title: "서비스",
      links: [
        { label: "채용공고", href: "#" },
        { label: "회사정보", href: "#" },
        { label: "커리어 가이드", href: "#" },
        { label: "채용 솔루션", href: "#" },
      ],
    },
    {
      title: "고객지원",
      links: [
        { label: "고객센터", href: "#" },
        { label: "FAQ", href: "#" },
        { label: "이용약관", href: "#" },
        { label: "개인정보처리방침", href: "#" },
      ],
    },
    {
      title: "연결하기",
      links: [
        { label: "블로그", href: "#" },
        { label: "뉴스레터", href: "#" },
        { label: "소셜미디어", href: "#" },
        { label: "파트너십", href: "#" },
      ],
    },
  ],
  copyright: {
    text: "© 2025 직행. All rights reserved.",
    tagline: "서울에서 ❤️로 만들어졌습니다.",
  },
}
