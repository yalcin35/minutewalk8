/*
  # Meeting Recording Schema

  1. New Tables
    - `meetings`
      - Core meeting information and metadata
    - `meeting_attendees` 
      - Junction table for meeting participants
    - `meeting_recordings`
      - Audio recording metadata and transcription
    - `meeting_notes`
      - Manual and AI-generated notes
    - `meeting_action_items`
      - Action items with SQCDPE categorization

  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
*/

-- Create meeting types enum
CREATE TYPE meeting_type AS ENUM (
  'gemba_walk',
  'safety_review',
  'quality_review',
  'production_review',
  'improvement_workshop',
  'other'
);

-- Create action item category enum
CREATE TYPE action_item_category AS ENUM (
  'safety',
  'quality',
  'cost',
  'delivery',
  'people',
  'environment',
  'risk',
  'innovation',
  'compliance',
  'other'
);

-- Create priority enum
CREATE TYPE priority_level AS ENUM (
  'high',
  'medium',
  'low'
);

-- Create meetings table
CREATE TABLE meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies NOT NULL,
  title text NOT NULL,
  meeting_type meeting_type NOT NULL,
  scheduled_start timestamptz NOT NULL,
  scheduled_end timestamptz,
  actual_start timestamptz,
  actual_end timestamptz,
  site_id uuid REFERENCES sites,
  agenda text,
  status text NOT NULL DEFAULT 'scheduled',
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meeting attendees table
CREATE TABLE meeting_attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users,
  external_email text,
  external_name text,
  role text NOT NULL DEFAULT 'attendee',
  attendance_status text NOT NULL DEFAULT 'pending',
  speaking_time interval DEFAULT '0 seconds',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_attendee CHECK (
    (user_id IS NOT NULL AND external_email IS NULL AND external_name IS NULL) OR
    (user_id IS NULL AND external_email IS NOT NULL AND external_name IS NOT NULL)
  )
);

-- Create meeting recordings table
CREATE TABLE meeting_recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings ON DELETE CASCADE NOT NULL,
  file_path text NOT NULL,
  duration interval,
  language text,
  transcription jsonb,
  audio_quality numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meeting notes table
CREATE TABLE meeting_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  is_ai_generated boolean DEFAULT false,
  created_by uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meeting action items table
CREATE TABLE meeting_action_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings ON DELETE CASCADE NOT NULL,
  description text NOT NULL,
  category action_item_category NOT NULL,
  priority priority_level NOT NULL,
  assigned_to uuid REFERENCES auth.users,
  due_date date,
  status text NOT NULL DEFAULT 'open',
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_action_items ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Meetings policies
CREATE POLICY "Users can view meetings from their company"
  ON meetings
  FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id 
      FROM profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can create meetings for their company"
  ON meetings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    company_id IN (
      SELECT company_id 
      FROM profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "Meeting creators can update their meetings"
  ON meetings
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Meeting attendees policies
CREATE POLICY "Users can view meeting attendees"
  ON meeting_attendees
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT id FROM meetings
      WHERE company_id IN (
        SELECT company_id 
        FROM profiles 
        WHERE profiles.id = auth.uid()
      )
    )
  );

CREATE POLICY "Meeting creators can manage attendees"
  ON meeting_attendees
  FOR ALL
  TO authenticated
  USING (
    meeting_id IN (
      SELECT id FROM meetings
      WHERE created_by = auth.uid()
    )
  );

-- Meeting recordings policies
CREATE POLICY "Users can view meeting recordings"
  ON meeting_recordings
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT id FROM meetings
      WHERE company_id IN (
        SELECT company_id 
        FROM profiles 
        WHERE profiles.id = auth.uid()
      )
    )
  );

CREATE POLICY "Meeting creators can manage recordings"
  ON meeting_recordings
  FOR ALL
  TO authenticated
  USING (
    meeting_id IN (
      SELECT id FROM meetings
      WHERE created_by = auth.uid()
    )
  );

-- Meeting notes policies
CREATE POLICY "Users can view meeting notes"
  ON meeting_notes
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT id FROM meetings
      WHERE company_id IN (
        SELECT company_id 
        FROM profiles 
        WHERE profiles.id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can create and update their own notes"
  ON meeting_notes
  FOR ALL
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Meeting action items policies
CREATE POLICY "Users can view action items"
  ON meeting_action_items
  FOR SELECT
  TO authenticated
  USING (
    meeting_id IN (
      SELECT id FROM meetings
      WHERE company_id IN (
        SELECT company_id 
        FROM profiles 
        WHERE profiles.id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can create and update their own action items"
  ON meeting_action_items
  FOR ALL
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Create indexes for better query performance
CREATE INDEX meetings_company_id_idx ON meetings(company_id);
CREATE INDEX meetings_site_id_idx ON meetings(site_id);
CREATE INDEX meeting_attendees_meeting_id_idx ON meeting_attendees(meeting_id);
CREATE INDEX meeting_attendees_user_id_idx ON meeting_attendees(user_id);
CREATE INDEX meeting_recordings_meeting_id_idx ON meeting_recordings(meeting_id);
CREATE INDEX meeting_notes_meeting_id_idx ON meeting_notes(meeting_id);
CREATE INDEX meeting_action_items_meeting_id_idx ON meeting_action_items(meeting_id);
CREATE INDEX meeting_action_items_assigned_to_idx ON meeting_action_items(assigned_to);

-- Add trigger for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_meetings_updated_at
  BEFORE UPDATE ON meetings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_recordings_updated_at
  BEFORE UPDATE ON meeting_recordings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_notes_updated_at
  BEFORE UPDATE ON meeting_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_action_items_updated_at
  BEFORE UPDATE ON meeting_action_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;