-- 테스트용 슈퍼계정 생성 스크립트
-- 이메일 인증 없이 바로 로그인 가능한 테스트 계정

-- 테스트 사용자 생성 (이메일 인증 완료 상태로)
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
  '{"email": "test@company.com"}',
  false,
  'authenticated',
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- 테스트 사용자의 프로필 정보 생성
INSERT INTO public.user_profiles (
  id,
  email,
  full_name,
  bio,
  phone,
  address,
  age,
  gender,
  education_level,
  major,
  university,
  experience_years,
  skills,
  preferred_categories,
  preferred_locations,
  is_profile_complete,
  created_at,
  updated_at
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'test@company.com'),
  'test@company.com',
  '테스트 관리자',
  '회사 관계자 테스트용 계정입니다.',
  '010-1234-5678',
  '서울특별시 강남구',
  30,
  '기타',
  '대학교 졸업',
  '컴퓨터공학',
  '서울대학교',
  5,
  ARRAY['React', 'TypeScript', 'Next.js', 'Node.js'],
  ARRAY['IT개발', 'AI데이터'],
  ARRAY['서울', '경기'],
  true,
  now(),
  now()
) ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  bio = EXCLUDED.bio,
  updated_at = now();

-- 확인용 쿼리
SELECT 
  u.email,
  u.email_confirmed_at,
  p.full_name,
  p.is_profile_complete
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.id
WHERE u.email = 'test@company.com';
