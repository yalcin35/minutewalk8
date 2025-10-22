/*
  # Fix Security Definer Views

  1. Changes
    - Convert all views from SECURITY DEFINER to SECURITY INVOKER
    - Affected views:
      - audit_submissions
      - daily_checkin_details
      - audit_history
      - checkin_details
    
  2. Security
    - Views will now use the permissions of the querying user
    - Maintains existing RLS policies
    - Resolves security warnings in Supabase
*/

-- Fix audit_submissions view
CREATE OR REPLACE VIEW audit_submissions 
WITH (security_invoker = on)
AS
SELECT 
  a.id,
  a.company_id,
  a.user_id,
  a.created_at,
  a.data,
  p.full_name,
  p.email
FROM audits a
JOIN profiles p ON a.user_id = p.id
WHERE EXISTS (
  SELECT 1 FROM profiles viewer
  WHERE viewer.id = auth.uid()
  AND viewer.company_id = a.company_id
);

-- Fix daily_checkin_details view
CREATE OR REPLACE VIEW daily_checkin_details 
WITH (security_invoker = on)
AS
SELECT 
  dc.*,
  p.full_name as creator_name,
  p.email as creator_email
FROM daily_checkins dc
JOIN profiles p ON dc.created_by = p.id
WHERE EXISTS (
  SELECT 1 FROM profiles viewer
  WHERE viewer.id = auth.uid()
  AND viewer.company_id = dc.company_id
);

-- Fix audit_history view
CREATE OR REPLACE VIEW audit_history 
WITH (security_invoker = on)
AS
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

-- Fix checkin_details view
CREATE OR REPLACE VIEW checkin_details 
WITH (security_invoker = on)
AS
SELECT 
  dc.id,
  dc.company_id,
  dc.site_id,
  dc.department_id,
  dc.created_by,
  dc.shift_date,
  dc.shift_type,
  dc.start_time,
  dc.end_time,
  dc.notes,
  dc.created_at,
  dc.updated_at,
  p.full_name as creator_name,
  p.email as creator_email,
  s.name as site_name,
  d.name as department_name,
  (
    SELECT jsonb_agg(
      jsonb_build_object(
        'category', cc.category,
        'status', cc.status,
        'notes', cc.notes,
        'created_at', cc.created_at
      )
    )
    FROM checkin_categories cc
    WHERE cc.checkin_id = dc.id
  ) as categories,
  (
    SELECT jsonb_agg(
      jsonb_build_object(
        'category', ca.category,
        'description', ca.description,
        'status', ca.status,
        'priority', ca.priority
      )
    )
    FROM checkin_actions ca
    WHERE ca.checkin_id = dc.id
  ) as actions
FROM daily_checkins dc
JOIN profiles p ON dc.created_by = p.id
JOIN sites s ON dc.site_id = s.id
JOIN departments d ON dc.department_id = d.id
WHERE EXISTS (
  SELECT 1 FROM profiles viewer
  WHERE viewer.id = auth.uid()
  AND viewer.company_id = dc.company_id
);

-- Grant necessary permissions
GRANT SELECT ON audit_submissions TO authenticated;
GRANT SELECT ON daily_checkin_details TO authenticated;
GRANT SELECT ON audit_history TO authenticated;
GRANT SELECT ON checkin_details TO authenticated;