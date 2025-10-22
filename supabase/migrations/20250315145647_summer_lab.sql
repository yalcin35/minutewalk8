/*
  # Fix Audit Stats Function

  1. Changes
    - Fix type mismatch in get_audit_stats function
    - Ensure consistent numeric types
    - Add proper type casting
*/

-- Drop existing function
DROP FUNCTION IF EXISTS get_audit_stats;

-- Create fixed function with proper type handling
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
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
    AND p.company_id = COALESCE(p_company_id, p.company_id)
  ) THEN
    RETURN;
  END IF;

  RETURN QUERY
  WITH audit_scores AS (
    SELECT
      a.company_id,
      s.id as site_id,
      d.id as department_id,
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
    LEFT JOIN audit_setups aus ON a.setup_id = aus.id
    LEFT JOIN sites s ON aus.site_id = s.id
    LEFT JOIN departments d ON aus.department_id = d.id
    WHERE 
      (p_company_id IS NULL OR a.company_id = p_company_id)
      AND (p_site_id IS NULL OR s.id = p_site_id)
      AND (p_department_id IS NULL OR d.id = p_department_id)
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
    NOW() as refreshed_at
  FROM audit_scores;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_audit_stats(uuid, uuid, uuid) TO authenticated;