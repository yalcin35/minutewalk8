/*
  # Fix Audit Score Calculation

  1. Changes
    - Create a standardized function to calculate percentage scores
    - Update audit_history view to use the new calculation
    - Update audit_stats materialized view to use the new calculation
    - Ensure consistent scoring across all audit types

  2. Purpose
    - Standardize scoring across all walk types (5S, HSE, MHE, Gemba)
    - Each walk has 25 questions with 5 possible points each (max 125 points)
    - Convert raw points to percentage (e.g., 100 points = 80%)
    - Ensure all UI components display consistent scores
*/

-- Create a standardized function to calculate percentage scores
CREATE OR REPLACE FUNCTION calculate_percentage_score(
  total_points numeric,
  max_possible_points numeric DEFAULT 125
)
RETURNS numeric
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  percentage numeric;
BEGIN
  -- Handle null or invalid inputs
  IF total_points IS NULL OR max_possible_points IS NULL OR max_possible_points <= 0 THEN
    RETURN 0;
  END IF;
  
  -- Calculate percentage (125 points = 100%)
  percentage := (total_points / max_possible_points) * 100;
  
  -- Round to 1 decimal place
  RETURN ROUND(percentage, 1);
END;
$$;

-- Update audit_history view to use the new calculation
CREATE OR REPLACE VIEW audit_history 
WITH (security_invoker = on)
AS
SELECT 
  a.id as audit_id,
  a.company_id,
  a.user_id,
  a.created_at,
  jsonb_set(
    a.data,
    '{score}',
    to_jsonb(
      calculate_percentage_score(
        (
          SELECT COALESCE(SUM((answer->>'rating')::numeric), 0)
          FROM jsonb_array_elements(COALESCE(a.data->'answers', '[]'::jsonb)) as answer
        ),
        (
          SELECT COUNT(*) * 5
          FROM jsonb_array_elements(COALESCE(a.data->'answers', '[]'::jsonb))
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

-- Drop existing materialized view and related objects
DROP TRIGGER IF EXISTS refresh_audit_stats_trigger ON audits;
DROP FUNCTION IF EXISTS refresh_audit_stats();
DROP MATERIALIZED VIEW IF EXISTS audit_stats;

-- Create updated audit_stats materialized view with correct percentage calculation
CREATE MATERIALIZED VIEW audit_stats AS
WITH audit_scores AS (
  SELECT
    a.company_id,
    aus.site_id,
    aus.department_id,
    a.id as audit_id,
    -- Calculate total points from answers
    (
      SELECT COALESCE(SUM((answer->>'rating')::numeric), 0)
      FROM jsonb_array_elements(COALESCE(a.data->'answers', '[]'::jsonb)) as answer
    ) as total_points,
    -- Count number of questions answered
    (
      SELECT COUNT(*)
      FROM jsonb_array_elements(COALESCE(a.data->'answers', '[]'::jsonb))
    ) as question_count,
    -- Count critical issues (ratings of 1 or 2)
    (
      SELECT COUNT(*)
      FROM jsonb_array_elements(COALESCE(a.data->'answers', '[]'::jsonb)) as answer
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
    -- Calculate average percentage score
    ROUND(AVG(
      calculate_percentage_score(total_points, question_count * 5)
    ), 1) as avg_score,
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

-- Create index for better performance
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

-- Create trigger to refresh stats
CREATE TRIGGER refresh_audit_stats_trigger
AFTER INSERT OR UPDATE OR DELETE ON audits
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_audit_stats();

-- Update get_audit_stats function to use the new calculation
CREATE OR REPLACE FUNCTION get_audit_stats(
  p_company_id uuid,
  p_site_id uuid DEFAULT NULL,
  p_department_id uuid DEFAULT NULL,
  p_start_date timestamptz DEFAULT NULL,
  p_end_date timestamptz DEFAULT NULL
)
RETURNS TABLE (
  company_id uuid,
  site_id uuid,
  department_id uuid,
  total_audits bigint,
  avg_score numeric,
  critical_issues bigint,
  recent_audits bigint,
  refreshed_at timestamp with time zone
) 
SECURITY DEFINER
AS $$
BEGIN
  -- Check if user has access to the requested company
  IF NOT EXISTS (
    SELECT 1 FROM profiles viewer
    WHERE viewer.id = auth.uid()
    AND viewer.company_id = p_company_id
  ) THEN
    RETURN;
  END IF;

  -- If date filters are provided, calculate stats directly
  IF p_start_date IS NOT NULL OR p_end_date IS NOT NULL THEN
    RETURN QUERY
    WITH audit_scores AS (
      SELECT
        audits.company_id,
        setups.site_id,
        setups.department_id,
        audits.id as audit_id,
        -- Calculate total points
        (
          SELECT COALESCE(SUM((answer->>'rating')::numeric), 0)
          FROM jsonb_array_elements(COALESCE(audits.data->'answers', '[]'::jsonb)) as answer
        ) as total_points,
        -- Count questions
        (
          SELECT COUNT(*)
          FROM jsonb_array_elements(COALESCE(audits.data->'answers', '[]'::jsonb))
        ) as question_count,
        -- Count critical issues
        (
          SELECT COUNT(*)
          FROM jsonb_array_elements(COALESCE(audits.data->'answers', '[]'::jsonb)) as answer
          WHERE (answer->>'rating')::numeric <= 2
        ) as critical_issues,
        audits.created_at
      FROM audits
      JOIN audit_setups setups ON audits.setup_id = setups.id
      WHERE 
        audits.company_id = p_company_id
        AND (p_site_id IS NULL OR setups.site_id = p_site_id)
        AND (p_department_id IS NULL OR setups.department_id = p_department_id)
        AND (p_start_date IS NULL OR audits.created_at >= p_start_date)
        AND (p_end_date IS NULL OR audits.created_at <= p_end_date)
    )
    SELECT 
      p_company_id,
      p_site_id,
      p_department_id,
      COUNT(DISTINCT audit_id)::bigint as total_audits,
      ROUND(AVG(
        calculate_percentage_score(total_points, question_count * 5)
      ), 1) as avg_score,
      SUM(critical_issues)::bigint as critical_issues,
      COUNT(DISTINCT CASE 
        WHEN created_at >= NOW() - INTERVAL '30 days' 
        THEN audit_id 
      END)::bigint as recent_audits,
      NOW() as refreshed_at
    FROM audit_scores;
  ELSE
    -- Otherwise use the materialized view for better performance
    RETURN QUERY
    SELECT 
      s.company_id,
      s.site_id,
      s.department_id,
      s.total_audits,
      s.avg_score,
      s.critical_issues,
      s.recent_audits,
      s.refreshed_at
    FROM audit_stats s
    WHERE 
      s.company_id = p_company_id
      AND (p_site_id IS NULL OR s.site_id = p_site_id)
      AND (p_department_id IS NULL OR s.department_id = p_department_id);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION calculate_percentage_score TO authenticated;
GRANT SELECT ON audit_stats TO authenticated;
GRANT EXECUTE ON FUNCTION refresh_audit_stats TO authenticated;
GRANT EXECUTE ON FUNCTION get_audit_stats TO authenticated;