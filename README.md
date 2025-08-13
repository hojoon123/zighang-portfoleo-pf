# 직행 - AI 기반 채용정보 플랫폼

> **AI를 활용한 2일간의 집중 개발 프로젝트**  
> 프론트엔드 개발자 포지션을 위한 기술 역량 시연 프로젝트

## 🎯 프로젝트 개요

이 프로젝트는 **AI 도구를 활용하여 약 2일간 집중 개발**한 현대적인 채용정보 플랫폼입니다. 실제 기업의 기술 스택 요구사항을 벤치마킹하여 **프론트엔드 개발자로서의 기술 역량**을 보여주는 포트폴리오 프로젝트입니다.

### 🚀 핵심 구현 사항

- **실제 서버 연동**: Supabase를 활용한 실시간 데이터베이스 연동
- **현대적 상태관리**: Jotai를 활용한 효율적인 클라이언트 상태 관리
- **사용자 행동 분석**: 실제 이벤트 트래킹 시스템 구현
- **SSR 최적화**: Next.js 15 App Router를 활용한 서버사이드 렌더링
- **실시간 분석**: 관리자용 Analytics 대시보드 구현

## 🛠️ 최신 기술 스택

### 프론트엔드 프레임워크
- **Next.js 15.1.0** - 최신 React 기반 풀스택 프레임워크 (App Router)
- **React 19.0.0** - 최신 사용자 인터페이스 라이브러리
- **TypeScript 5.7.2** - 정적 타입 검사 시스템

### 상태 관리
- **Jotai 2.10.3** - 현대적인 Atomic 상태 관리 라이브러리
  - **Recoil 대체 선택 이유**: Recoil이 2025년 아카이브되면서, 현대 개발 환경에서 가장 유사한 API를 제공하는 Jotai를 선택
  - Bottom-up 접근법으로 필요한 곳에서만 상태 구독
  - React 19 완벽 호환 및 뛰어난 TypeScript 지원
  - 비동기 상태 처리 내장으로 서버 상태 관리 최적화

### 백엔드 & 데이터베이스
- **Supabase** - 실시간 PostgreSQL 데이터베이스
- **실시간 인증 시스템** - 이메일 인증 기반 사용자 관리
- **Row Level Security** - 데이터 보안 정책 적용

### UI/UX 및 스타일링
- **shadcn/ui** - 접근성 중심 컴포넌트 시스템
- **Tailwind CSS 4.1.9** - 최신 유틸리티 CSS 프레임워크
- **Radix UI** - 헤드리스 UI 컴포넌트로 접근성 보장

### 분석 및 모니터링
- **실시간 이벤트 트래킹** - 사용자 행동 분석 시스템
- **Analytics 대시보드** - 관리자용 실시간 통계 페이지
- **SEO 최적화** - 메타데이터, OG 태그, 구조화된 데이터

## 🏗️ 실제 구현된 기능들

