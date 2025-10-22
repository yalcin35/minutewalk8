/*
  # Audit Setup Schema

  1. New Tables
    - sites
      - id (uuid, primary key)
      - company_id (references companies)
      - name (text)
      - created_at (timestamptz)
    
    - departments
      - id (uuid, primary key)
      - company_id (references companies)
      - site_id (references sites)
      - name (text)
      - created_at (timestamptz)
    
    - audit_setups
      - id (uuid, primary key)
      - user_id (references auth.users)
      - level (integer, 1-5)
      - site_id (references sites)
      - department_id (references departments)
      - audit_type (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for company-based access control
*/

-- Create sites table
CREATE TABLE IF NOT EXISTS sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(company_id, name)
);

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies NOT NULL,
  site_id uuid REFERENCES sites NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(site_id, name)
);

-- Create audit_setups table
CREATE TABLE IF NOT EXISTS audit_setups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  level integer NOT NULL CHECK (level BETWEEN 1 AND 5),
  site_id uuid REFERENCES sites NOT NULL,
  department_id uuid REFERENCES departments NOT NULL,
  audit_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_setups ENABLE ROW LEVEL SECURITY;

-- Sites policies
CREATE POLICY "Users can view sites from their company"
  ON sites
  FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id 
      FROM profiles 
      WHERE profiles.id = auth.uid()
    )
  );

-- Departments policies
CREATE POLICY "Users can view departments from their company"
  ON departments
  FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id 
      FROM profiles 
      WHERE profiles.id = auth.uid()
    )
  );

-- Audit setups policies
CREATE POLICY "Users can view their own audit setups"
  ON audit_setups
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create audit setups"
  ON audit_setups
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() AND
    site_id IN (
      SELECT id FROM sites WHERE company_id IN (
        SELECT company_id FROM profiles WHERE id = auth.uid()
      )
    ) AND
    department_id IN (
      SELECT id FROM departments WHERE company_id IN (
        SELECT company_id FROM profiles WHERE id = auth.uid()
      )
    )
  );

-- Insert some sample data for testing
DO $$ 
DECLARE
  v_company_id uuid;
  v_site_id uuid;
BEGIN
  -- Get the first company ID (assuming it exists)
  SELECT id INTO v_company_id FROM companies LIMIT 1;
  
  IF v_company_id IS NOT NULL THEN
    -- Insert a sample site
    INSERT INTO sites (company_id, name)
    VALUES (v_company_id, 'Main Manufacturing Site')
    RETURNING id INTO v_site_id;

    -- Insert sample departments
    INSERT INTO departments (company_id, site_id, name)
    VALUES 
      (v_company_id, v_site_id, 'Production'),
      (v_company_id, v_site_id, 'Warehouse'),
      (v_company_id, v_site_id, 'Quality Control'),
      (v_company_id, v_site_id, 'Maintenance');
  END IF;
END $$;