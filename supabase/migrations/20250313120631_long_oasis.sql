/*
  # Remove Meeting Feature

  1. Changes
    - Drop all meeting-related tables and dependencies
    - Drop meeting-related types
    - Drop meeting-related storage policies
    - Clean up any meeting-related data

  2. Security
    - Remove all meeting-related policies
    - Clean up storage permissions
*/

-- First drop storage policies that depend on meetings table
DROP POLICY IF EXISTS "Meeting creators can upload recordings" ON storage.objects;
DROP POLICY IF EXISTS "Users can view recordings from their company" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload meeting recordings" ON storage.objects;
DROP POLICY IF EXISTS "Users can view meeting recordings" ON storage.objects;

-- Clean up storage bucket
DELETE FROM storage.objects WHERE bucket_id = 'meeting-recordings';
DELETE FROM storage.buckets WHERE id = 'meeting-recordings';

-- Drop meeting-related views
DROP VIEW IF EXISTS meeting_attendee_details CASCADE;
DROP VIEW IF EXISTS meeting_note_details CASCADE;
DROP VIEW IF EXISTS meeting_action_item_details CASCADE;

-- Drop meeting-related functions
DROP FUNCTION IF EXISTS update_meeting_status CASCADE;
DROP FUNCTION IF EXISTS add_meeting_attendee CASCADE;
DROP FUNCTION IF EXISTS update_attendance_status CASCADE;
DROP FUNCTION IF EXISTS update_speaking_time CASCADE;
DROP FUNCTION IF EXISTS remove_meeting_attendee CASCADE;

-- Drop meeting-related tables in correct order
DROP TABLE IF EXISTS meeting_insights CASCADE;
DROP TABLE IF EXISTS meeting_action_items CASCADE;
DROP TABLE IF EXISTS meeting_notes CASCADE;
DROP TABLE IF EXISTS meeting_recordings CASCADE;
DROP TABLE IF EXISTS meeting_attendees CASCADE;
DROP TABLE IF EXISTS meetings CASCADE;

-- Drop meeting-related types
DROP TYPE IF EXISTS meeting_type CASCADE;
DROP TYPE IF EXISTS meeting_status CASCADE;
DROP TYPE IF EXISTS action_item_category CASCADE;
DROP TYPE IF EXISTS priority_level CASCADE;