### 1. 실시간 데이터베이스 연동
\`\`\`typescript
// 실제 Supabase 연동 예시
const { data: jobs } = await supabase
  .from('jobs')
  .select('*')
  .eq('status', 'active')
  .order('created_at', { ascending: false });
\`\`\`

### 2. 사용자 행동 이벤트 트래킹
\`\`\`typescript
// 실제 이벤트 트래킹 구현
const trackEvent = (eventName: string, eventData: any) => {
  await supabase.from('events').insert({
    event_name: eventName,
    event_data: eventData,
    user_id: user?.id,
    created_at: new Date().toISOString()
  });
};
\`\`\`

### 3. 현대적 상태 관리 (Jotai)
\`\`\`typescript
// Atomic 상태 관리 구현
export const jobFiltersAtom = atom({
  location: '',
  category: '',
  experience: '',
  salary: ''
});

export const filteredJobsAtom = atom((get) => {
  const filters = get(jobFiltersAtom);
  const jobs = get(jobsAtom);
  return applyFilters(jobs, filters);
});
\`\`\`

### 4. SSR 최적화된 페이지 구조
- **Jobs 페이지**: 서버사이드 렌더링으로 SEO 최적화
- **Analytics 페이지**: 실시간 데이터 시각화
- **인증 시스템**: 이메일 인증 기반 보안 구현

## 📊 Analytics 대시보드 접근 방법

### 🔐 접근 절차
1. **회원가입**: 이메일과 비밀번호로 계정 생성
2. **이메일 인증**: 발송된 인증 링크 클릭 필수
3. **로그인 완료**: 인증된 계정으로 로그인
4. **Analytics 접근**: `/analytics` 경로로 이동

### 📈 확인 가능한 데이터
- **인기 검색어**: 실시간 검색 트렌드 분석
- **카테고리별 조회수**: 직종별 관심도 통계
- **사용자 행동 패턴**: 필터 사용, 검색 패턴 등

> **참고**: Analytics 페이지는 인증된 사용자만 접근 가능하며, 실제 사용자 행동 데이터를 기반으로 실시간 업데이트됩니다.

## 🎨 개발 철학 및 접근법

### 현대적 개발 방식
- **컴포넌트 기반 아키텍처**: 재사용 가능하고 유지보수가 용이한 구조
- **타입 안전성**: TypeScript를 활용한 런타임 에러 방지
- **접근성 우선**: WCAG 2.1 AA 기준 준수
- **성능 최적화**: React 19의 동시성 기능 활용

### AI 도구 활용 개발
- **효율적인 개발 프로세스**: AI를 활용한 빠른 프로토타이핑
- **코드 품질 유지**: 자동화된 코드 리뷰 및 최적화
- **최신 기술 적용**: 트렌드에 맞는 기술 스택 선택

## 🚀 시작하기

### 환경 설정

1. **저장소 클론**
\`\`\`bash
git clone [repository-url]
cd job-board-platform
\`\`\`

2. **의존성 설치**
\`\`\`bash
npm install
\`\`\`

3. **환경변수 설정**
\`\`\`bash
cp .env.local.example .env.local
# .env.local 파일에 실제 값들을 입력하세요
\`\`\`

4. **개발 서버 실행**
\`\`\`bash
npm run dev
\`\`\`

### 필수 환경변수
\`\`\`env
# Supabase 연결 정보
SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 애플리케이션 URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

## 📁 프로젝트 구조

\`\`\`
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # SEO 최적화된 루트 레이아웃
│   ├── page.tsx           # 메인 랜딩 페이지
│   ├── jobs/              # 채용공고 페이지 (SSR)
│   ├── analytics/         # 관리자 분석 대시보드
│   └── auth/              # 인증 관련 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # shadcn/ui 기반 컴포넌트
│   ├── analytics/        # 분석 도구 컴포넌트
│   └── auth/             # 인증 관련 컴포넌트
├── lib/                   # 핵심 라이브러리
│   ├── supabase/         # 데이터베이스 연동 로직
│   ├── jotai.ts          # 상태 관리 atoms
│   └── utils.ts          # 공통 유틸리티
└── types/                 # TypeScript 타입 정의
\`\`\`

## 💼 기술적 하이라이트

### 1. 현대적 상태 관리 마이그레이션
- **Recoil → Jotai**: 아카이브된 라이브러리에서 현대적 대안으로 전환
- **성능 최적화**: 불필요한 리렌더링 최소화
- **타입 안전성**: 완벽한 TypeScript 지원

### 2. 실제 서버 연동 구현
- **실시간 데이터베이스**: Supabase PostgreSQL 연동
- **인증 시스템**: 이메일 기반 사용자 관리
- **보안**: Row Level Security 정책 적용

### 3. 사용자 경험 최적화
- **SSR**: 검색 엔진 최적화 및 초기 로딩 성능 개선
- **무한 스크롤**: 대용량 데이터 효율적 처리
- **실시간 필터링**: 즉시 반응하는 검색 및 필터 시스템

### 4. 분석 및 모니터링
- **이벤트 트래킹**: 사용자 행동 실시간 수집
- **데이터 시각화**: 관리자용 분석 대시보드
- **성능 모니터링**: Core Web Vitals 최적화

## 🎯 포트폴리오 포인트

이 프로젝트를 통해 보여주는 **프론트엔드 개발자 역량**:

### 기술적 역량
- ✅ **최신 기술 스택 활용**: Next.js 15, React 19, TypeScript 5.7
- ✅ **상태 관리 전문성**: Jotai를 활용한 효율적인 상태 관리
- ✅ **서버 연동 경험**: 실제 데이터베이스와 API 연동
- ✅ **성능 최적화**: SSR, 무한 스크롤, 이미지 최적화

### 개발 프로세스
- ✅ **AI 도구 활용**: 효율적인 개발 프로세스 구축
- ✅ **코드 품질**: TypeScript, ESLint를 활용한 안정적인 코드
- ✅ **사용자 중심 개발**: 접근성과 사용자 경험 고려
- ✅ **데이터 기반 개발**: 실제 사용자 행동 분석 구현

### 비즈니스 이해
- ✅ **기업 요구사항 분석**: 실제 채용공고 기반 기술 스택 선택
- ✅ **확장 가능한 구조**: 유지보수와 기능 확장을 고려한 설계
- ✅ **SEO 최적화**: 비즈니스 성과를 위한 검색 엔진 최적화
- ✅ **분석 도구 연동**: 데이터 기반 의사결정 지원

## 🔗 관련 문서

- [기술 스택 상세 분석](./TECH_STACK.md)
- [Next.js 15 문서](https://nextjs.org/docs)
- [Jotai 문서](https://jotai.org/)
- [Supabase 문서](https://supabase.com/docs)

---

**개발 기간**: 2일 (AI 도구 활용)  
**개발자**: 프론트엔드 개발자 지원자  
**배포**: Vercel Platform  
**마지막 업데이트**: 2025년 1월 15일
