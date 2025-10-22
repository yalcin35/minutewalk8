/*
  # Fix Meeting Attendees Relationships

  1. Changes
    - Drop existing foreign key constraints
    - Add proper foreign key relationships
    - Update policies to handle the relationships correctly
    - Add necessary indexes

  2. Security
    - Maintain RLS policies
    - Ensure proper access control
*/

-- Drop existing policies and constraints
DROP POLICY IF EXISTS "Meeting creators can manage attendees" ON meeting_attendees;
DROP POLICY IF EXISTS "Users can view meeting attendees" ON meeting_attendees;

ALTER TABLE meeting_attendees
DROP CONSTRAINT IF EXISTS meeting_attendees_user_id_fkey;

-- Add foreign key relationships
ALTER TABLE meeting_attendees
ADD CONSTRAINT meeting_attendees_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id)
  ON DELETE SET NULL;

-- Create new policies
CREATE POLICY "Users can view meeting attendees"
  ON meeting_attendees
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meetings m
      JOIN profiles p ON p.company_id = m.company_id
      WHERE m.id = meeting_attendees.meeting_id
      AND p.id = auth.uid()
    )
  );

CREATE POLICY "Meeting creators can manage attendees"
  ON meeting_attendees
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meetings
      WHERE id = meeting_attendees.meeting_id
      AND created_by = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM meetings
      WHERE id = meeting_attendees.meeting_id
      AND created_by = auth.uid()
    )
  );

-- Create view for attendee details
CREATE OR REPLACE VIEW meeting_attendee_details AS
SELECT 
  ma.id,
  ma.meeting_id,
  ma.user_id,
  ma.external_name,
  ma.external_email,
  ma.role,
  ma.attendance_status,
  ma.speaking_time,
  ma.created_at,
  p.full_name,
  p.email
FROM meeting_attendees ma
LEFT JOIN profiles p ON ma.user_id = p.id
WHERE EXISTS (
  SELECT 1 FROM meetings m
  JOIN profiles viewer ON viewer.company_id = m.company_id
  WHERE m.id = ma.meeting_id
  AND viewer.id = auth.uid()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meeting_attendees_user_id 
  ON meeting_attendees(user_id);

CREATE INDEX IF NOT EXISTS idx_meeting_attendees_meeting_id 
  ON meeting_attendees(meeting_id);

-- Grant necessary permissions
GRANT SELECT ON meeting_attendee_details TO authenticated;