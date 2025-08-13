-- created_by NULL 문제 해결 및 30개 데이터로 확장

-- 먼저 기존 데이터의 created_by를 더미 UUID로 업데이트
UPDATE job_postings 
SET created_by = gen_random_uuid()
WHERE created_by IS NULL;

-- 추가 채용 공고 데이터 삽입 (25개 추가하여 총 30개)
INSERT INTO job_postings (
  id, title, company, category, location, experience, employment_type, salary, tags, 
  description, requirements, benefits, deadline, posted_at, updated_at, is_urgent, 
  is_new, company_logo, company_size, views, applicants, is_active, created_by
) VALUES
-- IT·개발 추가 공고들
('job-006', 'React Native 개발자', '배달의민족', 'IT·개발', '서울', '1-3년', '정규직', '5,500만원+', 
 ARRAY['React Native', 'JavaScript', 'Mobile', 'Redux'], 
 '배달의민족 모바일 앱 개발을 담당합니다.', 
 ARRAY['React Native 개발 경험 1년 이상', 'JavaScript ES6+ 숙련', '모바일 앱 개발 경험', 'Redux 상태 관리 경험'], 
 ARRAY['연봉 5500만원 이상', '배달비 지원', '자율출퇴근', '맥북 지급'], 
 '2025-11-30', NOW(), NOW(), false, true, '/companies/baemin.png', '중견기업(300-1000명)', 445, 32, true, gen_random_uuid()),

('job-007', 'Spring Boot 백엔드 개발자', '네이버', 'IT·개발', '서울', '4-7년', '정규직', '8,000만원+', 
 ARRAY['Spring Boot', 'Java', 'MySQL', 'Redis'], 
 '네이버 서비스의 백엔드 API 개발을 담당합니다.', 
 ARRAY['Spring Boot 개발 경험 3년 이상', 'Java 8+ 숙련', 'MySQL, Redis 사용 경험', 'RESTful API 설계 경험'], 
 ARRAY['연봉 8000만원 이상', '네이버 서비스 할인', '점심 지원', '자율출퇴근'], 
 '2025-12-15', NOW(), NOW(), true, false, '/companies/naver.png', '대기업(1000명+)', 892, 67, true, gen_random_uuid()),

('job-008', 'Vue.js 프론트엔드 개발자', '라인', 'IT·개발', '서울', '1-3년', '정규직', '6,200만원+', 
 ARRAY['Vue.js', 'Nuxt.js', 'TypeScript', 'Sass'], 
 '라인 메신저 웹 클라이언트 개발을 담당합니다.', 
 ARRAY['Vue.js 개발 경험 2년 이상', 'TypeScript 사용 경험', 'Nuxt.js 프레임워크 경험', '반응형 웹 개발 경험'], 
 ARRAY['연봉 6200만원 이상', '스톡옵션', '일본 본사 연수', '점심 지원'], 
 '2025-10-20', NOW(), NOW(), false, true, '/companies/line.png', '대기업(1000명+)', 623, 48, true, gen_random_uuid()),

-- AI·데이터 추가 공고들
('job-009', 'Computer Vision 연구원', 'LG AI연구원', 'AI·데이터', '서울', '8-15년', '정규직', '1억2천만원+', 
 ARRAY['Computer Vision', 'OpenCV', 'PyTorch', 'YOLO'], 
 'LG AI연구원의 컴퓨터 비전 연구를 담당합니다.', 
 ARRAY['Computer Vision 연구 경험 5년 이상', 'OpenCV, PyTorch 전문 지식', '논문 작성 및 발표 경험', '영상 처리 알고리즘 개발 경험'], 
 ARRAY['연봉 1억2천만원 이상', '연구비 무제한 지원', '논문 발표 인센티브', '해외 학회 참석'], 
 '2025-12-31', NOW(), NOW(), true, false, '/companies/lgai.png', '대기업(1000명+)', 1234, 89, true, gen_random_uuid()),

