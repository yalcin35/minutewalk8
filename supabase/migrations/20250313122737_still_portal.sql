/*
  # Final Meeting Feature Cleanup

  1. Changes
    - Drop any remaining meeting-related views
    - Drop any remaining meeting-related functions
    - Drop any remaining meeting-related storage policies
    - Clean up any remaining meeting-related data

  2. Security
    - Maintain existing RLS policies
    - Clean up storage permissions
*/

-- Drop any remaining meeting-related views if they exist
DROP VIEW IF EXISTS meeting_attendee_details CASCADE;
DROP VIEW IF EXISTS meeting_note_details CASCADE;
DROP VIEW IF EXISTS meeting_action_item_details CASCADE;
DROP VIEW IF EXISTS meeting_insights_view CASCADE;

-- Drop any remaining meeting-related functions
DROP FUNCTION IF EXISTS update_meeting_status CASCADE;
DROP FUNCTION IF EXISTS add_meeting_attendee CASCADE;
DROP FUNCTION IF EXISTS update_attendance_status CASCADE;
DROP FUNCTION IF EXISTS update_speaking_time CASCADE;
DROP FUNCTION IF EXISTS remove_meeting_attendee CASCADE;
DROP FUNCTION IF EXISTS get_meeting_stats CASCADE;

-- Drop any remaining meeting-related storage policies
DO $$ 
BEGIN
  -- Drop storage policies if they exist
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname LIKE '%meeting%' 
    AND tablename = 'objects' 
    AND schemaname = 'storage'
  ) THEN
    DROP POLICY IF EXISTS "Meeting creators can upload recordings" ON storage.objects;
    DROP POLICY IF EXISTS "Users can view meeting recordings" ON storage.objects;
    DROP POLICY IF EXISTS "Users can upload meeting recordings" ON storage.objects;
    DROP POLICY IF EXISTS "Meeting participants can view recordings" ON storage.objects;
  END IF;
END $$;

-- Clean up storage
DELETE FROM storage.objects WHERE bucket_id = 'meeting-recordings';
DELETE FROM storage.buckets WHERE id = 'meeting-recordings';

-- Drop any remaining meeting-related tables
DROP TABLE IF EXISTS meeting_insights CASCADE;
DROP TABLE IF EXISTS meeting_action_items CASCADE;
DROP TABLE IF EXISTS meeting_notes CASCADE;
DROP TABLE IF EXISTS meeting_recordings CASCADE;
DROP TABLE IF EXISTS meeting_attendees CASCADE;
DROP TABLE IF EXISTS meetings CASCADE;

-- Drop any remaining meeting-related types
DROP TYPE IF EXISTS meeting_type CASCADE;
DROP TYPE IF EXISTS meeting_status CASCADE;
DROP TYPE IF EXISTS action_item_category CASCADE;
DROP TYPE IF EXISTS priority_level CASCADE;