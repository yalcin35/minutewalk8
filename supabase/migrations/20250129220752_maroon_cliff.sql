/*
  # Create Secure Audit View

  1. Changes
    - Create secure view for audit submissions
    - Add index for better join performance
    - Update audit policies for proper access control

  2. Security
    - Maintain RLS through view definition
    - Grant appropriate permissions
*/

-- Create secure view for audit submissions
CREATE OR REPLACE VIEW audit_submissions AS
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

-- Update audit policies
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