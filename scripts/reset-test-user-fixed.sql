-- 실제 user_profiles 테이블 스키마에 맞게 컬럼명 수정
-- 테스트 사용자 삭제 및 재생성 스크립트

-- 기존 테스트 사용자 데이터 삭제
DELETE FROM auth.users WHERE email = 'test@company.com';
DELETE FROM user_profiles WHERE email = 'test@company.com';

-- 테스트 사용자 생성 (auth.users)
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
  crypt('test123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "테스트 사용자"}',
  false,
  'authenticated',
  'authenticated'
);

-- 사용자 프로필 생성 (user_profiles)
INSERT INTO user_profiles (
  id,
  email,
  full_name,
  avatar_url,
  gender,
  education_level,
  major,
  age,
  phone,
  address,
  bio,
  university,
  experience_years,
  skills,
  preferred_categories,
  preferred_locations,
  resume_url,
  is_profile_complete,
  created_at,
  updated_at
) VALUES (
  'b68b6dbe-d86c-4017-8e69-fb2cf14f937b',
  'test@company.com',
  '테스트 사용자',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  '남성',
  '대학교 졸업',
  '컴퓨터공학',
  28,
  '010-1234-5678',
  '서울특별시 강남구',
  '프론트엔드 개발자로 3년간 근무하며 React, TypeScript, Next.js 등의 기술을 활용한 웹 애플리케이션 개발 경험이 있습니다.',
  '서울대학교',
  3,
  ARRAY['React', 'TypeScript', 'Next.js', 'JavaScript', 'HTML/CSS', 'Node.js'],
  ARRAY['IT개발', 'AI데이터'],
  ARRAY['서울', '경기'],
  'https://example.com/resume.pdf',
  true,
  NOW(),
  NOW()
);
