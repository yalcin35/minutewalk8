/*
  # Add user level and audit stats tables

  1. New Tables
    - `user_levels` - Stores user level assignments
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `level` (integer)
      - `created_at` (timestamp)

  2. Changes
    - Remove level from audit_setups table
    - Add user level tracking
    - Add audit stats materialized view

  3. Security
    - Enable RLS on new tables
    - Add appropriate policies
*/

-- Drop level from audit_setups
ALTER TABLE audit_setups DROP COLUMN level;

-- Create user_levels table
CREATE TABLE IF NOT EXISTS user_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  level integer NOT NULL CHECK (level BETWEEN 1 AND 5),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE user_levels ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own level"
  ON user_levels
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create materialized view for audit stats
CREATE MATERIALIZED VIEW audit_stats AS
WITH stats AS (
  SELECT
    a.company_id,
    s.id as site_id,
    d.id as department_id,
    COUNT(DISTINCT a.id) as total_audits,
    AVG((a.data->>'score')::numeric) as avg_score,
    COUNT(DISTINCT CASE 
      WHEN (a.data->>'critical_issues')::integer > 0 
      THEN a.id 
    END) as critical_issues,
    COUNT(DISTINCT CASE 
      WHEN a.created_at >= NOW() - INTERVAL '30 days' 
      THEN a.id 
    END) as recent_audits
  FROM audits a
  LEFT JOIN audit_setups aus ON a.setup_id = aus.id
  LEFT JOIN sites s ON aus.site_id = s.id
  LEFT JOIN departments d ON aus.department_id = d.id
  GROUP BY a.company_id, s.id, d.id
)
SELECT
  company_id,
  site_id,
  department_id,
  total_audits,
  ROUND(avg_score::numeric, 2) as avg_score,
  critical_issues,
  recent_audits,
  NOW() as refreshed_at
FROM stats;

-- Create index for better query performance
CREATE UNIQUE INDEX audit_stats_composite_idx ON audit_stats (company_id, COALESCE(site_id, '00000000-0000-0000-0000-000000000000'::uuid), COALESCE(department_id, '00000000-0000-0000-0000-000000000000'::uuid));

-- Create refresh function
CREATE OR REPLACE FUNCTION refresh_audit_stats()
RETURNS trigger AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY audit_stats;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to refresh stats
CREATE TRIGGER refresh_audit_stats_trigger
AFTER INSERT OR UPDATE OR DELETE ON audits
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_audit_stats();

-- Grant access to authenticated users
GRANT SELECT ON audit_stats TO authenticated;