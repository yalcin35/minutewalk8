-- Drop existing materialized view and related objects if they exist
DROP TRIGGER IF EXISTS refresh_audit_stats_trigger ON audits;
DROP FUNCTION IF EXISTS refresh_audit_stats();
DROP MATERIALIZED VIEW IF EXISTS audit_stats;
DROP VIEW IF EXISTS audit_history;

-- Create view for audit history that includes all necessary joins
CREATE VIEW audit_history AS
SELECT 
  a.id as audit_id,
  a.company_id,
  a.user_id,
  a.created_at,
  a.data,
  p.full_name,
  p.email,
  aus.site_id,
  aus.department_id,
  aus.audit_type,
  s.name as site_name,
  d.name as department_name
FROM audits a
LEFT JOIN audit_setups aus ON a.setup_id = aus.id
LEFT JOIN profiles p ON a.user_id = p.id
LEFT JOIN sites s ON aus.site_id = s.id
LEFT JOIN departments d ON aus.department_id = d.id;

-- Create materialized view for audit stats
CREATE MATERIALIZED VIEW audit_stats AS
WITH stats AS (
  SELECT
    a.company_id,
    s.id as site_id,
    d.id as department_id,
    COUNT(DISTINCT a.id) as total_audits,
    AVG((a.data->>'score')::numeric) as avg_score,
    COUNT(DISTINCT CASE 
      WHEN (a.data->>'critical_issues')::integer > 0 
      THEN a.id 
    END) as critical_issues,
    COUNT(DISTINCT CASE 
      WHEN a.created_at >= NOW() - INTERVAL '30 days' 
      THEN a.id 
    END) as recent_audits,
    -- Add a unique identifier for each row
    ROW_NUMBER() OVER (ORDER BY a.company_id, s.id, d.id) as row_id
  FROM audits a
  LEFT JOIN audit_setups aus ON a.setup_id = aus.id
  LEFT JOIN sites s ON aus.site_id = s.id
  LEFT JOIN departments d ON aus.department_id = d.id
  GROUP BY a.company_id, s.id, d.id
)
SELECT
  row_id,
  company_id,
  site_id,
  department_id,
  total_audits,
  ROUND(avg_score::numeric, 2) as avg_score,
  critical_issues,
  recent_audits,
  NOW() as refreshed_at
FROM stats;

-- Create a simple unique index on row_id
CREATE UNIQUE INDEX audit_stats_row_id_idx ON audit_stats (row_id);

-- Create composite index for filtering
CREATE INDEX audit_stats_composite_idx 
ON audit_stats (company_id, COALESCE(site_id, '00000000-0000-0000-0000-000000000000'::uuid), COALESCE(department_id, '00000000-0000-0000-0000-000000000000'::uuid));

-- Create secure wrapper function to access stats
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
    SELECT 1 FROM profiles 
    WHERE id = auth.uid()
    AND company_id = COALESCE(p_company_id, company_id)
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

-- Create refresh function
CREATE FUNCTION refresh_audit_stats()
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

-- Grant necessary permissions
REVOKE ALL ON audit_stats FROM public, authenticated;
GRANT SELECT ON audit_history TO authenticated;
GRANT EXECUTE ON FUNCTION get_audit_stats(uuid, uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION refresh_audit_stats() TO authenticated;