/*
  # Enhance Security Policies

  1. Changes
    - Add audit table with proper RLS policies
    - Add policies for company management
    - Add policies for profile company association
    - Add policies for audit data access and management

  2. Security
    - Enable RLS on all tables
    - Add policies for CRUD operations with company-based isolation
    - Ensure users can only access data within their company scope
*/

-- Create audits table
CREATE TABLE IF NOT EXISTS audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  company_id uuid REFERENCES companies NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  data jsonb NOT NULL
);

-- Enable RLS
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;

-- Audit policies
CREATE POLICY "Users can view audits from their company"
  ON audits
  FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id 
      FROM profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can create audits for their company"
  ON audits
  FOR INSERT
  TO authenticated
  WITH CHECK (
    company_id IN (
      SELECT company_id 
      FROM profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own audits"
  ON audits
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (
    company_id IN (
      SELECT company_id 
      FROM profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own audits"
  ON audits
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Additional company policies
CREATE POLICY "Company admins can update company details"
  ON companies
  FOR UPDATE
  TO authenticated
  USING (
    id IN (
      SELECT company_id 
      FROM profiles 
      WHERE profiles.id = auth.uid()
      -- TODO: Add admin role check when implemented
    )
  )
  WITH CHECK (
    id IN (
      SELECT company_id 
      FROM profiles 
      WHERE profiles.id = auth.uid()
      -- TODO: Add admin role check when implemented
    )
  );

-- Update profile policies to handle company association
CREATE POLICY "Users can update their own company association"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    -- Allow updating company_id only if:
    -- 1. The user is not already associated with a company (first-time association)
    -- 2. The user has admin rights in the target company (for company transfers)
    (
      (SELECT company_id FROM profiles WHERE id = auth.uid()) IS NULL
      -- TODO: Add admin role check when implemented
    )
  );

-- Add trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_audits_updated_at
  BEFORE UPDATE ON audits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();