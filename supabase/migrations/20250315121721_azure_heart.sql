/*
  # Add Percentage-Based Scoring System

  1. Changes
    - Add function to calculate percentage score
    - Add validation to ensure score stays within 0-100%
    - Update audit stats view to include percentage scores

  2. Purpose
    - Standardize scoring across all walk types
    - Provide clear percentage-based metrics
    - Ensure consistent score calculations
*/

-- Create function to calculate percentage score
CREATE OR REPLACE FUNCTION calculate_percentage_score(
  total_points numeric,
  max_possible_points numeric DEFAULT 125
)
RETURNS numeric
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Validate inputs
  IF total_points < 0 THEN
    RETURN 0;
  END IF;
  
  IF total_points > max_possible_points THEN
    RETURN 100;
  END IF;
  
  -- Calculate percentage and round to nearest whole number
  RETURN ROUND((total_points / max_possible_points * 100)::numeric);
END;
$$;

-- Update audit_stats materialized view to include percentage scores
DROP MATERIALIZED VIEW IF EXISTS audit_stats;
CREATE MATERIALIZED VIEW audit_stats AS
WITH stats AS (
  SELECT
    a.company_id,
    s.id as site_id,
    d.id as department_id,
    COUNT(DISTINCT a.id) as total_audits,
    AVG((a.data->>'score')::numeric) as raw_score,
    calculate_percentage_score(
      SUM((a.data->>'score')::numeric),
      COUNT(DISTINCT a.id) * 125 -- max possible points per audit
    ) as avg_score,
    COUNT(DISTINCT CASE 
      WHEN (a.data->>'critical_issues')::integer > 0 
      THEN a.id 
    END) as critical_issues,
    COUNT(DISTINCT CASE 
      WHEN a.created_at >= NOW() - INTERVAL '30 days' 
      THEN a.id 
    END) as recent_audits,
    MD5(
      COALESCE(a.company_id::text, '') || ',' ||
      COALESCE(s.id::text, '') || ',' ||
      COALESCE(d.id::text, '')
    )::uuid as stats_id
  FROM audits a
  LEFT JOIN audit_setups aus ON a.setup_id = aus.id
  LEFT JOIN sites s ON aus.site_id = s.id
  LEFT JOIN departments d ON aus.department_id = d.id
  GROUP BY a.company_id, s.id, d.id
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

-- Create index on stats_id
CREATE UNIQUE INDEX audit_stats_id_idx ON audit_stats (stats_id);

-- Create composite index for filtering
CREATE INDEX audit_stats_composite_idx 
ON audit_stats (company_id, site_id, department_id);

-- Create function to refresh stats
CREATE OR REPLACE FUNCTION refresh_audit_stats()
RETURNS trigger AS $$
BEGIN
  REFRESH MATERIALIZED VIEW audit_stats;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to refresh stats
DROP TRIGGER IF EXISTS refresh_audit_stats_trigger ON audits;
CREATE TRIGGER refresh_audit_stats_trigger
AFTER INSERT OR UPDATE OR DELETE ON audits
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_audit_stats();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION calculate_percentage_score TO authenticated;
REVOKE ALL ON audit_stats FROM public, authenticated;
GRANT SELECT ON audit_stats TO authenticated;
GRANT EXECUTE ON FUNCTION refresh_audit_stats TO authenticated;