/*
  # Create Storage Bucket for Meeting Recordings
  
  1. New Storage Buckets
    - meeting-recordings: For storing meeting audio recordings
  
  2. Security
    - Define RLS policies to protect meeting recordings
*/

-- Create storage bucket for meeting recordings
INSERT INTO storage.buckets (id, name, public)
VALUES ('meeting-recordings', 'Meeting Recordings', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for meeting recordings
CREATE POLICY "Meeting creators can upload recordings"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'meeting-recordings' AND
  EXISTS (
    SELECT 1 FROM meetings
    WHERE meetings.id::text = (storage.foldername(name))[1]
    AND meetings.created_by = auth.uid()
  )
);

CREATE POLICY "Users can view recordings from their company"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'meeting-recordings' AND
  EXISTS (
    SELECT 1 FROM meetings
    JOIN profiles ON profiles.company_id = meetings.company_id
    WHERE meetings.id::text = (storage.foldername(name))[1]
    AND profiles.id = auth.uid()
  )
);