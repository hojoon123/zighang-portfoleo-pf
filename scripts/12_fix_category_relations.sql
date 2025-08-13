-- job_postings와 job_categories 테이블 간의 관계 설정 (타입 호환성 수정)

-- 1. job_categories 테이블의 id 타입을 확인하고 job_postings에 맞는 타입으로 category_id 추가
-- job_categories.id가 text 타입이므로 text 타입으로 category_id 추가
ALTER TABLE job_postings 
ADD COLUMN IF NOT EXISTS category_id text REFERENCES job_categories(id);

-- 2. 기존 category 값을 기반으로 category_id 업데이트
UPDATE job_postings 
SET category_id = jc.id 
FROM job_categories jc 
WHERE job_postings.category = jc.name;

-- 3. 매칭되지 않는 category 값들 확인 및 처리
-- 먼저 매칭되지 않는 카테고리들을 job_categories 테이블에 추가
INSERT INTO job_categories (id, name, icon, color, display_order, is_active)
SELECT 
  LOWER(REPLACE(REPLACE(category, '·', '-'), ' ', '-')) as id,
  category as name,
  '📋' as icon,
  'rgb(107, 114, 128)' as color,
  999 as display_order,
  true as is_active
FROM (
  SELECT DISTINCT category 
  FROM job_postings 
  WHERE category NOT IN (SELECT name FROM job_categories)
  AND category IS NOT NULL
) missing_categories;

-- 4. 다시 category_id 업데이트
UPDATE job_postings 
SET category_id = jc.id 
FROM job_categories jc 
WHERE job_postings.category = jc.name
AND job_postings.category_id IS NULL;

-- 5. 향후 일관성을 위한 트리거 생성
CREATE OR REPLACE FUNCTION sync_job_category()
RETURNS TRIGGER AS $$
BEGIN
  -- INSERT 또는 UPDATE 시 category_id가 있으면 해당 name으로 category 업데이트
  IF NEW.category_id IS NOT NULL THEN
    SELECT name INTO NEW.category 
    FROM job_categories 
    WHERE id = NEW.category_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS sync_job_category_trigger ON job_postings;
CREATE TRIGGER sync_job_category_trigger
  BEFORE INSERT OR UPDATE ON job_postings
  FOR EACH ROW
  EXECUTE FUNCTION sync_job_category();
