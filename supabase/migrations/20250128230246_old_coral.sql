/*
  # Add setup_id to audits table

  1. Changes
    - Add setup_id column to audits table
    - Add foreign key constraint to audit_setups table
*/

-- Add setup_id to audits table
ALTER TABLE audits
ADD COLUMN setup_id uuid REFERENCES audit_setups;

-- Update audit policies to include setup_id check
DROP POLICY IF EXISTS "Users can create audits" ON audits;
CREATE POLICY "Users can create audits"
ON audits
FOR INSERT
TO authenticated
WITH CHECK (
  company_id IN (
    SELECT company_id 
    FROM profiles 
    WHERE profiles.id = auth.uid()
  ) AND
  setup_id IN (
    SELECT id
    FROM audit_setups
    WHERE user_id = auth.uid()
  )
);