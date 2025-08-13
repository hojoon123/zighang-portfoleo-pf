-- job_postings 테이블 데이터 재삽입 (UUID 생성 포함)
-- 기존 데이터 삭제 후 재삽입
DELETE FROM job_postings;

-- AI/데이터 카테고리 채용공고
INSERT INTO job_postings (
  id, title, company, category, location, experience, employment_type, 
  salary, tags, description, requirements, benefits, deadline, 
  posted_at, updated_at, is_urgent, is_new, company_logo, company_size, 
  views, applicants
) VALUES 
(gen_random_uuid(), 'Machine Learning Engineer', 'Google', 'AI·데이터', '서울', '4-7년', '정규직', '1억2천만원+', 
 ARRAY['Machine Learning', 'Python', 'TensorFlow', 'PyTorch'], 
 '구글의 머신러닝 플랫폼 개발을 담당합니다.',
 ARRAY['ML 모델 개발 경험 3년 이상', 'Python, TensorFlow/PyTorch 숙련', '대용량 데이터 처리 경험', '논문 작성 및 발표 경험'],
 ARRAY['연봉 1억2천만원 이상', '스톡옵션', '해외 컨퍼런스 참석', '연구비 무제한 지원'],
 '2025-12-31', NOW(), NOW(), true, true, '/companies/google.png', '대기업(1000명+)', 1567, 142),

(gen_random_uuid(), 'Data Scientist', '카카오브레인', 'AI·데이터', '서울', '1-3년', '정규직', '7,000만원+',
 ARRAY['Data Science', 'Python', 'R', 'Statistics'],
 '카카오브레인의 데이터 사이언스 업무를 담당합니다.',
 ARRAY['Data Science 경험 2년 이상', 'Python/R 통계 분석 능력', 'Machine Learning 기초 지식', 'SQL 쿼리 작성 능력'],
 ARRAY['연봉 7000만원 이상', '스톡옵션', '연구 논문 인센티브', '자율출퇴근'],
 '2025-11-30', NOW(), NOW(), false, true, '/companies/kakaobrain.png', '중견기업(300-1000명)', 892, 73),

(gen_random_uuid(), 'Frontend 개발자 (React)', '카카오', 'IT·개발', '서울', '1-3년', '정규직', '6,000만원+',
 ARRAY['React', 'JavaScript', 'TypeScript', 'Frontend'],
 '카카오 서비스의 프론트엔드 개발을 담당합니다.',
 ARRAY['React 개발 경험 2년 이상', 'TypeScript 사용 경험', 'REST API 연동 경험', '웹 성능 최적화 경험'],
 ARRAY['연봉 6000만원 이상', '스톡옵션', '자율출퇴근', '사내 카페'],
 '2025-11-15', NOW(), NOW(), false, true, '/companies/kakao.png', '대기업(1000명+)', 892, 67),

(gen_random_uuid(), 'UI/UX Designer', '카카오', '디자인', '서울', '1-3년', '정규직', '5,500만원+',
 ARRAY['UI/UX', 'Figma', 'Sketch', 'Prototyping'],
 '카카오 서비스의 UI/UX 디자인을 담당합니다.',
 ARRAY['UI/UX 디자인 경험 2년 이상', 'Figma, Sketch 능숙한 사용', '프로토타이핑 경험', '사용자 리서치 경험'],
 ARRAY['연봉 5500만원 이상', '카카오 서비스 할인', '디자인 도구 지원', '사내 카페 이용'],
 '2025-11-15', NOW(), NOW(), false, true, '/companies/kakao.png', '대기업(1000명+)', 678, 54),

(gen_random_uuid(), 'Digital Marketing Manager', '네이버', '마케팅·광고', '서울', '4-7년', '정규직', '6,500만원+',
 ARRAY['Digital Marketing', 'SEM', 'SNS', 'Performance Marketing'],
 '네이버 서비스의 디지털 마케팅 전략을 담당합니다.',
 ARRAY['Digital Marketing 경험 3년 이상', 'Google Ads, Facebook Ads 운영 경험', 'SNS 마케팅 경험', '성과 분석 및 최적화 경험'],
 ARRAY['연봉 6500만원 이상', '네이버 서비스 할인', '마케팅 도구 지원', '해외 컨퍼런스 참석'],
 '2025-11-20', NOW(), NOW(), false, true, '/companies/naver.png', '대기업(1000명+)', 734, 58);
