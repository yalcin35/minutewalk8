-- Create secure view for audit history
CREATE OR REPLACE VIEW audit_history AS
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
JOIN profiles p ON a.user_id = p.id
JOIN audit_setups aus ON a.setup_id = aus.id
JOIN sites s ON aus.site_id = s.id
JOIN departments d ON aus.department_id = d.id
WHERE EXISTS (
  SELECT 1 FROM profiles viewer
  WHERE viewer.id = auth.uid()
  AND viewer.company_id = a.company_id
);

-- Create index for better join performance
CREATE INDEX IF NOT EXISTS audit_history_filters_idx 
ON audits (company_id, setup_id);

-- Create function to get filtered audit history
CREATE OR REPLACE FUNCTION get_audit_history(
  p_site_id uuid DEFAULT NULL,
  p_department_id uuid DEFAULT NULL,
  p_audit_type text DEFAULT NULL
)
RETURNS SETOF audit_history
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT *
  FROM audit_history
  WHERE (p_site_id IS NULL OR site_id = p_site_id)
    AND (p_department_id IS NULL OR department_id = p_department_id)
    AND (p_audit_type IS NULL OR audit_type = p_audit_type)
  ORDER BY created_at DESC;
$$;

-- Grant necessary permissions
GRANT SELECT ON audit_history TO authenticated;
GRANT EXECUTE ON FUNCTION get_audit_history TO authenticated;