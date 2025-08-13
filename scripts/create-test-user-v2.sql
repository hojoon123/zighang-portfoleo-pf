-- 테스트 사용자 생성 (이메일 인증 없이)
-- 이메일: test@company.com
-- 비밀번호: test123456

-- 1. auth.users 테이블에 사용자 생성 (ON CONFLICT 제거)
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

-- 2. user_profiles 테이블에 프로필 정보 추가
INSERT INTO user_profiles (
  id,
  email,
  full_name,
  avatar_url,
  created_at,
  updated_at
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'test@company.com'),
  'test@company.com',
  '테스트 사용자',
  null,
  now(),
  now()
);
