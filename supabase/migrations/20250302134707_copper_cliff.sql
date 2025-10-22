/*
  # Add audit duration tracking

  1. Changes
    - Add start_time column to audit_setups table
    - Update audit data schema to include duration_seconds
  
  2. Purpose
    - Enable tracking of how long audits take to complete
    - Support timer functionality in the UI
*/

-- Add start_time to audit_setups if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'audit_setups' AND column_name = 'start_time'
  ) THEN
    ALTER TABLE audit_setups ADD COLUMN start_time timestamptz DEFAULT now();
  END IF;
END $$;

-- Create function to get audit duration statistics
CREATE OR REPLACE FUNCTION get_audit_duration_stats(
  p_company_id uuid DEFAULT NULL,
  p_site_id uuid DEFAULT NULL,
  p_department_id uuid DEFAULT NULL,
  p_days_back integer DEFAULT 30
)
RETURNS TABLE (
  avg_duration_seconds numeric,
  min_duration_seconds integer,
  max_duration_seconds integer,
  total_audits bigint
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
    ROUND(AVG((a.data->>'duration_seconds')::numeric), 2) as avg_duration_seconds,
    MIN((a.data->>'duration_seconds')::integer) as min_duration_seconds,
    MAX((a.data->>'duration_seconds')::integer) as max_duration_seconds,
    COUNT(a.id) as total_audits
  FROM audits a
  JOIN audit_setups aus ON a.setup_id = aus.id
  WHERE 
    a.created_at >= NOW() - (p_days_back || ' days')::interval
    AND (p_company_id IS NULL OR a.company_id = p_company_id)
    AND (p_site_id IS NULL OR aus.site_id = p_site_id)
    AND (p_department_id IS NULL OR aus.department_id = p_department_id)
    AND (a.data->>'duration_seconds') IS NOT NULL;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_audit_duration_stats(uuid, uuid, uuid, integer) TO authenticated;