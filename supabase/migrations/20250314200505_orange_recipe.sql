-- Drop existing function
DROP FUNCTION IF EXISTS get_audit_stats;

-- Create fixed function with proper table aliases and date filtering
CREATE OR REPLACE FUNCTION get_audit_stats(
  p_company_id uuid DEFAULT NULL,
  p_site_id uuid DEFAULT NULL,
  p_department_id uuid DEFAULT NULL,
  p_start_date timestamptz DEFAULT (NOW() - INTERVAL '30 days'),
  p_end_date timestamptz DEFAULT NOW()
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
  WITH filtered_audits AS (
    SELECT 
      a.id,
      a.company_id,
      aus.site_id,
      aus.department_id,
      a.data,
      a.created_at
    FROM audits a
    JOIN audit_setups aus ON a.setup_id = aus.id
    WHERE 
      (p_company_id IS NULL OR a.company_id = p_company_id)
      AND (p_site_id IS NULL OR aus.site_id = p_site_id)
      AND (p_department_id IS NULL OR aus.department_id = p_department_id)
      AND a.created_at >= p_start_date
      AND a.created_at <= p_end_date
  )
  SELECT 
    fa.company_id,
    fa.site_id,
    fa.department_id,
    COUNT(DISTINCT fa.id) as total_audits,
    ROUND(AVG((fa.data->>'score')::numeric), 2) as avg_score,
    COUNT(DISTINCT CASE 
      WHEN (fa.data->>'critical_issues')::integer > 0 
      THEN fa.id 
    END) as critical_issues,
    COUNT(DISTINCT CASE 
      WHEN fa.created_at >= NOW() - INTERVAL '7 days'
      THEN fa.id 
    END) as recent_audits,
    NOW() as refreshed_at
  FROM filtered_audits fa
  GROUP BY fa.company_id, fa.site_id, fa.department_id;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_audit_stats(uuid, uuid, uuid, timestamptz, timestamptz) TO authenticated;