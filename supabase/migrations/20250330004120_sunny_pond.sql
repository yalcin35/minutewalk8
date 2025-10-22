/*
  # Update Audit Stats Function

  1. Changes
    - Add date range parameters to get_audit_stats function
    - Fix parameter handling and validation
    - Add proper date filtering
*/

-- Drop existing function
DROP FUNCTION IF EXISTS get_audit_stats;

-- Create updated function with date range parameters
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

  RETURN QUERY
  WITH audit_scores AS (
    SELECT
      audits.company_id,
      setups.site_id,
      setups.department_id,
      COUNT(DISTINCT audits.id)::bigint as total_audits,
      ROUND(AVG((audits.data->>'score')::numeric), 2) as avg_score,
      COUNT(DISTINCT CASE 
        WHEN (audits.data->>'critical_issues')::integer > 0 
        THEN audits.id 
      END)::bigint as critical_issues,
      COUNT(DISTINCT CASE 
        WHEN audits.created_at >= NOW() - INTERVAL '30 days' 
        THEN audits.id 
      END)::bigint as recent_audits
    FROM audits
    JOIN audit_setups setups ON audits.setup_id = setups.id
    WHERE 
      audits.company_id = p_company_id
      AND (p_site_id IS NULL OR setups.site_id = p_site_id)
      AND (p_department_id IS NULL OR setups.department_id = p_department_id)
      AND (
        p_start_date IS NULL 
        OR audits.created_at >= p_start_date
      )
      AND (
        p_end_date IS NULL 
        OR audits.created_at <= p_end_date
      )
    GROUP BY audits.company_id, setups.site_id, setups.department_id
  )
  SELECT 
    scores.company_id,
    scores.site_id,
    scores.department_id,
    scores.total_audits,
    scores.avg_score,
    scores.critical_issues,
    scores.recent_audits,
    NOW() as refreshed_at
  FROM audit_scores scores;
END;
$$ LANGUAGE plpgsql;