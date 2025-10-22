/*
  # Add Settings Support

  1. New Columns
    - `profiles.username` (text, unique)
    - `companies.logo_url` (text)

  2. Storage
    - Create bucket for company logos
    - Add storage policies

  3. Security
    - Update RLS policies for new columns
    - Add storage access policies
*/

-- Add username to profiles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'username'
  ) THEN
    ALTER TABLE profiles ADD COLUMN username text UNIQUE;
  END IF;
END $$;

-- Add logo_url to companies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'logo_url'
  ) THEN
    ALTER TABLE companies ADD COLUMN logo_url text;
  END IF;
END $$;

-- Create storage bucket for company logos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload company logos
CREATE POLICY "Users can upload company logos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'public' AND
  (storage.foldername(name))[1] = 'company-logos'
);

-- Allow authenticated users to update company logos
CREATE POLICY "Users can update company logos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'public' AND
  (storage.foldername(name))[1] = 'company-logos'
)
WITH CHECK (
  bucket_id = 'public' AND
  (storage.foldername(name))[1] = 'company-logos'
);

-- Allow public access to company logos
CREATE POLICY "Public can view company logos"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'public' AND
  (storage.foldername(name))[1] = 'company-logos'
);

-- Update profile policies to handle username updates
CREATE POLICY "Users can update their username"
ON profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (
  id = auth.uid() AND
  (
    -- Allow updating username if it's not already taken
    NOT EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.username = COALESCE(
        (SELECT username FROM profiles WHERE id = auth.uid()),
        ''
      )
      AND profiles.id != auth.uid()
    )
  )
);

-- Grant necessary storage permissions
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;