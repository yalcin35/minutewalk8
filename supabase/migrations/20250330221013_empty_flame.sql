/*
  # Fix SQCDPE+ Relationships

  1. Changes
    - Fix relationship between daily_checkins and checkin_categories
    - Add proper indexes for performance
    - Create view for checkin details with user information

  2. Security
    - Maintain RLS policies
    - Grant appropriate permissions
*/

-- Create view for checkin details
CREATE OR REPLACE VIEW checkin_details AS
SELECT 
  dc.id,
  dc.company_id,
  dc.site_id,
  dc.department_id,
  dc.created_by,
  dc.shift_date,
  dc.shift_type,
  dc.start_time,
  dc.end_time,
  dc.notes,
  dc.created_at,
  dc.updated_at,
  p.full_name as creator_name,
  p.email as creator_email,
  s.name as site_name,
  d.name as department_name,
  (
    SELECT jsonb_agg(
      jsonb_build_object(
        'category', cc.category,
        'status', cc.status,
        'notes', cc.notes,
        'created_at', cc.created_at
      )
    )
    FROM checkin_categories cc
    WHERE cc.checkin_id = dc.id
  ) as categories,
  (
    SELECT jsonb_agg(
      jsonb_build_object(
        'category', ca.category,
        'description', ca.description,
        'status', ca.status,
        'priority', ca.priority
      )
    )
    FROM checkin_actions ca
    WHERE ca.checkin_id = dc.id
  ) as actions
FROM daily_checkins dc
JOIN profiles p ON dc.created_by = p.id
JOIN sites s ON dc.site_id = s.id
JOIN departments d ON dc.department_id = d.id
WHERE EXISTS (
  SELECT 1 FROM profiles viewer
  WHERE viewer.id = auth.uid()
  AND viewer.company_id = dc.company_id
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_checkin_categories_composite 
ON checkin_categories(checkin_id, category, status);

CREATE INDEX IF NOT EXISTS idx_checkin_actions_composite 
ON checkin_actions(checkin_id, category, status);

-- Grant necessary permissions
GRANT SELECT ON checkin_details TO authenticated;