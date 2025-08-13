-- gender 값을 한국어에서 영어로 변경하고 다른 값들도 조정
-- 기존 테스트 사용자 삭제 (존재하는 경우)
DELETE FROM auth.users WHERE email = 'test@company.com';
DELETE FROM user_profiles WHERE email = 'test@company.com';

-- 테스트 사용자 생성 (이메일 인증 완료 상태)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES (
  'b68b6dbe-d86c-4017-8e69-fb2cf14f937b',
  '00000000-0000-0000-0000-000000000000',
  'test@company.com',
  '$2a$10$8K1p/a0dUrZBvHEHdBMHdOxBtNXiQGGvkzG5b5RQJX5gKX5gKX5gK', -- test123456 해시
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "테스트 사용자"}',
  false,
  'authenticated',
  'authenticated'
);

-- 사용자 프로필 생성
INSERT INTO user_profiles (
  id,
  email,
  full_name,
  avatar_url,
  age,
  gender,
  education_level,
  university,
  major,
  experience_years,
  preferred_locations,
  preferred_categories,
  skills,
  resume_url,
  phone,
  address,
  bio,
  is_profile_complete,
  created_at,
  updated_at
) VALUES (
  'b68b6dbe-d86c-4017-8e69-fb2cf14f937b',
  'test@company.com',
  '테스트 사용자',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  28,
  'male',
  'bachelor',
  '서울대학교',
  '컴퓨터공학',
  3,
  ARRAY['서울', '경기'],
  ARRAY['IT개발', 'AI데이터'],
  ARRAY['React', 'TypeScript', 'Next.js', 'JavaScript', 'HTML/CSS', 'Node.js'],
  'https://example.com/resume.pdf',
  '010-1234-5678',
  '서울특별시 강남구',
  '프론트엔드 개발자로 3년간 근무하며 React, TypeScript, Next.js를 활용한 웹 애플리케이션 개발 경험이 있습니다.',
  true,
  NOW(),
  NOW()
);
