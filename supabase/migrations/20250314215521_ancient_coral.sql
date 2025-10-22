/*
  # Add SQCDPE+ Daily Check-in Schema

  1. New Tables
    - daily_checkins: Core check-in data
    - checkin_categories: SQCDPE+ category status
    - checkin_actions: Action items for issues
    - checkin_comments: Team comments and notes

  2. Security
    - Enable RLS on all tables
    - Add policies for company-based access control
*/

-- Create status type for category feedback
CREATE TYPE category_status AS ENUM ('green', 'yellow', 'red');

-- Create action priority type
CREATE TYPE action_priority AS ENUM ('low', 'medium', 'high', 'critical');

-- Create daily checkins table
CREATE TABLE daily_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies NOT NULL,
  site_id uuid REFERENCES sites NOT NULL,
  department_id uuid REFERENCES departments NOT NULL,
  created_by uuid REFERENCES auth.users NOT NULL,
  shift_date date NOT NULL DEFAULT CURRENT_DATE,
  shift_type text NOT NULL,
  start_time timestamptz NOT NULL DEFAULT now(),
  end_time timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, site_id, department_id, shift_date, shift_type)
);

-- Create checkin categories table
CREATE TABLE checkin_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checkin_id uuid REFERENCES daily_checkins ON DELETE CASCADE NOT NULL,
  category text NOT NULL CHECK (category IN ('safety', 'quality', 'cost', 'delivery', 'people', 'environment', 'plus')),
  status category_status NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(checkin_id, category)
);

-- Create checkin actions table
CREATE TABLE checkin_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checkin_id uuid REFERENCES daily_checkins ON DELETE CASCADE NOT NULL,
  category text NOT NULL CHECK (category IN ('safety', 'quality', 'cost', 'delivery', 'people', 'environment', 'plus')),
  description text NOT NULL,
  root_cause text,
  corrective_action text,
  assigned_to uuid REFERENCES auth.users,
  due_date date,
  priority action_priority NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  created_by uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create checkin comments table
CREATE TABLE checkin_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checkin_id uuid REFERENCES daily_checkins ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkin_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkin_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for daily_checkins
CREATE POLICY "Users can view checkins from their company"
  ON daily_checkins
  FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id 
      FROM profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can create checkins for their company"
  ON daily_checkins
  FOR INSERT
  TO authenticated
  WITH CHECK (
    company_id IN (
      SELECT company_id 
      FROM profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own checkins"
  ON daily_checkins
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Create policies for checkin_categories
CREATE POLICY "Users can view categories from their company"
  ON checkin_categories
  FOR SELECT
  TO authenticated
  USING (
    checkin_id IN (
      SELECT id FROM daily_checkins
      WHERE company_id IN (
        SELECT company_id 
        FROM profiles 
        WHERE profiles.id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can create categories for their checkins"
  ON checkin_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (
    checkin_id IN (
      SELECT id FROM daily_checkins
      WHERE created_by = auth.uid()
    )
  );

-- Create policies for checkin_actions
CREATE POLICY "Users can view actions from their company"
  ON checkin_actions
  FOR SELECT
  TO authenticated
  USING (
    checkin_id IN (
      SELECT id FROM daily_checkins
      WHERE company_id IN (
        SELECT company_id 
        FROM profiles 
        WHERE profiles.id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can create and update actions"
  ON checkin_actions
  FOR ALL
  TO authenticated
  USING (
    checkin_id IN (
      SELECT id FROM daily_checkins
      WHERE company_id IN (
        SELECT company_id 
        FROM profiles 
        WHERE profiles.id = auth.uid()
      )
    )
  )
  WITH CHECK (
    checkin_id IN (
      SELECT id FROM daily_checkins
      WHERE company_id IN (
        SELECT company_id 
        FROM profiles 
        WHERE profiles.id = auth.uid()
      )
    )
  );

-- Create policies for checkin_comments
CREATE POLICY "Users can view comments from their company"
  ON checkin_comments
  FOR SELECT
  TO authenticated
  USING (
    checkin_id IN (
      SELECT id FROM daily_checkins
      WHERE company_id IN (
        SELECT company_id 
        FROM profiles 
        WHERE profiles.id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can create comments"
  ON checkin_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    checkin_id IN (
      SELECT id FROM daily_checkins
      WHERE company_id IN (
        SELECT company_id 
        FROM profiles 
        WHERE profiles.id = auth.uid()
      )
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_daily_checkins_company_id ON daily_checkins(company_id);
CREATE INDEX idx_daily_checkins_site_id ON daily_checkins(site_id);
CREATE INDEX idx_daily_checkins_department_id ON daily_checkins(department_id);
CREATE INDEX idx_daily_checkins_shift_date ON daily_checkins(shift_date);
CREATE INDEX idx_checkin_categories_checkin_id ON checkin_categories(checkin_id);
CREATE INDEX idx_checkin_actions_checkin_id ON checkin_actions(checkin_id);
CREATE INDEX idx_checkin_actions_assigned_to ON checkin_actions(assigned_to);
CREATE INDEX idx_checkin_comments_checkin_id ON checkin_comments(checkin_id);

-- Create function to get checkin stats
CREATE OR REPLACE FUNCTION get_checkin_stats(
  p_company_id uuid,
  p_site_id uuid DEFAULT NULL,
  p_department_id uuid DEFAULT NULL,
  p_start_date date DEFAULT CURRENT_DATE - INTERVAL '30 days',
  p_end_date date DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  category text,
  total_count bigint,
  green_count bigint,
  yellow_count bigint,
  red_count bigint,
  action_items_count bigint,
  completion_rate numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH category_stats AS (
    SELECT 
      cc.category,
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE cc.status = 'green') as green,
      COUNT(*) FILTER (WHERE cc.status = 'yellow') as yellow,
      COUNT(*) FILTER (WHERE cc.status = 'red') as red,
      COUNT(DISTINCT ca.id) as actions,
      COUNT(DISTINCT CASE WHEN ca.status = 'completed' THEN ca.id END) as completed_actions
    FROM daily_checkins dc
    JOIN checkin_categories cc ON dc.id = cc.checkin_id
    LEFT JOIN checkin_actions ca ON dc.id = ca.checkin_id AND cc.category = ca.category
    WHERE 
      dc.company_id = p_company_id
      AND (p_site_id IS NULL OR dc.site_id = p_site_id)
      AND (p_department_id IS NULL OR dc.department_id = p_department_id)
      AND dc.shift_date BETWEEN p_start_date AND p_end_date
    GROUP BY cc.category
  )
  SELECT 
    category,
    total as total_count,
    green as green_count,
    yellow as yellow_count,
    red as red_count,
    actions as action_items_count,
    ROUND((completed_actions::numeric / NULLIF(actions, 0) * 100), 2) as completion_rate
  FROM category_stats;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_checkin_stats TO authenticated;