('job-010', 'MLOps 엔지니어', '카카오브레인', 'AI·데이터', '서울', '4-7년', '정규직', '9,500만원+', 
 ARRAY['MLOps', 'Kubernetes', 'Docker', 'Airflow'], 
 '카카오브레인의 ML 모델 운영 시스템을 담당합니다.', 
 ARRAY['MLOps 경험 2년 이상', 'Kubernetes, Docker 숙련', 'ML 파이프라인 구축 경험', 'CI/CD 경험'], 
 ARRAY['연봉 9500만원 이상', '스톡옵션', '연구 환경 지원', 'GPU 서버 무제한 사용'], 
 '2025-11-25', NOW(), NOW(), false, true, '/companies/kakaobrain.png', '중견기업(300-1000명)', 789, 61, true, gen_random_uuid()),

-- 디자인 추가 공고들
('job-011', 'UX 리서처', '토스', '디자인', '서울', '4-7년', '정규직', '7,500만원+', 
 ARRAY['UX Research', 'User Testing', 'Data Analysis', 'Figma'], 
 '토스 서비스의 사용자 경험 연구를 담당합니다.', 
 ARRAY['UX 리서치 경험 3년 이상', '정량/정성 리서치 방법론 이해', '데이터 분석 능력', '사용자 테스트 설계 경험'], 
 ARRAY['연봉 7500만원 이상', '스톡옵션', '워케이션', '리서치 도구 지원'], 
 '2025-10-30', NOW(), NOW(), true, false, '/companies/toss.png', '중견기업(300-1000명)', 567, 42, true, gen_random_uuid()),

('job-012', 'Brand Designer', '무신사', '디자인', '서울', '1-3년', '정규직', '5,200만원+', 
 ARRAY['Brand Design', 'Adobe Creative Suite', 'Typography', 'Fashion'], 
 '무신사 브랜드 아이덴티티 디자인을 담당합니다.', 
 ARRAY['브랜드 디자인 경험 1년 이상', 'Adobe Creative Suite 숙련', '타이포그래피 이해', '패션 업계 관심'], 
 ARRAY['연봉 5200만원 이상', '무신사 할인 혜택', '패션 트렌드 교육', '브랜드 프로젝트 참여'], 
 '2025-09-15', NOW(), NOW(), false, true, '/companies/musinsa.png', '중견기업(300-1000명)', 423, 35, true, gen_random_uuid()),

-- 마케팅·광고 추가 공고들
('job-013', 'Performance Marketing 전문가', '쿠팡', '마케팅·광고', '서울', '4-7년', '정규직', '7,800만원+', 
 ARRAY['Performance Marketing', 'Google Ads', 'Facebook Ads', 'ROI'], 
 '쿠팡의 성과 기반 마케팅을 담당합니다.', 
 ARRAY['Performance Marketing 경험 3년 이상', 'Google Ads, Facebook Ads 운영 경험', 'ROI 최적화 경험', '이커머스 마케팅 경험'], 
 ARRAY['연봉 7800만원 이상', '인센티브', '쿠팡 혜택', '마케팅 도구 지원'], 
 '2025-11-20', NOW(), NOW(), true, false, '/companies/coupang.png', '대기업(1000명+)', 734, 58, true, gen_random_uuid()),

('job-014', 'Content Creator', '유튜브', '마케팅·광고', '서울', '1-3년', '정규직', '6,000만원+', 
 ARRAY['Content Creation', 'Video Editing', 'YouTube', 'Analytics'], 
 '유튜브 크리에이터 지원 콘텐츠 제작을 담당합니다.', 
 ARRAY['콘텐츠 제작 경험 1년 이상', '영상 편집 스킬', 'YouTube 플랫폼 이해', '데이터 분석 능력'], 
 ARRAY['연봉 6000만원 이상', '크리에이터 네트워킹', '최신 장비 지원', '글로벌 프로젝트 참여'], 
 '2025-10-10', NOW(), NOW(), false, true, '/companies/youtube.png', '대기업(1000명+)', 612, 47, true, gen_random_uuid()),

