# 채용정보 플랫폼 카피 페이지

> **AI를 활용한 2일간의 집중 개발 프로젝트**  
> 프론트엔드 개발자 포지션을 위한 기술 역량 시연용 포트폴리오
> 
> **도메인** https://zighang-portfoleo.vercel.app/

## 🎯 포트폴리오 포인트

### 📈 **비즈니스 임팩트**
- **실시간 사용자 행동 분석** - 검색 패턴, 카테고리 선호도, 페이지 조회수 추적
- **데이터 기반 의사결정** - /Analytics 대시보드를 통한 인사이트 제공
- **사용자 경험 최적화** - 개인화된 채용정보 추천 시스템 기반 구축

### 🚀 **개발 생산성**
- **개발기간 2일 풀스택 구현** - AI 도구 활용으로 개발 속도 향상
- **현대적 개발 환경** - Next.js 15, TypeScript, Tailwind CSS 최신 스택
- **확장 가능한 아키텍처** - 컴포넌트 기반 설계로 유지보수성 확보

## 💼 기술적 하이라이트

### 🔧 **핵심 기술 역량**
- **Next.js App Router** - SSR/CSR 하이브리드 렌더링으로 성능 최적화
- **실시간 데이터베이스** - Supabase 연동으로 즉시 반영되는 사용자 데이터
- **현대적 상태관리** - Jotai를 활용한 원자적 상태 관리 (Recoil 유사)
- **이벤트 트래킹** - 사용자 행동 분석을 위한 커스텀 Analytics 시스템

### 📊 **데이터 처리**
- **실시간 집계** - 검색어 랭킹, 카테고리별 조회수 실시간 업데이트
- **효율적 쿼리** - Supabase의 PostgreSQL 기반 복잡한 데이터 조회
- **사용자 세션 관리** - 쿠키 기반 인증과 사용자 프로필 시스템

## 📊 /Analytics 대시보드 접근 방법

### 🔐 **테스트 계정으로 바로 체험**
```
이메일: test@company.com
비밀번호: test123456
```

### 📈 **확인 가능한 데이터**
1. **실시간 검색어 랭킹** - 가장 많이 검색된 키워드 TOP 5
2. **카테고리별 관심도** - 직종별 조회수 분석
3. **사용자 행동 패턴** - 페이지 방문 통계 및 트렌드

### 🎯 **접근 경로**
1. 상단 우측 **로그인** 클릭
2. 테스트 계정으로 로그인
3. **/Analytics** 접근

## 🏗️ 실제 구현된 기능들

### 1. 실시간 데이터베이스 연동

// 실시간 Supabase 연동 예시
```typescript
const { data: jobs } = await supabase
  .from('jobs')
  .select('*')
  .eq('status', 'active')
  .order('created_at', { ascending: false });
```

### 2. 사용자 행동 이벤트 트래킹
```typescript
// 실시간 이벤트 트래킹 구현
const trackEvent = (eventName: string, eventData: any) => {
  await supabase.from('events').insert({
    event_name: eventName,
    event_data: eventData,
    user_id: user?.id,
    created_at: new Date().toISOString()
  });
};
```

### 3. 현대적 상태 관리 (Jotai)
```typescript
// Atomic 상태 관리 구현
export const jobFiltersAtom = atom({
  location: "",
  category: "",
  experience: "",
  salary: ""
});

export const filteredJobsAtom = atom((get) => {
  const filters = get(jobFiltersAtom);
  const jobs = get(jobsAtom);
  return applyFilters(jobs, filters);
});
```

### 4. SSR/CSR 하이브리드 렌더링
```typescript
// Server Component에서 초기 데이터 로드
export default async function JobsPage() {
  const jobs = await getJobs();
  const categories = await getCategories();
  
  return (
    <JobsPageClient 
      initialJobs={jobs}
      categories={categories}
    />
  );
}
```

### 5. 사용자 인증 시스템
```typescript
// Supabase Auth 연동
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
  options: {
    emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin
  }
});
```

## 🎨 디자인 시스템

### 🎯 **사용자 경험 중심 설계**
- **직관적 네비게이션** - 채용정보, 기업정보, 실시간 공고 등 명확한 구조
- **반응형 디자인** - 모바일부터 데스크톱까지 완벽한 적응형 레이아웃
- **접근성 고려** - WCAG 가이드라인 준수, 키보드 네비게이션 지원

### 🎨 **시각적 일관성**
- **컴포넌트 기반 UI** - shadcn/ui 기반 재사용 가능한 디자인 시스템
- **타이포그래피** - 계층적 정보 구조를 위한 체계적 폰트 시스템
- **컬러 시스템** - 브랜드 아이덴티티를 반영한 일관된 색상 팔레트

## 🚀 성능 최적화

### ⚡ **로딩 성능**
- **이미지 최적화** - Next.js Image 컴포넌트로 lazy loading 및 WebP 변환
- **코드 스플리팅** - 페이지별 번들 분할로 초기 로딩 시간 단축
- **캐싱 전략** - 정적 자산 및 API 응답 캐싱으로 반복 요청 최적화

### 📊 **SEO 최적화**
- **동적 메타데이터** - 페이지별 맞춤형 SEO 태그 자동 생성
- **구조화된 데이터** - JSON-LD를 통한 검색엔진 최적화
- **사이트맵 자동 생성** - 검색엔진 크롤링 효율성 향상

## 🔧 개발 환경 설정

### 📋 **필수 요구사항**
- Node.js 18+ 
- pnpm (권장) 또는 npm
- Supabase 계정

### 🚀 **로컬 실행**
```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build
```

### 🔐 **환경변수 설정**
```env
# Supabase 연결 정보 (필수)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 개발환경 이메일 인증 리다이렉트 URL
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback

# 애플리케이션 BASE URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📈 프로젝트 성과

### 🎯 **기술적 성취**
- **개발 속도**: AI 도구 활용으로 2일 만에 풀스택 애플리케이션 완성
- **코드 품질**: TypeScript 100% 적용, ESLint/Prettier 설정으로 일관된 코드 스타일
- **성능 지표**: Lighthouse 성능 점수 90+ 달성

### 💡 **학습 성과**
- **최신 기술 스택 습득**: Next.js 15, Jotai, Supabase 등 현대적 도구 활용
- **풀스택 개발 경험**: 프론트엔드부터 데이터베이스까지 전체 스택 구현
- **사용자 중심 사고**: Analytics를 통한 데이터 기반 의사결정 프로세스 구축

## 🛠️ 최신 기술 스택

### **Frontend**
- **Next.js 15** - App Router, Server Components
- **TypeScript** - 타입 안전성 보장
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 컴포넌트 라이브러리

### **State Management**
- **Jotai** - 원자적 상태 관리 (Recoil 유사)
- **React Hook Form** - 폼 상태 관리 및 유효성 검사

### **Backend & Database**
- **Supabase** - PostgreSQL 기반 BaaS
- **Supabase Auth** - 사용자 인증 및 세션 관리
- **Real-time Subscriptions** - 실시간 데이터 동기화

### **Development Tools**
- **ESLint & Prettier** - 코드 품질 및 포매팅
- **TypeScript** - 정적 타입 검사
- **Vercel** - 배포 및 호스팅

---

**개발 기간**: 2일 (AI 도구 활용)  
**개발자**: 프론트엔드 개발자 지원자 강호준
**목적**: 기술 역량 시연 및 포트폴리오
