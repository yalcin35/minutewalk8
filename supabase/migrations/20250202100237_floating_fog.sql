-- Create storage bucket for meeting recordings if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('meeting-recordings', 'meeting-recordings', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Users can upload meeting recordings" ON storage.objects;
DROP POLICY IF EXISTS "Users can view meeting recordings" ON storage.objects;

-- Create storage policies for meeting recordings
CREATE POLICY "Users can upload meeting recordings"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'meeting-recordings' AND
  (storage.foldername(name))[1] = 'recordings'
);

CREATE POLICY "Users can view meeting recordings"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'meeting-recordings' AND
  (storage.foldername(name))[1] = 'recordings'
);

-- Add status enum type if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'meeting_status'
  ) THEN
    CREATE TYPE meeting_status AS ENUM (
      'scheduled',
      'in_progress',
      'paused',
      'completed',
      'cancelled'
    );
  END IF;
END $$;

-- Create temporary column for status conversion
ALTER TABLE meetings 
ADD COLUMN status_new meeting_status;

-- Convert existing status values
UPDATE meetings 
SET status_new = CASE 
  WHEN status = 'scheduled' THEN 'scheduled'::meeting_status
  WHEN status = 'in_progress' THEN 'in_progress'::meeting_status
  WHEN status = 'paused' THEN 'paused'::meeting_status
  WHEN status = 'completed' THEN 'completed'::meeting_status
  WHEN status = 'cancelled' THEN 'cancelled'::meeting_status
  ELSE 'scheduled'::meeting_status
END;

-- Drop old column and rename new one
ALTER TABLE meetings 
DROP COLUMN status;

ALTER TABLE meetings 
RENAME COLUMN status_new TO status;

-- Add NOT NULL constraint and default value
ALTER TABLE meetings 
ALTER COLUMN status SET NOT NULL,
ALTER COLUMN status SET DEFAULT 'scheduled'::meeting_status;

-- Create function to update meeting status
CREATE OR REPLACE FUNCTION update_meeting_status(
  meeting_id uuid,
  new_status meeting_status,
  start_time timestamptz DEFAULT NULL,
  end_time timestamptz DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE meetings
  SET 
    status = new_status,
    actual_start = COALESCE(start_time, actual_start),
    actual_end = CASE 
      WHEN new_status = 'completed' THEN COALESCE(end_time, now())
      ELSE actual_end
    END,
    updated_at = now()
  WHERE id = meeting_id
  AND created_by = auth.uid();
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION update_meeting_status TO authenticated;