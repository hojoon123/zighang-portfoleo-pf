-- 25개 추가 채용 공고 데이터 삽입 (기존 5개와 합쳐서 총 30개)
-- 기존 데이터와 ID 충돌을 피하기 위해 새로운 UUID 사용

-- 먼저 기존 데이터의 created_by NULL 문제 해결
UPDATE job_postings 
SET created_by = gen_random_uuid()
WHERE created_by IS NULL;

-- 25개 추가 데이터 삽입
INSERT INTO job_postings (
  title, company, category, location, experience, employment_type, salary, tags, 
  description, requirements, benefits, deadline, posted_at, updated_at, is_urgent, 
  is_new, company_logo, company_size, views, applicants, is_active, created_by
) VALUES
-- IT·개발 (5개)
('React Native 개발자', '배달의민족', 'IT·개발', '서울', '1-3년', '정규직', '5,500만원+', 
 ARRAY['React Native', 'JavaScript', 'Mobile', 'Redux'], 
 '배달의민족 모바일 앱 개발을 담당합니다.', 
 ARRAY['React Native 개발 경험 1년 이상', 'JavaScript ES6+ 숙련', '모바일 앱 개발 경험'], 
 ARRAY['연봉 5500만원 이상', '배달비 지원', '자율출퇴근'], 
 '2025-11-30', NOW(), NOW(), false, true, '/companies/baemin.png', '중견기업(300-1000명)', 445, 32, true, gen_random_uuid()),

('Spring Boot 백엔드 개발자', '네이버', 'IT·개발', '서울', '4-7년', '정규직', '8,000만원+', 
 ARRAY['Spring Boot', 'Java', 'MySQL', 'Redis'], 
 '네이버 서비스의 백엔드 API 개발을 담당합니다.', 
 ARRAY['Spring Boot 개발 경험 3년 이상', 'Java 8+ 숙련', 'MySQL, Redis 사용 경험'], 
 ARRAY['연봉 8000만원 이상', '네이버 서비스 할인', '점심 지원'], 
 '2025-12-15', NOW(), NOW(), true, false, '/companies/naver.png', '대기업(1000명+)', 892, 67, true, gen_random_uuid()),

('Vue.js 프론트엔드 개발자', '라인', 'IT·개발', '서울', '1-3년', '정규직', '6,200만원+', 
 ARRAY['Vue.js', 'Nuxt.js', 'TypeScript', 'Sass'], 
 '라인 메신저 웹 클라이언트 개발을 담당합니다.', 
 ARRAY['Vue.js 개발 경험 2년 이상', 'TypeScript 사용 경험', 'Nuxt.js 프레임워크 경험'], 
 ARRAY['연봉 6200만원 이상', '스톡옵션', '일본 본사 연수'], 
 '2025-10-20', NOW(), NOW(), false, true, '/companies/line.png', '대기업(1000명+)', 623, 48, true, gen_random_uuid()),

('DevOps 엔지니어', '쿠팡', 'IT·개발', '서울', '4-7년', '정규직', '9,200만원+', 
 ARRAY['DevOps', 'AWS', 'Kubernetes', 'Docker'], 
 '쿠팡의 인프라 및 배포 시스템을 담당합니다.', 
 ARRAY['DevOps 경험 3년 이상', 'AWS 클라우드 경험', 'Kubernetes 운영 경험'], 
 ARRAY['연봉 9200만원 이상', '인센티브', '쿠팡 혜택'], 
 '2025-11-10', NOW(), NOW(), true, false, '/companies/coupang.png', '대기업(1000명+)', 756, 58, true, gen_random_uuid()),

('Python 백엔드 개발자', '당근마켓', 'IT·개발', '서울', '1-3년', '정규직', '5,800만원+', 
 ARRAY['Python', 'Django', 'FastAPI', 'PostgreSQL'], 
 '당근마켓 백엔드 시스템 개발을 담당합니다.', 
 ARRAY['Python 개발 경험 2년 이상', 'Django/FastAPI 경험', 'PostgreSQL 사용 경험'], 
 ARRAY['연봉 5800만원 이상', '당근마켓 혜택', '자율출퇴근'], 
 '2025-10-25', NOW(), NOW(), false, true, '/companies/daangn.png', '중견기업(300-1000명)', 534, 41, true, gen_random_uuid()),

