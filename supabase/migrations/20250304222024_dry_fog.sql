-- Create meeting_insights table
CREATE TABLE IF NOT EXISTS meeting_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid REFERENCES meetings ON DELETE CASCADE NOT NULL,
  summary jsonb NOT NULL,
  sqcdpe jsonb NOT NULL,
  action_items jsonb NOT NULL,
  recommendations jsonb NOT NULL,
  follow_up jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add created_by relationship to meeting_notes if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'meeting_notes' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE meeting_notes 
    ADD COLUMN created_by uuid REFERENCES auth.users,
    ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Enable RLS on meeting_insights
ALTER TABLE meeting_insights ENABLE ROW LEVEL SECURITY;

-- Create policies for meeting_insights
CREATE POLICY "Users can view meeting insights from their company"
  ON meeting_insights
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meetings m
      JOIN profiles p ON p.company_id = m.company_id
      WHERE m.id = meeting_insights.meeting_id
      AND p.id = auth.uid()
    )
  );

CREATE POLICY "Users can create meeting insights"
  ON meeting_insights
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM meetings m
      JOIN profiles p ON p.company_id = m.company_id
      WHERE m.id = meeting_insights.meeting_id
      AND p.id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meeting_insights_meeting_id 
  ON meeting_insights(meeting_id);

-- Update trigger for updated_at
CREATE TRIGGER update_meeting_insights_updated_at
  BEFORE UPDATE ON meeting_insights
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON meeting_insights TO authenticated;