-- 실시간 이벤트 조회를 위한 UNION 함수 생성
CREATE OR REPLACE FUNCTION get_recent_events(limit_count INT DEFAULT 20, offset_count INT DEFAULT 0)
RETURNS TABLE (
  id UUID,
  event_type TEXT,
  event_name TEXT,
  event_data JSONB,
  page_path TEXT,
  user_id UUID,
  created_at TIMESTAMPTZ
)
LANGUAGE SQL
AS $$
  (
    SELECT 
      id,
      'event' as event_type,
      event_name,
      event_data,
      page_path,
      user_id,
      created_at
    FROM events
  )
  UNION ALL
  (
    SELECT 
      id,
      'page_view' as event_type,
      '페이지 조회' as event_name,
      jsonb_build_object('page_path', page_path) as event_data,
      page_path,
      user_id,
      created_at
    FROM page_views
  )
  ORDER BY created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
$$;