-- 게임 추가 공고들
('job-015', 'Unity 게임 개발자', '넥슨', '게임', '서울', '1-3년', '정규직', '5,800만원+', 
 ARRAY['Unity', 'C#', 'Game Development', 'Mobile'], 
 '넥슨의 모바일 게임 개발을 담당합니다.', 
 ARRAY['Unity 개발 경험 1년 이상', 'C# 프로그래밍 숙련', '모바일 게임 개발 경험', '게임 최적화 경험'], 
 ARRAY['연봉 5800만원 이상', '게임 아이템 지급', '자율출퇴근', '게임 개발 장비 지원'], 
 '2025-12-01', NOW(), NOW(), false, false, '/companies/nexon.png', '대기업(1000명+)', 445, 33, true, gen_random_uuid()),

('job-016', 'Game Server 개발자', '엔씨소프트', '게임', '경기', '4-7년', '정규직', '8,200만원+', 
 ARRAY['Game Server', 'C++', 'Linux', 'Database'], 
 '엔씨소프트의 게임 서버 개발을 담당합니다.', 
 ARRAY['게임 서버 개발 경험 3년 이상', 'C++ 고급 프로그래밍', 'Linux 서버 환경 경험', '대용량 동접 처리 경험'], 
 ARRAY['연봉 8200만원 이상', '게임 개발 보너스', '최신 서버 장비', '해외 출장 기회'], 
 '2025-11-15', NOW(), NOW(), true, false, '/companies/ncsoft.png', '대기업(1000명+)', 678, 52, true, gen_random_uuid()),

-- 기획·전략 추가 공고들
('job-017', 'Product Manager', '당근마켓', '기획·전략', '서울', '4-7년', '정규직', '7,200만원+', 
 ARRAY['Product Management', 'Strategy', 'Analytics', 'Agile'], 
 '당근마켓 제품 기획 및 전략을 담당합니다.', 
 ARRAY['Product Management 경험 3년 이상', '제품 전략 수립 경험', '데이터 기반 의사결정', 'Agile 방법론 이해'], 
 ARRAY['연봉 7200만원 이상', '당근마켓 혜택', '제품 기획 교육', '스타트업 경험'], 
 '2025-10-25', NOW(), NOW(), false, true, '/companies/daangn.png', '중견기업(300-1000명)', 523, 41, true, gen_random_uuid()),

('job-018', 'Business Analyst', 'SK텔레콤', '기획·전략', '서울', '1-3년', '정규직', '5,500만원+', 
 ARRAY['Business Analysis', 'Excel', 'SQL', 'Strategy'], 
 'SK텔레콤의 사업 분석 및 전략 기획을 담당합니다.', 
 ARRAY['비즈니스 분석 경험 1년 이상', 'Excel 고급 활용', 'SQL 쿼리 작성 능력', '전략 기획 경험'], 
 ARRAY['연봉 5500만원 이상', '통신비 지원', '자율출퇴근', '전략 기획 교육'], 
 '2025-09-30', NOW(), NOW(), false, false, '/companies/skt.png', '대기업(1000명+)', 389, 29, true, gen_random_uuid()),

-- 영업 추가 공고들
('job-019', 'B2B 영업 매니저', '세일즈포스', '영업', '서울', '4-7년', '정규직', '8,500만원+', 
 ARRAY['B2B Sales', 'CRM', 'Enterprise', 'Negotiation'], 
 '세일즈포스의 기업 고객 영업을 담당합니다.', 
 ARRAY['B2B 영업 경험 3년 이상', 'CRM 솔루션 이해', '기업 고객 관리 경험', '영어 커뮤니케이션 가능'], 
 ARRAY['연봉 8500만원 이상', '영업 인센티브', '해외 연수', '글로벌 네트워킹'], 
 '2025-12-10', NOW(), NOW(), true, false, '/companies/salesforce.png', '대기업(1000명+)', 667, 51, true, gen_random_uuid()),

('job-020', 'Key Account Manager', '아마존', '영업', '서울', '8-15년', '정규직', '1억원+', 
 ARRAY['Key Account', 'Strategic Sales', 'Partnership', 'E-commerce'], 
 '아마존의 주요 고객사 관리를 담당합니다.', 
 ARRAY['Key Account 관리 경험 5년 이상', '전략적 영업 경험', '파트너십 구축 경험', '이커머스 업계 이해'], 
 ARRAY['연봉 1억원 이상', '스톡옵션', '아마존 혜택', '글로벌 프로젝트 참여'], 
 '2025-11-30', NOW(), NOW(), false, true, '/companies/amazon.png', '대기업(1000명+)', 892, 67, true, gen_random_uuid()),

