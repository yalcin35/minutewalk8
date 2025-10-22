/*
  # Fix Audit Score Calculation

  1. Changes
    - Add function to calculate percentage score correctly
    - Update audit stats calculation to use the new function
    - Fix score display in audit history view

  2. Purpose
    - Ensure consistent score calculation across all audit types
    - Fix percentage display in calendar views
*/

-- Create function to calculate percentage score
CREATE OR REPLACE FUNCTION calculate_audit_score(
  total_points numeric,
  total_questions numeric DEFAULT 25
)
RETURNS numeric
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  max_possible_points numeric;
BEGIN
  -- Validate inputs
  IF total_points IS NULL OR total_questions IS NULL OR total_questions <= 0 THEN
    RETURN 0;
  END IF;

  -- Calculate max possible points (5 points per question)
  max_possible_points := total_questions * 5;
  
  -- Calculate percentage
  RETURN ROUND((total_points / max_possible_points * 100)::numeric, 2);
END;
$$;

-- Update audit_history view to use correct score calculation
CREATE OR REPLACE VIEW audit_history AS
SELECT 
  a.id as audit_id,
  a.company_id,
  a.user_id,
  a.created_at,
  jsonb_set(
    a.data,
    '{score}',
    to_jsonb(
      calculate_audit_score(
        (
          SELECT SUM((answer->>'rating')::numeric)
          FROM jsonb_array_elements(a.data->'answers') as answer
        ),
        (
          SELECT COUNT(*)
          FROM jsonb_array_elements(a.data->'answers')
        )
      )
    )
  ) as data,
  p.full_name,
  p.email,
  aus.site_id,
  aus.department_id,
  aus.audit_type,
  s.name as site_name,
  d.name as department_name
FROM audits a
JOIN profiles p ON a.user_id = p.id
JOIN audit_setups aus ON a.setup_id = aus.id
JOIN sites s ON aus.site_id = s.id
JOIN departments d ON aus.department_id = d.id
WHERE EXISTS (
  SELECT 1 FROM profiles viewer
  WHERE viewer.id = auth.uid()
  AND viewer.company_id = a.company_id
);

-- Update audit_stats view to use correct score calculation
DROP MATERIALIZED VIEW IF EXISTS audit_stats;
CREATE MATERIALIZED VIEW audit_stats AS
WITH audit_scores AS (
  SELECT
    a.company_id,
    aus.site_id,
    aus.department_id,
    a.id as audit_id,
    calculate_audit_score(
      (
        SELECT SUM((answer->>'rating')::numeric)
        FROM jsonb_array_elements(a.data->'answers') as answer
      ),
      (
        SELECT COUNT(*)
        FROM jsonb_array_elements(a.data->'answers')
      )
    ) as score,
    (
      SELECT COUNT(*)
      FROM jsonb_array_elements(a.data->'answers') as answer
      WHERE (answer->>'rating')::numeric <= 2
    ) as critical_issues,
    a.created_at
  FROM audits a
  JOIN audit_setups aus ON a.setup_id = aus.id
  WHERE a.data ? 'answers'
),
stats AS (
  SELECT
    company_id,
    site_id,
    department_id,
    COUNT(DISTINCT audit_id) as total_audits,
    ROUND(AVG(score), 2) as avg_score,
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
  GROUP BY company_id, site_id, department_id
)
SELECT
  company_id,
  site_id,
  department_id,
  total_audits,
  avg_score,
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

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION calculate_audit_score TO authenticated;
REVOKE ALL ON audit_stats FROM public, authenticated;
GRANT SELECT ON audit_stats TO authenticated;
GRANT EXECUTE ON FUNCTION refresh_audit_stats TO authenticated;