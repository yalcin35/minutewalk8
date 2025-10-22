/*
  # Fix Meeting Action Items Relationships

  1. Changes
    - Add proper foreign key relationship between meeting_action_items and profiles
    - Create view for meeting action items with user details
    - Update policies and permissions
    - Add performance indexes

  2. Security
    - Enable RLS
    - Add policies for data access control
*/

-- Drop existing policies first
DROP POLICY IF EXISTS "Meeting creators can manage action items" ON meeting_action_items;
DROP POLICY IF EXISTS "Users can view meeting action items" ON meeting_action_items;

-- Modify the assigned_to column to properly reference profiles
ALTER TABLE meeting_action_items
DROP CONSTRAINT IF EXISTS meeting_action_items_assigned_to_fkey;

DO $$ 
BEGIN
  -- Create temporary column
  ALTER TABLE meeting_action_items ADD COLUMN assigned_to_new uuid;
  
  -- Copy data if needed
  UPDATE meeting_action_items SET assigned_to_new = assigned_to::uuid;
  
  -- Drop old column
  ALTER TABLE meeting_action_items DROP COLUMN assigned_to;
  
  -- Rename new column
  ALTER TABLE meeting_action_items RENAME COLUMN assigned_to_new TO assigned_to;
  
  -- Add foreign key constraint
  ALTER TABLE meeting_action_items 
    ADD CONSTRAINT meeting_action_items_assigned_to_fkey 
    FOREIGN KEY (assigned_to) 
    REFERENCES auth.users(id)
    ON DELETE SET NULL;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meeting_action_items_meeting_id 
  ON meeting_action_items(meeting_id);

CREATE INDEX IF NOT EXISTS idx_meeting_action_items_assigned_to 
  ON meeting_action_items(assigned_to);

CREATE INDEX IF NOT EXISTS idx_meeting_action_items_priority 
  ON meeting_action_items(priority);

-- Enable RLS
ALTER TABLE meeting_action_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view meeting action items"
  ON meeting_action_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meetings m
      JOIN profiles p ON p.company_id = m.company_id
      WHERE m.id = meeting_action_items.meeting_id
      AND p.id = auth.uid()
    )
  );

CREATE POLICY "Meeting creators can manage action items"
  ON meeting_action_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meetings m
      WHERE m.id = meeting_action_items.meeting_id
      AND m.created_by = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM meetings m
      WHERE m.id = meeting_action_items.meeting_id
      AND m.created_by = auth.uid()
    )
  );

-- Create view for action items with user details
CREATE OR REPLACE VIEW meeting_action_item_details AS
SELECT 
  mai.id,
  mai.meeting_id,
  mai.description,
  mai.category,
  mai.priority,
  mai.due_date,
  mai.status,
  mai.assigned_to,
  p.full_name as assignee_full_name,
  p.email as assignee_email
FROM meeting_action_items mai
LEFT JOIN profiles p ON mai.assigned_to = p.id
WHERE EXISTS (
  SELECT 1 FROM meetings m
  JOIN profiles viewer ON viewer.company_id = m.company_id
  WHERE m.id = mai.meeting_id
  AND viewer.id = auth.uid()
);

-- Grant necessary permissions
GRANT SELECT ON meeting_action_item_details TO authenticated;