-- 무역·물류 추가 공고들
('job-021', '물류 기획자', 'CJ대한통운', '무역·물류', '서울', '1-3년', '정규직', '4,800만원+', 
 ARRAY['Logistics', 'Supply Chain', 'Planning', 'WMS'], 
 'CJ대한통운의 물류 기획 업무를 담당합니다.', 
 ARRAY['물류 업무 경험 1년 이상', '공급망 관리 이해', 'WMS 시스템 경험', '물류 최적화 관심'], 
 ARRAY['연봉 4800만원 이상', 'CJ 계열사 혜택', '물류 전문 교육', '자율출퇴근'], 
 '2025-10-15', NOW(), NOW(), false, false, '/companies/cj.png', '대기업(1000명+)', 334, 26, true, gen_random_uuid()),

('job-022', '해외영업 담당자', '현대상선', '무역·물류', '부산', '4-7년', '정규직', '6,500만원+', 
 ARRAY['International Trade', 'Shipping', 'Export', 'English'], 
 '현대상선의 해외 영업 업무를 담당합니다.', 
 ARRAY['해외영업 경험 3년 이상', '무역 실무 경험', '영어 비즈니스 레벨', '선박 운송 업계 이해'], 
 ARRAY['연봉 6500만원 이상', '해외 출장 기회', '현대 계열사 혜택', '글로벌 네트워킹'], 
 '2025-11-20', NOW(), NOW(), true, false, '/companies/hmmm.png', '대기업(1000명+)', 456, 34, true, gen_random_uuid()),

-- 법률·법무 추가 공고들
('job-023', '기업 법무팀', '삼성전자', '법률·법무', '서울', '4-7년', '정규직', '8,000만원+', 
 ARRAY['Corporate Law', 'Contract', 'Compliance', 'IP'], 
 '삼성전자의 기업 법무 업무를 담당합니다.', 
 ARRAY['기업 법무 경험 3년 이상', '계약서 검토 경험', '컴플라이언스 업무 경험', '지적재산권 이해'], 
 ARRAY['연봉 8000만원 이상', '삼성 계열사 혜택', '법무 전문 교육', '해외 법무 연수'], 
 '2025-12-05', NOW(), NOW(), false, true, '/companies/samsung.png', '대기업(1000명+)', 567, 43, true, gen_random_uuid()),

('job-024', '특허 변리사', 'LG화학', '법률·법무', '서울', '8-15년', '정규직', '1억2천만원+', 
 ARRAY['Patent Law', 'IP Strategy', 'Chemistry', 'Prosecution'], 
 'LG화학의 특허 전략 및 관리를 담당합니다.', 
 ARRAY['변리사 자격증 보유', '특허 출원 경험 5년 이상', '화학 분야 전문성', '영어 특허 명세서 작성 가능'], 
 ARRAY['연봉 1억2천만원 이상', 'LG 계열사 혜택', '특허 인센티브', '해외 특허 교육'], 
 '2025-11-25', NOW(), NOW(), true, false, '/companies/lgchem.png', '대기업(1000명+)', 789, 58, true, gen_random_uuid()),

-- HR·총무 추가 공고들
('job-025', 'HR Business Partner', '구글코리아', 'HR·총무', '서울', '4-7년', '정규직', '9,000만원+', 
 ARRAY['HR Strategy', 'Talent Management', 'Organization Development', 'Analytics'], 
 '구글코리아의 HR 비즈니스 파트너 업무를 담당합니다.', 
 ARRAY['HR 업무 경험 3년 이상', '조직 개발 경험', '인재 관리 전략 수립', '데이터 기반 HR 분석'], 
 ARRAY['연봉 9000만원 이상', '구글 혜택', '글로벌 HR 교육', '워라밸 보장'], 
 '2025-10-20', NOW(), NOW(), false, true, '/companies/google.png', '대기업(1000명+)', 623, 47, true, gen_random_uuid()),

