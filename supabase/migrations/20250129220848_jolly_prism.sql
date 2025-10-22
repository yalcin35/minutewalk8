/*
  # Fix Audit-Profile Relationship

  1. Changes
    - Create secure view for audit submissions with proper joins
    - Update audit policies for proper access control
    - Add necessary indexes for performance
    - Grant appropriate permissions

  2. Security
    - Maintain RLS through view definition
    - Grant minimal required permissions
*/

-- Drop existing view if it exists
DROP VIEW IF EXISTS audit_submissions;

-- Create secure view for audit submissions with proper joins
CREATE VIEW audit_submissions AS
SELECT 
  a.id,
  a.company_id,
  a.user_id,
  a.created_at,
  a.data,
  p.full_name,
  p.email
FROM audits a
JOIN auth.users u ON a.user_id = u.id
JOIN profiles p ON u.id = p.id
WHERE EXISTS (
  SELECT 1 FROM profiles viewer
  WHERE viewer.id = auth.uid()
  AND viewer.company_id = a.company_id
);

-- Add index for better join performance if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'audits' 
    AND indexname = 'audits_user_id_idx'
  ) THEN
    CREATE INDEX audits_user_id_idx ON audits(user_id);
  END IF;
END $$;

-- Update audit policies to use proper joins
DROP POLICY IF EXISTS "Users can view audits from their company" ON audits;
CREATE POLICY "Users can view audits from their company"
ON audits
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.company_id = audits.company_id
  )
);

-- Grant necessary permissions
GRANT SELECT ON audit_submissions TO authenticated;
GRANT SELECT ON profiles TO authenticated;