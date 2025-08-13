-- 직종 카테고리 테이블 생성
CREATE TABLE IF NOT EXISTS job_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 카테고리 데이터 삽입
INSERT INTO job_categories (id, name, icon, color, display_order) VALUES
('it-development', 'IT·개발', '⚡', 'rgb(99, 102, 241)', 1),
('ai-data', 'AI·데이터', '🔬', 'rgb(147, 51, 234)', 2),
('game', '게임', '🎮', 'rgb(59, 130, 246)', 3),
('design', '디자인', '✏️', 'rgb(236, 72, 153)', 4),
('planning', '기획·전략', '📋', 'rgb(34, 197, 94)', 5),
('marketing', '마케팅·광고', '📢', 'rgb(249, 115, 22)', 6),
('sales', '영업', '🤝', 'rgb(6, 182, 212)', 7),
('finance', '무역·물류', '🚛', 'rgb(168, 85, 247)', 8),
('manufacturing', '운송·배송', '🚚', 'rgb(14, 165, 233)', 9),
('legal', '법률·법무', '⚖️', 'rgb(139, 69, 19)', 10),
('hr', 'HR·총무', '👥', 'rgb(220, 38, 127)', 11),
('research', '회계·세무', '💰', 'rgb(16, 185, 129)', 12),
('rnd', '엔지니어링·R&D', '🔬', 'rgb(245, 101, 101)', 13),
('construction', '건설·간직', '🏗️', 'rgb(251, 146, 60)', 14),
('production', '생산·기능직', '⚙️', 'rgb(52, 211, 153)', 15),
('medical', '의료·보건', '🏥', 'rgb(248, 113, 113)', 16),
('education', '교육', '📚', 'rgb(34, 197, 94)', 17),
('media', '미디어·엔터', '🎬', 'rgb(168, 85, 247)', 18),
('consulting', '고객상담·TM', '📞', 'rgb(59, 130, 246)', 19),
('service', '서비스', '🛎️', 'rgb(245, 158, 11)', 20)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();

-- RLS 정책 설정 (읽기 전용)
ALTER TABLE job_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view job categories" ON job_categories
  FOR SELECT USING (true);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_job_categories_display_order ON job_categories(display_order);
CREATE INDEX IF NOT EXISTS idx_job_categories_is_active ON job_categories(is_active);