-- 회계·세무 추가 공고들
('job-026', '세무 회계사', 'KPMG', '회계·세무', '서울', '4-7년', '정규직', '7,500만원+', 
 ARRAY['Tax Accounting', 'Financial Reporting', 'Audit', 'IFRS'], 
 'KPMG의 세무 회계 업무를 담당합니다.', 
 ARRAY['공인회계사 자격증 보유', '세무 회계 경험 3년 이상', 'IFRS 이해', '영어 재무제표 작성 가능'], 
 ARRAY['연봉 7500만원 이상', '회계법인 혜택', '해외 파견 기회', '전문 자격증 취득 지원'], 
 '2025-11-10', NOW(), NOW(), true, false, '/companies/kpmg.png', '대기업(1000명+)', 445, 33, true, gen_random_uuid()),

-- 엔지니어링·R&D 추가 공고들
('job-027', '자동차 R&D 엔지니어', '현대자동차', '엔지니어링·R&D', '경기', '1-3년', '정규직', '6,200만원+', 
 ARRAY['Automotive Engineering', 'CAD', 'Testing', 'Electric Vehicle'], 
 '현대자동차의 차세대 자동차 연구개발을 담당합니다.', 
 ARRAY['자동차공학 전공', 'CAD 프로그램 활용', '시험 평가 경험', '전기차 기술 관심'], 
 ARRAY['연봉 6200만원 이상', '현대 계열사 혜택', 'R&D 센터 근무', '해외 기술 연수'], 
 '2025-12-15', NOW(), NOW(), false, true, '/companies/hyundai.png', '대기업(1000명+)', 567, 42, true, gen_random_uuid()),

-- 건설·건축 추가 공고들
('job-028', '건축 설계사', '삼성물산', '건설·건축', '서울', '4-7년', '정규직', '7,000만원+', 
 ARRAY['Architecture', 'AutoCAD', 'Revit', 'Construction'], 
 '삼성물산의 건축 설계 업무를 담당합니다.', 
 ARRAY['건축사 자격증 보유', '설계 업무 경험 3년 이상', 'AutoCAD, Revit 숙련', '대형 프로젝트 경험'], 
 ARRAY['연봉 7000만원 이상', '삼성 계열사 혜택', '해외 프로젝트 참여', '설계 전문 교육'], 
 '2025-10-30', NOW(), NOW(), true, false, '/companies/samsungcnt.png', '대기업(1000명+)', 456, 34, true, gen_random_uuid()),

-- 생산·기능직 추가 공고들
('job-029', '생산관리 담당자', 'LG전자', '생산·기능직', '경기', '1-3년', '정규직', '4,500만원+', 
 ARRAY['Production Management', 'Quality Control', 'Manufacturing', 'Lean'], 
 'LG전자의 생산 관리 업무를 담당합니다.', 
 ARRAY['생산관리 경험 1년 이상', '품질관리 이해', '제조업 경험', 'Lean 생산방식 이해'], 
 ARRAY['연봉 4500만원 이상', 'LG 계열사 혜택', '생산 기술 교육', '자격증 취득 지원'], 
 '2025-09-20', NOW(), NOW(), false, false, '/companies/lge.png', '대기업(1000명+)', 334, 25, true, gen_random_uuid()),

-- 의료·보건 추가 공고들
('job-030', '의료기기 개발자', '메드트로닉', '의료·보건', '서울', '4-7년', '정규직', '8,500만원+', 
 ARRAY['Medical Device', 'Biomedical Engineering', 'FDA', 'Clinical Trial'], 
 '메드트로닉의 의료기기 개발을 담당합니다.', 
 ARRAY['의공학 또는 관련 전공', '의료기기 개발 경험 3년 이상', 'FDA 규정 이해', '임상시험 경험'], 
 ARRAY['연봉 8500만원 이상', '의료기기 전문 교육', '해외 학회 참석', '글로벌 프로젝트 참여'], 
 '2025-11-30', NOW(), NOW(), false, true, '/companies/medtronic.png', '대기업(1000명+)', 623, 47, true, gen_random_uuid());

-- 테이블 통계 업데이트
ANALYZE job_postings;
