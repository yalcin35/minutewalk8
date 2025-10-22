/*
  # Fix Daily Checkins Relationship

  1. Changes
    - Fix relationship between daily_checkins and profiles
    - Create view for daily checkin details with proper joins
    - Add necessary indexes for performance

  2. Security
    - Maintain existing RLS policies
    - Ensure proper access control
*/

-- Create view for daily checkin details with proper joins
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_daily_checkins_created_by 
ON daily_checkins(created_by);

-- Grant necessary permissions
GRANT SELECT ON daily_checkin_details TO authenticated;