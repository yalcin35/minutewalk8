-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view meeting notes" ON meeting_notes;
DROP POLICY IF EXISTS "Users can create and update their own notes" ON meeting_notes;
DROP POLICY IF EXISTS "Users can create meeting notes" ON meeting_notes;
DROP POLICY IF EXISTS "Users can update their own notes" ON meeting_notes;

-- Now we can safely modify the column
ALTER TABLE meeting_notes
DROP CONSTRAINT IF EXISTS meeting_notes_created_by_fkey;

-- Use DO block to handle column recreation safely
DO $$ 
BEGIN
  -- Create temporary column
  ALTER TABLE meeting_notes ADD COLUMN created_by_new uuid;
  
  -- Copy data if needed
  UPDATE meeting_notes SET created_by_new = created_by::uuid;
  
  -- Drop old column
  ALTER TABLE meeting_notes DROP COLUMN created_by;
  
  -- Rename new column
  ALTER TABLE meeting_notes RENAME COLUMN created_by_new TO created_by;
  
  -- Add foreign key constraint
  ALTER TABLE meeting_notes 
    ADD CONSTRAINT meeting_notes_created_by_fkey 
    FOREIGN KEY (created_by) 
    REFERENCES auth.users 
    ON DELETE SET NULL;
END $$;

-- Create view for meeting notes with user details
CREATE OR REPLACE VIEW meeting_note_details AS
SELECT 
  mn.id,
  mn.meeting_id,
  mn.content,
  mn.is_ai_generated,
  mn.created_at,
  mn.created_by,
  p.full_name as user_full_name,
  p.email as user_email
FROM meeting_notes mn
LEFT JOIN profiles p ON mn.created_by = p.id
WHERE EXISTS (
  SELECT 1 FROM meetings m
  JOIN profiles viewer ON viewer.company_id = m.company_id
  WHERE m.id = mn.meeting_id
  AND viewer.id = auth.uid()
);

-- Recreate policies
CREATE POLICY "Users can view meeting notes"
  ON meeting_notes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meetings m
      JOIN profiles p ON p.company_id = m.company_id
      WHERE m.id = meeting_notes.meeting_id
      AND p.id = auth.uid()
    )
  );

CREATE POLICY "Users can create meeting notes"
  ON meeting_notes
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM meetings m
      JOIN profiles p ON p.company_id = m.company_id
      WHERE m.id = meeting_notes.meeting_id
      AND p.id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own notes"
  ON meeting_notes
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meeting_notes_meeting_id 
  ON meeting_notes(meeting_id);

CREATE INDEX IF NOT EXISTS idx_meeting_notes_created_by 
  ON meeting_notes(created_by);

-- Grant necessary permissions
GRANT SELECT ON meeting_note_details TO authenticated;