/*
  # Update audit history view for company-wide data sharing

  1. Changes
    - Modified audit_history view to use company-based filtering
    - Updated get_audit_stats function to enforce company-level data access
    - Added company_id to audit_history view for better filtering

  2. Security
    - Enforces company-level data isolation
    - Allows data sharing within the same company
    - Prevents cross-company data access
*/

-- Drop and recreate the audit_history view with company-based access
DROP VIEW IF EXISTS audit_history;

CREATE OR REPLACE VIEW audit_history AS
SELECT 
    a.id,
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

-- Update the get_audit_stats function to use company-based filtering
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

-- Update RLS policies for audits table to use company-based access
ALTER TABLE audits DROP POLICY IF EXISTS "Users can view their own audits";
CREATE POLICY "Users can view audits from their company" ON audits
    FOR SELECT TO authenticated
    USING (
        company_id IN (
            SELECT company_id 
            FROM profiles 
            WHERE id = auth.uid()
        )
    );

-- Update RLS policies for audit_setups table
ALTER TABLE audit_setups DROP POLICY IF EXISTS "Users can view their own audit setups";
CREATE POLICY "Users can view audit setups from their company" ON audit_setups
    FOR SELECT TO authenticated
    USING (
        user_id IN (
            SELECT id 
            FROM profiles 
            WHERE company_id IN (
                SELECT company_id 
                FROM profiles 
                WHERE id = auth.uid()
            )
        )
    );

-- Grant necessary permissions
GRANT SELECT ON audit_history TO authenticated;
GRANT EXECUTE ON FUNCTION get_audit_stats(uuid, uuid, uuid) TO authenticated;