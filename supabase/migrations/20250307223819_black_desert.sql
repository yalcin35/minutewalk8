/*
  # Fix Meeting Relationships

  1. Changes
    - Drop existing views and policies first
    - Add proper foreign key relationships for meeting_action_items
    - Recreate views for meeting notes and action items
    - Update policies and permissions
    - Add performance indexes

  2. Security
    - Enable RLS on all tables
    - Add policies for proper data access control
*/

-- First drop the views if they exist
DROP VIEW IF EXISTS meeting_action_item_details;
DROP VIEW IF EXISTS meeting_note_details;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view meeting action items from their company" ON meeting_action_items;
DROP POLICY IF EXISTS "Meeting creators can manage action items" ON meeting_action_items;
DROP POLICY IF EXISTS "Users can view meeting notes from their company" ON meeting_notes;
DROP POLICY IF EXISTS "Meeting participants can create notes" ON meeting_notes;
DROP POLICY IF EXISTS "Users can update their own notes" ON meeting_notes;

-- Fix the meeting_action_items table
ALTER TABLE meeting_action_items 
DROP CONSTRAINT IF EXISTS meeting_action_items_assigned_to_fkey;

-- Update the assigned_to column to properly reference profiles
ALTER TABLE meeting_action_items
ALTER COLUMN assigned_to TYPE uuid USING assigned_to::uuid;

ALTER TABLE meeting_action_items
ADD CONSTRAINT meeting_action_items_assigned_to_fkey
FOREIGN KEY (assigned_to) REFERENCES profiles(id)
ON DELETE SET NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meeting_action_items_meeting_id 
ON meeting_action_items(meeting_id);

CREATE INDEX IF NOT EXISTS idx_meeting_action_items_assigned_to 
ON meeting_action_items(assigned_to);

-- Recreate view for meeting action items with user details
CREATE VIEW meeting_action_item_details AS
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
LEFT JOIN profiles p ON mai.assigned_to = p.id;

-- Recreate view for meeting notes with user details
CREATE VIEW meeting_note_details AS
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
LEFT JOIN profiles p ON mn.created_by = p.id;

-- Enable RLS
ALTER TABLE meeting_action_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_notes ENABLE ROW LEVEL SECURITY;

-- Create policies for meeting action items
CREATE POLICY "Users can view meeting action items from their company"
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

-- Create policies for meeting notes
CREATE POLICY "Users can view meeting notes from their company"
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

CREATE POLICY "Meeting participants can create notes"
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

-- Grant necessary permissions
GRANT SELECT ON meeting_action_item_details TO authenticated;
GRANT SELECT ON meeting_note_details TO authenticated;