-- 분석 데이터를 위한 테이블 생성

-- 페이지뷰 추적 테이블
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 이벤트 추적 테이블
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  event_name TEXT NOT NULL,
  event_data JSONB,
  page_path TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 사용자 세션 테이블
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT UNIQUE NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  page_count INTEGER DEFAULT 1,
  duration_seconds INTEGER
);

-- RLS 정책 설정
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- 읽기 정책 (모든 사용자가 읽을 수 있음)
CREATE POLICY "Anyone can read page_views" ON page_views FOR SELECT USING (true);
CREATE POLICY "Anyone can read events" ON events FOR SELECT USING (true);
CREATE POLICY "Anyone can read user_sessions" ON user_sessions FOR SELECT USING (true);

-- 삽입 정책 (인증된 사용자만 삽입 가능)
CREATE POLICY "Authenticated users can insert page_views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can insert events" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can insert user_sessions" ON user_sessions FOR INSERT WITH CHECK (true);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);
CREATE INDEX IF NOT EXISTS idx_events_event_name ON events(event_name);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);
