/*
  # Fix Audit Stats Function

  1. Changes
    - Fix ambiguous column reference in get_audit_stats function
    - Add proper table aliases
    - Improve query performance with proper joins
    - Fix type casting issues
*/

-- Drop existing function
DROP FUNCTION IF EXISTS get_audit_stats;

-- Create fixed function with proper table aliases
CREATE OR REPLACE FUNCTION get_audit_stats(
  p_company_id uuid DEFAULT NULL,
  p_site_id uuid DEFAULT NULL,
  p_department_id uuid DEFAULT NULL
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
    AND viewer.company_id = COALESCE(p_company_id, viewer.company_id)
  ) THEN
    RETURN;
  END IF;

  RETURN QUERY
  WITH audit_scores AS (
    SELECT
      a.company_id,
      aus.site_id,
      aus.department_id,
      COUNT(DISTINCT a.id)::bigint as total_audits,
      ROUND(AVG((a.data->>'score')::numeric), 2) as avg_score,
      COUNT(DISTINCT CASE 
        WHEN (a.data->>'critical_issues')::integer > 0 
        THEN a.id 
      END)::bigint as critical_issues,
      COUNT(DISTINCT CASE 
        WHEN a.created_at >= NOW() - INTERVAL '30 days' 
        THEN a.id 
      END)::bigint as recent_audits
    FROM audits a
    JOIN audit_setups aus ON a.setup_id = aus.id
    WHERE 
      (p_company_id IS NULL OR a.company_id = p_company_id)
      AND (p_site_id IS NULL OR aus.site_id = p_site_id)
      AND (p_department_id IS NULL OR aus.department_id = p_department_id)
    GROUP BY a.company_id, aus.site_id, aus.department_id
  )
  SELECT 
    company_id,
    site_id,
    department_id,
    total_audits,
    avg_score,
    critical_issues,
    recent_audits,
    NOW() as refreshed_at
  FROM audit_scores;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_audit_stats(uuid, uuid, uuid) TO authenticated;