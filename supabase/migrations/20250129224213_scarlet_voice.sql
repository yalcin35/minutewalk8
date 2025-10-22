/*
  # Fix audit and profiles relationship

  1. Changes
    - Ensure proper indexes exist for performance
    - Update audit policies to use proper joins
    - Grant appropriate permissions

  2. Security
    - Maintain RLS policies
    - Grant appropriate permissions
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
GRANT SELECT ON profiles TO authenticated;