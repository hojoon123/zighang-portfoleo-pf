-- job_postings 테이블과 job_categories 테이블 간의 관계 설정
-- 기존 category 컬럼을 job_categories 테이블의 name과 연결

-- 1. 먼저 job_postings 테이블에 category_id 컬럼 추가 (nullable)
ALTER TABLE job_postings 
ADD COLUMN category_id uuid REFERENCES job_categories(id);

-- 2. 기존 category 값을 기반으로 category_id 업데이트
UPDATE job_postings 
SET category_id = jc.id 
FROM job_categories jc 
WHERE job_postings.category = jc.name;

-- 3. 향후 일관성을 위해 category 컬럼을 유지하되, 
--    job_categories 테이블의 name과 동기화되도록 트리거 생성
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

-- 4. job_categories 테이블 업데이트 시에도 job_postings 동기화
CREATE OR REPLACE FUNCTION sync_job_postings_category()
RETURNS TRIGGER AS $$
BEGIN
  -- job_categories의 name이 변경되면 관련 job_postings도 업데이트
  IF OLD.name != NEW.name THEN
    UPDATE job_postings 
    SET category = NEW.name 
    WHERE category_id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS sync_job_postings_category_trigger ON job_categories;
CREATE TRIGGER sync_job_postings_category_trigger
  AFTER UPDATE ON job_categories
  FOR EACH ROW
  EXECUTE FUNCTION sync_job_postings_category();
