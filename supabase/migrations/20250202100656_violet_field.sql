-- Create function to add meeting attendees
CREATE OR REPLACE FUNCTION add_meeting_attendee(
  p_meeting_id uuid,
  p_user_id uuid DEFAULT NULL,
  p_external_name text DEFAULT NULL,
  p_external_email text DEFAULT NULL,
  p_role text DEFAULT 'attendee'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_attendee_id uuid;
BEGIN
  -- Verify meeting exists and user has access
  IF NOT EXISTS (
    SELECT 1 FROM meetings m
    JOIN profiles p ON p.company_id = m.company_id
    WHERE m.id = p_meeting_id
    AND p.id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Meeting not found or access denied';
  END IF;

  -- Validate input
  IF p_user_id IS NULL AND (p_external_name IS NULL OR p_external_name = '') THEN
    RAISE EXCEPTION 'Either user_id or external_name must be provided';
  END IF;

  -- Check for duplicate attendee
  IF p_user_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM meeting_attendees
    WHERE meeting_id = p_meeting_id AND user_id = p_user_id
  ) THEN
    RAISE EXCEPTION 'User is already an attendee';
  END IF;

  IF p_external_email IS NOT NULL AND EXISTS (
    SELECT 1 FROM meeting_attendees
    WHERE meeting_id = p_meeting_id AND external_email = p_external_email
  ) THEN
    RAISE EXCEPTION 'External attendee with this email already exists';
  END IF;

  -- Insert attendee
  INSERT INTO meeting_attendees (
    meeting_id,
    user_id,
    external_name,
    external_email,
    role,
    attendance_status
  )
  VALUES (
    p_meeting_id,
    p_user_id,
    p_external_name,
    p_external_email,
    p_role,
    CASE 
      WHEN p_user_id = auth.uid() THEN 'confirmed'
      ELSE 'pending'
    END
  )
  RETURNING id INTO v_attendee_id;

  RETURN v_attendee_id;
END;
$$;

-- Create function to update attendance status
CREATE OR REPLACE FUNCTION update_attendance_status(
  p_attendee_id uuid,
  p_status text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Verify attendee exists and user has access
  IF NOT EXISTS (
    SELECT 1 FROM meeting_attendees ma
    JOIN meetings m ON m.id = ma.meeting_id
    JOIN profiles p ON p.company_id = m.company_id
    WHERE ma.id = p_attendee_id
    AND (p.id = auth.uid() OR m.created_by = auth.uid())
  ) THEN
    RAISE EXCEPTION 'Attendee not found or access denied';
  END IF;

  -- Update status
  UPDATE meeting_attendees
  SET 
    attendance_status = p_status,
    updated_at = now()
  WHERE id = p_attendee_id;
END;
$$;

-- Create function to update speaking time
CREATE OR REPLACE FUNCTION update_speaking_time(
  p_attendee_id uuid,
  p_duration interval
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Verify attendee exists and user has access
  IF NOT EXISTS (
    SELECT 1 FROM meeting_attendees ma
    JOIN meetings m ON m.id = ma.meeting_id
    JOIN profiles p ON p.company_id = m.company_id
    WHERE ma.id = p_attendee_id
    AND p.id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Attendee not found or access denied';
  END IF;

  -- Update speaking time
  UPDATE meeting_attendees
  SET 
    speaking_time = COALESCE(speaking_time, '0 seconds'::interval) + p_duration,
    updated_at = now()
  WHERE id = p_attendee_id;
END;
$$;

-- Create function to remove attendee
CREATE OR REPLACE FUNCTION remove_meeting_attendee(
  p_attendee_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Verify attendee exists and user has access
  IF NOT EXISTS (
    SELECT 1 FROM meeting_attendees ma
    JOIN meetings m ON m.id = ma.meeting_id
    WHERE ma.id = p_attendee_id
    AND m.created_by = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Attendee not found or access denied';
  END IF;

  -- Remove attendee
  DELETE FROM meeting_attendees
  WHERE id = p_attendee_id;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION add_meeting_attendee TO authenticated;
GRANT EXECUTE ON FUNCTION update_attendance_status TO authenticated;
GRANT EXECUTE ON FUNCTION update_speaking_time TO authenticated;
GRANT EXECUTE ON FUNCTION remove_meeting_attendee TO authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meeting_attendees_status 
ON meeting_attendees(meeting_id, attendance_status);

CREATE INDEX IF NOT EXISTS idx_meeting_attendees_role 
ON meeting_attendees(meeting_id, role);

// Add an internal attendee (Supabase user)
const { data: internalAttendee, error: internalError } = await supabase
  .from('meeting_attendees')
  .insert({
    meeting_id: meetingId,
    user_id: userId,
    role: 'attendee',
    attendance_status: 'pending'
  })
  .select(`
    id,
    user_id,
    role,
    attendance_status,
    speaking_time,
    profiles:user_id (
      full_name,
      email
    )
  `)
  .single();

// Add an external attendee
const { data: externalAttendee, error: externalError } = await supabase
  .from('meeting_attendees')
  .insert({
    meeting_id: meetingId,
    external_name: 'John Doe',
    external_email: 'john@example.com',
    role: 'guest',
    attendance_status: 'pending'
  })
  .select()
  .single();

// Update attendance status
const { error: statusError } = await supabase
  .from('meeting_attendees')
  .update({ 
    attendance_status: 'confirmed',
    updated_at: new Date().toISOString()
  })
  .eq('id', attendeeId);

// Update speaking time
const { error: timeError } = await supabase
  .from('meeting_attendees')
  .update({ 
    speaking_time: '5 minutes',
    updated_at: new Date().toISOString()
  })
  .eq('id', attendeeId);

// Remove an attendee
const { error: removeError } = await supabase
  .from('meeting_attendees')
  .delete()
  .eq('id', attendeeId);

// Query attendees with proper handling of both internal and external attendees
const { data: attendees, error: queryError } = await supabase
  .from('meeting_attendees')
  .select(`
    id,
    user_id,
    external_name,
    external_email,
    role,
    attendance_status,
    speaking_time,
    profiles:user_id (
      full_name,
      email
    )
  `)
  .eq('meeting_id', meetingId);

// Process attendees to handle both types
const processedAttendees = attendees?.map(attendee => ({
  id: attendee.id,
  name: attendee.user_id ? attendee.profiles.full_name : attendee.external_name,
  email: attendee.user_id ? attendee.profiles.email : attendee.external_email,
  role: attendee.role,
  status: attendee.attendance_status,
  speakingTime: attendee.speaking_time
}));
