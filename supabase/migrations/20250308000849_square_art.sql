/*
  # Create Update Meeting Status Function
  
  1. New Tables
    - None (uses existing meetings table)
  
  2. New Functions
    - update_meeting_status: Helper function to update meeting status and times
  
  3. Security
    - Function is restricted to authenticated users who created the meeting
*/

-- Create function to update meeting status
CREATE OR REPLACE FUNCTION update_meeting_status(
  meeting_id UUID,
  new_status meeting_status,
  start_time TIMESTAMPTZ DEFAULT NULL,
  end_time TIMESTAMPTZ DEFAULT NULL
) RETURNS VOID AS $$
DECLARE
  meeting_creator UUID;
BEGIN
  -- Get the meeting creator
  SELECT created_by INTO meeting_creator
  FROM meetings
  WHERE id = meeting_id;

  -- Check if the current user is the meeting creator
  IF meeting_creator = auth.uid() THEN
    -- Update the meeting status
    UPDATE meetings
    SET 
      status = new_status,
      actual_start = COALESCE(start_time, actual_start),
      actual_end = COALESCE(end_time, actual_end)
    WHERE id = meeting_id;
  ELSE
    RAISE EXCEPTION 'Only the meeting creator can update the meeting status';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;