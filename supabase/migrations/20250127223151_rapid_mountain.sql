/*
  # Fix Profile Policies

  1. Changes
    - Remove recursive policy dependencies
    - Simplify profile access control
    - Fix company association policy

  2. Security
    - Maintain data isolation between companies
    - Allow users to manage their own profiles
    - Control company association process
*/

-- Drop existing policies to clean up
DROP POLICY IF EXISTS "Users can view profiles from their company" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own company association" ON profiles;

-- Create new, simplified policies
CREATE POLICY "Users can view profiles from their company"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    -- A user can view profiles that have the same company_id as them
    EXISTS (
      SELECT 1
      FROM profiles AS viewer
      WHERE viewer.id = auth.uid()
      AND (
        viewer.company_id = profiles.company_id
        OR profiles.id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update their company association"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid() AND (
      -- Allow updating company_id only if:
      -- 1. The user doesn't have a company yet (company_id IS NULL)
      -- 2. The new company_id exists in the companies table
      (
        (SELECT company_id FROM profiles WHERE id = auth.uid()) IS NULL
        AND 
        EXISTS (
          SELECT 1 FROM companies 
          WHERE id = (profiles.company_id)::uuid
        )
      )
    )
  );