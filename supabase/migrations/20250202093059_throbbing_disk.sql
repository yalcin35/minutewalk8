/*
  # Fix Meeting Attendees Relationship

  1. Changes
    - Add foreign key relationship between meeting_attendees.user_id and auth.users
    - Add foreign key relationship between meeting_attendees.user_id and profiles
    - Update policies to handle the new relationships

  2. Security
    - Maintain existing RLS policies
    - Add new policy for profile relationship
*/

-- Drop existing policies to clean up
DROP POLICY IF EXISTS "Meeting creators can manage attendees" ON meeting_attendees;
DROP POLICY IF EXISTS "Users can view meeting attendees" ON meeting_attendees;

-- Add foreign key relationship
ALTER TABLE meeting_attendees
DROP CONSTRAINT IF EXISTS meeting_attendees_user_id_fkey,
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

-- Create indexes for better join performance
CREATE INDEX IF NOT EXISTS idx_meeting_attendees_user_id 
  ON meeting_attendees(user_id);

CREATE INDEX IF NOT EXISTS idx_meeting_attendees_meeting_id 
  ON meeting_attendees(meeting_id);