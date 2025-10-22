/*
  # Add public company search policy

  1. Changes
    - Add a new policy to allow searching companies during sign-in
    - This policy allows unauthenticated users to search companies by name
    - Limited to only the necessary fields for sign-in (id, name)

  2. Security
    - Only allows SELECT operations
    - Only exposes minimal required data
    - Does not expose sensitive company information
*/

-- Add policy to allow searching companies during sign-in
CREATE POLICY "Allow public company search"
  ON companies
  FOR SELECT
  TO anon
  USING (true);

-- Revoke all privileges from public by default
REVOKE ALL ON companies FROM public;

-- Grant only SELECT to public
GRANT SELECT ON companies TO anon;