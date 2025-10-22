/*
  # Fix profiles policies

  1. Changes
    - Remove recursive policies that were causing infinite recursion
    - Simplify profile viewing and updating policies
    - Add proper company association policy

  2. Security
    - Maintain row-level security
    - Ensure users can only view/edit their own profile
    - Allow initial company association
*/

-- Drop existing policies to clean up
DROP POLICY IF EXISTS "Users can view profiles from their company" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their company association" ON profiles;
DROP POLICY IF EXISTS "Users can update their username" ON profiles;

-- Create new, simplified policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Policy for initial company association
CREATE POLICY "Users can set initial company"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid() AND
    company_id IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM companies WHERE id = company_id
    ) AND
    NOT EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND company_id IS NOT NULL
    )
  );