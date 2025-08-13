-- 기존 테스트 사용자가 있는지 확인하고 없을 때만 생성
DO $$
BEGIN
  -- auth.users에 테스트 사용자가 없으면 생성 (Supabase 함수 사용)
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'test@company.com') THEN
    -- 이 부분은 Supabase Dashboard에서 수동으로 해주세요
    RAISE NOTICE 'Please create test user manually in Supabase Dashboard';
  END IF;
  
  -- user_profiles에 최소한의 정보만 추가 (필수 필드만)
  INSERT INTO user_profiles (
    id,
    email,
    full_name,
    is_profile_complete
  ) 
  SELECT 
    id,
    'test@company.com',
    '테스트 사용자',
    false
  FROM auth.users 
  WHERE email = 'test@company.com'
  ON CONFLICT (id) DO NOTHING;
END $$;