-- AI·데이터 (5개)
('Computer Vision 연구원', 'LG AI연구원', 'AI·데이터', '서울', '8-15년', '정규직', '1억2천만원+', 
 ARRAY['Computer Vision', 'OpenCV', 'PyTorch', 'YOLO'], 
 'LG AI연구원의 컴퓨터 비전 연구를 담당합니다.', 
 ARRAY['Computer Vision 연구 경험 5년 이상', 'OpenCV, PyTorch 전문 지식', '논문 작성 경험'], 
 ARRAY['연봉 1억2천만원 이상', '연구비 무제한 지원', '논문 발표 인센티브'], 
 '2025-12-31', NOW(), NOW(), true, false, '/companies/lgai.png', '대기업(1000명+)', 1234, 89, true, gen_random_uuid()),

('MLOps 엔지니어', '카카오브레인', 'AI·데이터', '서울', '4-7년', '정규직', '9,500만원+', 
 ARRAY['MLOps', 'Kubernetes', 'Docker', 'Airflow'], 
 '카카오브레인의 ML 모델 운영 시스템을 담당합니다.', 
 ARRAY['MLOps 경험 2년 이상', 'Kubernetes, Docker 숙련', 'ML 파이프라인 구축 경험'], 
 ARRAY['연봉 9500만원 이상', '스톡옵션', '연구 환경 지원'], 
 '2025-11-25', NOW(), NOW(), false, true, '/companies/kakaobrain.png', '중견기업(300-1000명)', 789, 61, true, gen_random_uuid()),

('NLP 엔지니어', '업스테이지', 'AI·데이터', '서울', '1-3년', '정규직', '7,200만원+', 
 ARRAY['NLP', 'BERT', 'GPT', 'Transformer'], 
 '업스테이지의 자연어처리 모델 개발을 담당합니다.', 
 ARRAY['NLP 모델 개발 경험 1년 이상', 'Transformer 모델 이해', 'PyTorch 사용 경험'], 
 ARRAY['연봉 7200만원 이상', '스톡옵션', 'AI 컨퍼런스 참석 지원'], 
 '2025-09-20', NOW(), NOW(), false, true, '/companies/upstage.png', '중소기업(50-300명)', 456, 39, true, gen_random_uuid()),

('Data Engineer', '토스', 'AI·데이터', '서울', '4-7년', '정규직', '8,800만원+', 
 ARRAY['Data Engineering', 'Apache Spark', 'Kafka', 'Airflow'], 
 '토스의 데이터 파이프라인 구축을 담당합니다.', 
 ARRAY['Data Engineering 경험 3년 이상', 'Spark, Kafka 사용 경험', 'AWS/GCP 클라우드 경험'], 
 ARRAY['연봉 8800만원 이상', '스톡옵션', '워케이션'], 
 '2025-11-01', NOW(), NOW(), false, false, '/companies/toss.png', '중견기업(300-1000명)', 623, 47, true, gen_random_uuid()),

('AI Research Scientist', '삼성리서치', 'AI·데이터', '서울', '8-15년', '정규직', '1억5천만원+', 
 ARRAY['AI Research', 'Deep Learning', 'Publications', 'PhD'], 
 '삼성리서치의 차세대 AI 기술 연구를 담당합니다.', 
 ARRAY['AI 연구 경험 5년 이상 또는 PhD', 'Top-tier 학회 논문 발표 경험', '딥러닝 전문 지식'], 
 ARRAY['연봉 1억5천만원 이상', '연구비 무제한 지원', '논문 발표 인센티브'], 
 '2025-12-15', NOW(), NOW(), true, false, '/companies/samsungresearch.png', '대기업(1000명+)', 1123, 95, true, gen_random_uuid()),

-- 디자인 (3개)
('UX 리서처', '토스', '디자인', '서울', '4-7년', '정규직', '7,500만원+', 
 ARRAY['UX Research', 'User Testing', 'Data Analysis', 'Figma'], 
 '토스 서비스의 사용자 경험 연구를 담당합니다.', 
 ARRAY['UX 리서치 경험 3년 이상', '정량/정성 리서치 방법론 이해', '데이터 분석 능력'], 
 ARRAY['연봉 7500만원 이상', '스톡옵션', '워케이션'], 
 '2025-10-30', NOW(), NOW(), true, false, '/companies/toss.png', '중견기업(300-1000명)', 567, 42, true, gen_random_uuid()),

('Brand Designer', '무신사', '디자인', '서울', '1-3년', '정규직', '5,200만원+', 
 ARRAY['Brand Design', 'Adobe Creative Suite', 'Typography', 'Fashion'], 
 '무신사 브랜드 아이덴티티 디자인을 담당합니다.', 
 ARRAY['브랜드 디자인 경험 1년 이상', 'Adobe Creative Suite 숙련', '타이포그래피 이해'], 
 ARRAY['연봉 5200만원 이상', '무신사 할인 혜택', '패션 트렌드 교육'], 
 '2025-09-15', NOW(), NOW(), false, true, '/companies/musinsa.png', '중견기업(300-1000명)', 423, 35, true, gen_random_uuid()),

