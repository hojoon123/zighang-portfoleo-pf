-- 기존 테스트 사용자 완전 삭제 후 재생성
-- 이메일: test@company.com, 비밀번호: test123456

-- 1. 기존 테스트 사용자 데이터 삭제
DELETE FROM user_profiles WHERE email = 'test@company.com';
DELETE FROM auth.users WHERE email = 'test@company.com';

-- 2. 새로운 테스트 사용자 생성
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
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'test@company.com',
  crypt('test123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  false,
  'authenticated',
  'authenticated'
);

-- 3. user_profiles 테이블에 프로필 정보 추가
INSERT INTO user_profiles (
  id,
  email,
  full_name,
  bio,
  location,
  website,
  github,
  linkedin,
  skills,
  experience_level,
  job_title,
  company,
  created_at,
  updated_at
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'test@company.com'),
  'test@company.com',
  '테스트 사용자',
  '포트폴리오 테스트를 위한 계정입니다. 모든 기능을 자유롭게 체험해보세요.',
  '서울, 대한민국',
  'https://example.com',
  'https://github.com/testuser',
  'https://linkedin.com/in/testuser',
  ARRAY['React', 'TypeScript', 'Next.js', 'Supabase', 'Tailwind CSS'],
  'senior',
  '시니어 프론트엔드 개발자',
  '테스트 회사',
  now(),
  now()
);
