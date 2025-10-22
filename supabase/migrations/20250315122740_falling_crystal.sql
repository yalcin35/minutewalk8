/*
  # Fix Audit Stats Calculation

  1. Changes
    - Add proper NULL and zero handling in percentage calculation
    - Improve error handling in materialized view
    - Fix division by zero issues
    - Add better validation for inputs

  2. Security
    - Maintain existing permissions
    - Keep RLS policies intact
*/

-- Create function to calculate percentage score with proper error handling
CREATE OR REPLACE FUNCTION calculate_audit_percentage(
  points numeric,
  question_count numeric DEFAULT 25
)
RETURNS numeric
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Handle NULL or invalid inputs
  IF points IS NULL OR question_count IS NULL OR question_count <= 0 THEN
    RETURN 0;
  END IF;

  -- Calculate max possible points (questions × 5 points each)
  DECLARE
    max_points numeric := GREATEST(question_count * 5, 1); -- Ensure never zero
  BEGIN
    -- Validate input
    IF points < 0 THEN
      RETURN 0;
    END IF;
    
    IF points > max_points THEN
      RETURN 100;
    END IF;
    
    -- Calculate percentage and round to nearest whole number
    RETURN ROUND((points / max_points * 100)::numeric);
  END;
END;
$$;

-- Update audit_stats view to use percentage scoring with proper NULL handling
DROP MATERIALIZED VIEW IF EXISTS audit_stats;
CREATE MATERIALIZED VIEW audit_stats AS
WITH audit_scores AS (
  SELECT
    a.company_id,
    s.id as site_id,
    d.id as department_id,
    a.id as audit_id,
    -- Calculate total points from answers with NULL handling
    COALESCE((
      SELECT SUM(COALESCE((answer->>'rating')::numeric, 0))
      FROM jsonb_array_elements(COALESCE(a.data->'answers', '[]'::jsonb)) as answer
    ), 0) as total_points,
    -- Count number of questions answered
    COALESCE((
      SELECT COUNT(*)::numeric
      FROM jsonb_array_elements(COALESCE(a.data->'answers', '[]'::jsonb)) as answer
      WHERE answer->>'rating' IS NOT NULL
    ), 0) as questions_answered,
    -- Count critical issues (ratings of 1 or 2)
    COALESCE((
      SELECT COUNT(*)
      FROM jsonb_array_elements(COALESCE(a.data->'answers', '[]'::jsonb)) as answer
      WHERE COALESCE((answer->>'rating')::numeric, 0) <= 2
    ), 0) as critical_issues,
    a.created_at
  FROM audits a
  LEFT JOIN audit_setups aus ON a.setup_id = aus.id
  LEFT JOIN sites s ON aus.site_id = s.id
  LEFT JOIN departments d ON aus.department_id = d.id
  WHERE a.data IS NOT NULL -- Skip audits with NULL data
),
stats AS (
  SELECT
    company_id,
    site_id,
    department_id,
    COUNT(DISTINCT audit_id) as total_audits,
    -- Calculate average percentage score only for valid audits
    ROUND(AVG(
      CASE 
        WHEN questions_answered > 0 
        THEN calculate_audit_percentage(total_points, questions_answered)
        ELSE 0
      END
    )::numeric, 2) as avg_score,
    SUM(critical_issues) as critical_issues,
    COUNT(DISTINCT CASE 
      WHEN created_at >= NOW() - INTERVAL '30 days' 
      THEN audit_id 
    END) as recent_audits,
    MD5(
      COALESCE(company_id::text, '') || ',' ||
      COALESCE(site_id::text, '') || ',' ||
      COALESCE(department_id::text, '')
    )::uuid as stats_id
  FROM audit_scores
  WHERE questions_answered > 0 -- Only include audits with answers
  GROUP BY company_id, site_id, department_id
)
SELECT
  company_id,
  site_id,
  department_id,
  total_audits,
  COALESCE(avg_score, 0) as avg_score, -- Ensure score is never NULL
  critical_issues,
  recent_audits,
  NOW() as refreshed_at,
  stats_id
FROM stats;

-- Create indexes
CREATE UNIQUE INDEX audit_stats_id_idx ON audit_stats (stats_id);
CREATE INDEX audit_stats_composite_idx ON audit_stats (company_id, site_id, department_id);

-- Create refresh function
CREATE OR REPLACE FUNCTION refresh_audit_stats()
RETURNS trigger AS $$
BEGIN
  REFRESH MATERIALIZED VIEW audit_stats;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS refresh_audit_stats_trigger ON audits;
CREATE TRIGGER refresh_audit_stats_trigger
AFTER INSERT OR UPDATE OR DELETE ON audits
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_audit_stats();

-- Grant permissions
GRANT EXECUTE ON FUNCTION calculate_audit_percentage TO authenticated;
REVOKE ALL ON audit_stats FROM public, authenticated;
GRANT SELECT ON audit_stats TO authenticated;
GRANT EXECUTE ON FUNCTION refresh_audit_stats TO authenticated;