('Motion Graphics Designer', 'CJ ENM', '디자인', '서울', '1-3년', '정규직', '4,800만원+', 
 ARRAY['Motion Graphics', 'After Effects', 'Video Editing', 'Animation'], 
 'CJ ENM 콘텐츠의 모션 그래픽 제작을 담당합니다.', 
 ARRAY['Motion Graphics 경험 1년 이상', 'After Effects 고급 활용', '영상 편집 경험'], 
 ARRAY['연봉 4800만원 이상', 'CJ 계열사 혜택', '콘텐츠 제작 참여'], 
 '2025-09-25', NOW(), NOW(), false, true, '/companies/cjenm.png', '대기업(1000명+)', 423, 35, true, gen_random_uuid()),

-- 마케팅·광고 (3개)
('Performance Marketing 전문가', '쿠팡', '마케팅·광고', '서울', '4-7년', '정규직', '7,800만원+', 
 ARRAY['Performance Marketing', 'Google Ads', 'Facebook Ads', 'ROI'], 
 '쿠팡의 성과 기반 마케팅을 담당합니다.', 
 ARRAY['Performance Marketing 경험 3년 이상', 'Google Ads, Facebook Ads 운영 경험', 'ROI 최적화 경험'], 
 ARRAY['연봉 7800만원 이상', '인센티브', '쿠팡 혜택'], 
 '2025-11-20', NOW(), NOW(), true, false, '/companies/coupang.png', '대기업(1000명+)', 734, 58, true, gen_random_uuid()),

('Content Creator', '유튜브', '마케팅·광고', '서울', '1-3년', '정규직', '6,000만원+', 
 ARRAY['Content Creation', 'Video Editing', 'YouTube', 'Analytics'], 
 '유튜브 크리에이터 지원 콘텐츠 제작을 담당합니다.', 
 ARRAY['콘텐츠 제작 경험 1년 이상', '영상 편집 스킬', 'YouTube 플랫폼 이해'], 
 ARRAY['연봉 6000만원 이상', '크리에이터 네트워킹', '최신 장비 지원'], 
 '2025-10-10', NOW(), NOW(), false, true, '/companies/youtube.png', '대기업(1000명+)', 612, 47, true, gen_random_uuid()),

('Social Media Manager', '인스타그램', '마케팅·광고', '서울', '1-3년', '정규직', '5,800만원+', 
 ARRAY['SNS Marketing', 'Instagram', 'TikTok', 'Community'], 
 '인스타그램의 소셜미디어 마케팅을 담당합니다.', 
 ARRAY['SNS 마케팅 경험 1년 이상', 'Instagram, TikTok 운영 경험', '커뮤니티 관리 경험'], 
 ARRAY['연봉 5800만원 이상', 'SNS 광고비 지원', '트렌드 분석 도구 제공'], 
 '2025-09-30', NOW(), NOW(), false, true, '/companies/instagram.png', '대기업(1000명+)', 567, 43, true, gen_random_uuid()),

-- 게임 (2개)
('Unity 게임 개발자', '넥슨', '게임', '서울', '1-3년', '정규직', '5,800만원+', 
 ARRAY['Unity', 'C#', 'Game Development', 'Mobile'], 
 '넥슨의 모바일 게임 개발을 담당합니다.', 
 ARRAY['Unity 개발 경험 1년 이상', 'C# 프로그래밍 숙련', '모바일 게임 개발 경험'], 
 ARRAY['연봉 5800만원 이상', '게임 아이템 지급', '자율출퇴근'], 
 '2025-12-01', NOW(), NOW(), false, false, '/companies/nexon.png', '대기업(1000명+)', 445, 33, true, gen_random_uuid()),

('Game Server 개발자', '엔씨소프트', '게임', '경기', '4-7년', '정규직', '8,200만원+', 
 ARRAY['Game Server', 'C++', 'Linux', 'Database'], 
 '엔씨소프트의 게임 서버 개발을 담당합니다.', 
 ARRAY['게임 서버 개발 경험 3년 이상', 'C++ 고급 프로그래밍', 'Linux 서버 환경 경험'], 
 ARRAY['연봉 8200만원 이상', '게임 개발 보너스', '최신 서버 장비'], 
 '2025-11-15', NOW(), NOW(), true, false, '/companies/ncsoft.png', '대기업(1000명+)', 678, 52, true, gen_random_uuid()),

