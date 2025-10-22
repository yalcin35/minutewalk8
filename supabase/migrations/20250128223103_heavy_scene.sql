/*
  # Fix storage and RLS policies for audits

  1. Changes
    - Add storage bucket for audit photos
    - Add storage policies for audit photos
    - Fix RLS policies for audits table
    - Add missing storage permissions

  2. Security
    - Enable RLS on storage objects
    - Add policies for authenticated users to manage their audit photos
    - Ensure users can only access their company's audit data
*/

-- Create storage bucket for audit photos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies to clean up
DROP POLICY IF EXISTS "Users can upload audit photos" ON storage.objects;
DROP POLICY IF EXISTS "Public can view audit photos" ON storage.objects;

-- Create new storage policies
CREATE POLICY "Users can upload audit photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'public' AND
  (storage.foldername(name))[1] = 'audit-photos'
);

CREATE POLICY "Users can view audit photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'public' AND
  (storage.foldername(name))[1] = 'audit-photos'
);

-- Drop existing audit policies to clean up
DROP POLICY IF EXISTS "Users can view audits from their company" ON audits;
DROP POLICY IF EXISTS "Users can create audits for their company" ON audits;
DROP POLICY IF EXISTS "Users can update their own audits" ON audits;
DROP POLICY IF EXISTS "Users can delete their own audits" ON audits;

-- Create new audit policies
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

CREATE POLICY "Users can create audits"
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
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own audits"
ON audits
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Grant necessary storage permissions
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;

-- Ensure RLS is enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;