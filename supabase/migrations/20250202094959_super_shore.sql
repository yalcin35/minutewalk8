-- Drop existing view and policies
DROP VIEW IF EXISTS meeting_attendee_details;
DROP POLICY IF EXISTS "Meeting creators can manage attendees" ON meeting_attendees;
DROP POLICY IF EXISTS "Users can view meeting attendees" ON meeting_attendees;

-- Create view for attendee details that properly handles both internal and external attendees
CREATE VIEW meeting_attendee_details AS
SELECT 
  ma.id,
  ma.meeting_id,
  ma.external_name,
  ma.external_email,
  ma.role,
  ma.attendance_status,
  ma.speaking_time,
  ma.created_at
FROM meeting_attendees ma
WHERE EXISTS (
  SELECT 1 FROM meetings m
  JOIN profiles viewer ON viewer.company_id = m.company_id
  WHERE m.id = ma.meeting_id
  AND viewer.id = auth.uid()
);

-- Create new policies with proper checks
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
      SELECT 1 FROM meetings m
      WHERE m.id = meeting_attendees.meeting_id
      AND m.created_by = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM meetings m
      WHERE m.id = meeting_attendees.meeting_id
      AND m.created_by = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_meeting_attendees_meeting_id 
  ON meeting_attendees(meeting_id);

-- Grant necessary permissions
GRANT SELECT ON meeting_attendee_details TO authenticated;