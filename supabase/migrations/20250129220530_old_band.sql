/*
  # Update Audit Profile Relationship

  1. Changes
    - Add index for better join performance
    - Update audit policies to include profile relationship
    - Grant necessary permissions

  2. Security
    - Maintain existing RLS policies
    - Ensure proper access control through profiles
*/

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

-- Update audit policies to include profile relationship
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
GRANT SELECT ON profiles TO authenticated;