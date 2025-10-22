/*
  # Fix Daily Checkins Relationship

  1. Changes
    - Add proper foreign key relationship between daily_checkins and profiles
    - Update query structure for created_by relationship
    - Fix RLS policies to handle the relationship

  2. Security
    - Maintain existing RLS policies
    - Ensure proper access control
*/

-- Drop existing foreign key if it exists
ALTER TABLE daily_checkins
DROP CONSTRAINT IF EXISTS daily_checkins_created_by_fkey;

-- Add proper foreign key relationship
ALTER TABLE daily_checkins
ADD CONSTRAINT daily_checkins_created_by_fkey
FOREIGN KEY (created_by)
REFERENCES auth.users(id)
ON DELETE CASCADE;

-- Create view for daily checkin details that includes user information
CREATE OR REPLACE VIEW daily_checkin_details AS
SELECT 
  dc.*,
  p.full_name as creator_name,
  p.email as creator_email
FROM daily_checkins dc
JOIN profiles p ON dc.created_by = p.id
WHERE EXISTS (
  SELECT 1 FROM profiles viewer
  WHERE viewer.id = auth.uid()
  AND viewer.company_id = dc.company_id
);

-- Grant necessary permissions
GRANT SELECT ON daily_checkin_details TO authenticated;