-- 기획·전략 (2개)
('Product Manager', '당근마켓', '기획·전략', '서울', '4-7년', '정규직', '7,200만원+', 
 ARRAY['Product Management', 'Strategy', 'Analytics', 'Agile'], 
 '당근마켓 제품 기획 및 전략을 담당합니다.', 
 ARRAY['Product Management 경험 3년 이상', '제품 전략 수립 경험', '데이터 기반 의사결정'], 
 ARRAY['연봉 7200만원 이상', '당근마켓 혜택', '제품 기획 교육'], 
 '2025-10-25', NOW(), NOW(), false, true, '/companies/daangn.png', '중견기업(300-1000명)', 523, 41, true, gen_random_uuid()),

('Business Analyst', 'SK텔레콤', '기획·전략', '서울', '1-3년', '정규직', '5,500만원+', 
 ARRAY['Business Analysis', 'Excel', 'SQL', 'Strategy'], 
 'SK텔레콤의 사업 분석 및 전략 기획을 담당합니다.', 
 ARRAY['비즈니스 분석 경험 1년 이상', 'Excel 고급 활용', 'SQL 쿼리 작성 능력'], 
 ARRAY['연봉 5500만원 이상', '통신비 지원', '자율출퇴근'], 
 '2025-09-30', NOW(), NOW(), false, false, '/companies/skt.png', '대기업(1000명+)', 389, 29, true, gen_random_uuid()),

-- 영업 (2개)
('B2B 영업 매니저', '세일즈포스', '영업', '서울', '4-7년', '정규직', '8,500만원+', 
 ARRAY['B2B Sales', 'CRM', 'Enterprise', 'Negotiation'], 
 '세일즈포스의 기업 고객 영업을 담당합니다.', 
 ARRAY['B2B 영업 경험 3년 이상', 'CRM 솔루션 이해', '기업 고객 관리 경험'], 
 ARRAY['연봉 8500만원 이상', '영업 인센티브', '해외 연수'], 
 '2025-12-10', NOW(), NOW(), true, false, '/companies/salesforce.png', '대기업(1000명+)', 667, 51, true, gen_random_uuid()),

('Key Account Manager', '아마존', '영업', '서울', '8-15년', '정규직', '1억원+', 
 ARRAY['Key Account', 'Strategic Sales', 'Partnership', 'E-commerce'], 
 '아마존의 주요 고객사 관리를 담당합니다.', 
 ARRAY['Key Account 관리 경험 5년 이상', '전략적 영업 경험', '파트너십 구축 경험'], 
 ARRAY['연봉 1억원 이상', '스톡옵션', '아마존 혜택'], 
 '2025-11-30', NOW(), NOW(), false, true, '/companies/amazon.png', '대기업(1000명+)', 892, 67, true, gen_random_uuid()),

-- 기타 직종 (3개)
('물류 기획자', 'CJ대한통운', '무역·물류', '서울', '1-3년', '정규직', '4,800만원+', 
 ARRAY['Logistics', 'Supply Chain', 'Planning', 'WMS'], 
 'CJ대한통운의 물류 기획 업무를 담당합니다.', 
 ARRAY['물류 업무 경험 1년 이상', '공급망 관리 이해', 'WMS 시스템 경험'], 
 ARRAY['연봉 4800만원 이상', 'CJ 계열사 혜택', '물류 전문 교육'], 
 '2025-10-15', NOW(), NOW(), false, false, '/companies/cj.png', '대기업(1000명+)', 334, 26, true, gen_random_uuid()),

('HR Business Partner', '구글코리아', 'HR·총무', '서울', '4-7년', '정규직', '9,000만원+', 
 ARRAY['HR Strategy', 'Talent Management', 'Organization Development', 'Analytics'], 
 '구글코리아의 HR 비즈니스 파트너 업무를 담당합니다.', 
 ARRAY['HR 업무 경험 3년 이상', '조직 개발 경험', '인재 관리 전략 수립'], 
 ARRAY['연봉 9000만원 이상', '구글 혜택', '글로벌 HR 교육'], 
 '2025-10-20', NOW(), NOW(), false, true, '/companies/google.png', '대기업(1000명+)', 623, 47, true, gen_random_uuid()),

('세무 회계사', 'KPMG', '회계·세무', '서울', '4-7년', '정규직', '7,500만원+', 
 ARRAY['Tax Accounting', 'Financial Reporting', 'Audit', 'IFRS'], 
 'KPMG의 세무 회계 업무를 담당합니다.', 
 ARRAY['공인회계사 자격증 보유', '세무 회계 경험 3년 이상', 'IFRS 이해'], 
 ARRAY['연봉 7500만원 이상', '회계법인 혜택', '해외 파견 기회'], 
 '2025-11-10', NOW(), NOW(), true, false, '/companies/kpmg.png', '대기업(1000명+)', 445, 33, true, gen_random_uuid());

-- 테이블 통계 업데이트
ANALYZE job_postings;
