-- Insert AI/데이터 category jobs
INSERT INTO public.job_postings (
  id, title, company, category, location, experience, employment_type, salary,
  tags, description, requirements, benefits, deadline, posted_at, updated_at,
  is_urgent, is_new, company_logo, company_size, views, applicants
) VALUES
-- AI/데이터 jobs
('ai-001', 'Machine Learning Engineer', 'Google', 'AI·데이터', '서울', '4-7년', '정규직', '1억2천만원+',
 ARRAY['Machine Learning', 'Python', 'TensorFlow', 'PyTorch'],
 '구글의 머신러닝 플랫폼 개발을 담당합니다.',
 ARRAY['ML 모델 개발 경험 3년 이상', 'Python, TensorFlow/PyTorch 숙련', '대용량 데이터 처리 경험', '논문 작성 및 발표 경험'],
 ARRAY['연봉 1억2천만원 이상', '스톡옵션', '해외 컨퍼런스 참석', '연구비 무제한 지원'],
 '2025-12-31', '2025-08-01', '2025-08-01', true, true, '/companies/google.png', '대기업(1000명+)', 1567, 142),

('ai-002', 'Data Scientist', '카카오브레인', 'AI·데이터', '서울', '1-3년', '정규직', '7,000만원+',
 ARRAY['Data Science', 'Python', 'R', 'Statistics'],
 '카카오브레인의 데이터 사이언스 업무를 담당합니다.',
 ARRAY['Data Science 경험 2년 이상', 'Python/R 통계 분석 능력', 'Machine Learning 기초 지식', 'SQL 쿼리 작성 능력'],
 ARRAY['연봉 7000만원 이상', '스톡옵션', '연구 논문 인센티브', '자율출퇴근'],
 '2025-11-30', '2025-07-28', '2025-07-28', false, true, '/companies/kakaobrain.png', '중견기업(300-1000명)', 892, 73),

('ai-003', 'Computer Vision Engineer', '네이버랩스', 'AI·데이터', '서울 · 경기', '4-7년', '정규직', '9,000만원+',
 ARRAY['Computer Vision', 'OpenCV', 'Deep Learning', 'YOLO'],
 '네이버랩스의 컴퓨터 비전 기술 개발을 담당합니다.',
 ARRAY['Computer Vision 개발 경험 3년 이상', 'OpenCV, Deep Learning 숙련', '이미지/영상 처리 전문 지식', '논문 작성 경험'],
 ARRAY['연봉 9000만원 이상', '연구비 지원', '특허 출원 인센티브', '해외 연수 기회'],
 '2025-10-15', '2025-07-25', '2025-07-25', true, false, '/companies/naverlabs.png', '중견기업(300-1000명)', 734, 58),

-- IT·개발 jobs
('it-001', 'AI Applications Solution Engineer', 'Microsoft', 'IT·개발', '서울 · 경기', '1-3년', '정규직', '5,000만원+',
 ARRAY['Python', 'AI', 'Machine Learning', 'Azure'],
 'Microsoft에서 AI 솔루션 엔지니어를 모집합니다. 최신 AI 기술을 활용한 엔터프라이즈 솔루션 개발 업무를 담당하게 됩니다.',
 ARRAY['Python 개발 경험 2년 이상', 'Machine Learning 프레임워크 경험', 'Azure 클라우드 서비스 이해', '영어 커뮤니케이션 가능'],
 ARRAY['연봉 5000만원 이상', '주식 옵션', '유연근무제', '교육비 지원'],
 '2025-12-31', '2025-08-01', '2025-08-01', false, true, '/companies/microsoft.png', '대기업(1000명+)', 342, 28),

('it-002', 'Frontend 개발자 (React)', '카카오', 'IT·개발', '서울 · 경기', '1-3년', '정규직', '6,000만원+',
 ARRAY['React', 'JavaScript', 'TypeScript', 'Frontend'],
 '카카오 서비스의 프론트엔드 개발을 담당합니다.',
 ARRAY['React 개발 경험 2년 이상', 'TypeScript 사용 경험', 'REST API 연동 경험', '웹 성능 최적화 경험'],
 ARRAY['연봉 6000만원 이상', '스톡옵션', '자율출퇴근', '사내 카페'],
 '2025-11-15', '2025-07-20', '2025-07-20', false, true, '/companies/kakao.png', '대기업(1000명+)', 892, 67),

-- 디자인 jobs
('design-001', 'UI/UX Designer', '카카오', '디자인', '서울', '1-3년', '정규직', '5,500만원+',
 ARRAY['UI/UX', 'Figma', 'Sketch', 'Prototyping'],
 '카카오 서비스의 UI/UX 디자인을 담당합니다.',
 ARRAY['UI/UX 디자인 경험 2년 이상', 'Figma, Sketch 능숙한 사용', '프로토타이핑 경험', '사용자 리서치 경험'],
 ARRAY['연봉 5500만원 이상', '카카오 서비스 할인', '디자인 도구 지원', '사내 카페 이용'],
 '2025-11-15', '2025-07-30', '2025-07-30', false, true, '/companies/kakao.png', '대기업(1000명+)', 678, 54),

('design-002', 'Product Designer', '토스', '디자인', '서울', '4-7년', '정규직', '7,000만원+',
 ARRAY['Product Design', 'Design System', 'User Research'],
 '토스 금융 서비스의 프로덕트 디자인을 담당합니다.',
 ARRAY['Product Design 경험 3년 이상', 'Design System 구축 경험', 'User Research 방법론 이해', '금융 서비스 디자인 경험 우대'],
 ARRAY['연봉 7000만원 이상', '스톡옵션', '워케이션', '디자인 컨퍼런스 참석 지원'],
 '2025-10-20', '2025-07-28', '2025-07-28', true, true, '/companies/toss.png', '중견기업(300-1000명)', 892, 67),

-- 마케팅·광고 jobs
('marketing-001', 'Digital Marketing Manager', '네이버', '마케팅·광고', '서울', '4-7년', '정규직', '6,500만원+',
 ARRAY['Digital Marketing', 'SEM', 'SNS', 'Performance Marketing'],
 '네이버 서비스의 디지털 마케팅 전략을 담당합니다.',
 ARRAY['Digital Marketing 경험 3년 이상', 'Google Ads, Facebook Ads 운영 경험', 'SNS 마케팅 경험', '성과 분석 및 최적화 경험'],
 ARRAY['연봉 6500만원 이상', '네이버 서비스 할인', '마케팅 도구 지원', '해외 컨퍼런스 참석'],
 '2025-11-20', '2025-07-30', '2025-07-30', false, true, '/companies/naver.png', '대기업(1000명+)', 734, 58),

('marketing-002', 'Growth Marketing Specialist', '토스', '마케팅·광고', '서울', '1-3년', '정규직', '5,800만원+',
 ARRAY['Growth Marketing', 'A/B Testing', 'User Acquisition', 'Analytics'],
 '토스의 사용자 증가 및 성장 마케팅을 담당합니다.',
 ARRAY['Growth Marketing 경험 1년 이상', 'A/B 테스트 설계 및 분석', 'User Acquisition 경험', 'GA, Amplitude 등 분석 도구 활용'],
 ARRAY['연봉 5800만원 이상', '스톡옵션', '워케이션', '성장 마케팅 교육'],
 '2025-10-15', '2025-07-28', '2025-07-28', true, true, '/companies/toss.png', '중견기업(300-1000명)', 612, 47);
