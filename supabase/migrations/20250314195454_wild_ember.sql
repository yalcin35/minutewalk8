/*
  # Fix Audit Stats Function

  1. Changes
    - Fix ambiguous column reference in get_audit_stats function
    - Add proper table aliases
    - Improve query performance with proper joins
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
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
    AND p.company_id = COALESCE(p_company_id, p.company_id)
  ) THEN
    RETURN;
  END IF;

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
    (p_company_id IS NULL OR s.company_id = p_company_id)
    AND (p_site_id IS NULL OR s.site_id = p_site_id)
    AND (p_department_id IS NULL OR s.department_id = p_department_id);
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_audit_stats(uuid, uuid, uuid) TO authenticated;