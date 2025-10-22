/*
  # Add HSE Walk support

  1. New Features
    - Enable HSE Walk type in audit_setups
    - Add support for HSE-specific questions and categories
  
  2. Purpose
    - Support Health, Safety, and Environment (HSE) audits
    - Maintain compatibility with existing audit structure
*/

-- Update audit_type validation if needed
DO $$ 
BEGIN
  -- No schema changes needed as audit_type is already a text field
  -- This migration is for documentation purposes
  
  -- Insert a sample HSE audit if none exists
  IF NOT EXISTS (
    SELECT 1 FROM audits a
    JOIN audit_setups s ON a.setup_id = s.id
    WHERE s.audit_type = 'hse'
  ) THEN
    -- This is just a placeholder - actual data will be created through the UI
    NULL;
  END IF;
END $$;

-- Create index for HSE audits if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'audit_setups' 
    AND indexname = 'audit_setups_audit_type_idx'
  ) THEN
    CREATE INDEX audit_setups_audit_type_idx ON audit_setups(audit_type);
  END IF;
END $$;

-- Create function to get HSE-specific statistics
CREATE OR REPLACE FUNCTION get_hse_stats(
  p_company_id uuid DEFAULT NULL,
  p_site_id uuid DEFAULT NULL,
  p_department_id uuid DEFAULT NULL,
  p_days_back integer DEFAULT 30
)
RETURNS TABLE (
  avg_score numeric,
  critical_issues bigint,
  total_audits bigint,
  compliance_rate numeric
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
    ROUND(AVG((a.data->>'score')::numeric), 2) as avg_score,
    COUNT(DISTINCT CASE WHEN (a.data->>'critical_issues')::integer > 0 THEN a.id END) as critical_issues,
    COUNT(DISTINCT a.id) as total_audits,
    -- Calculate compliance rate (percentage of scores >= 4)
    ROUND(
      (COUNT(DISTINCT CASE WHEN (a.data->>'score')::numeric >= 4 THEN a.id END)::numeric / 
       NULLIF(COUNT(DISTINCT a.id), 0)::numeric) * 100, 
      2
    ) as compliance_rate
  FROM audits a
  JOIN audit_setups aus ON a.setup_id = aus.id
  WHERE 
    aus.audit_type = 'hse'
    AND a.created_at >= NOW() - (p_days_back || ' days')::interval
    AND (p_company_id IS NULL OR a.company_id = p_company_id)
    AND (p_site_id IS NULL OR aus.site_id = p_site_id)
    AND (p_department_id IS NULL OR aus.department_id = p_department_id);
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_hse_stats(uuid, uuid, uuid, integer) TO authenticated;