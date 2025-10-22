/*
  # Fix SQCDPE+ Migration

  1. Changes
    - Add indexes for better performance
    - Create function to get checkin stats
    - Grant necessary permissions
*/

-- Create indexes for better performance if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'idx_daily_checkins_company_id'
  ) THEN
    CREATE INDEX idx_daily_checkins_company_id ON daily_checkins(company_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'idx_daily_checkins_site_id'
  ) THEN
    CREATE INDEX idx_daily_checkins_site_id ON daily_checkins(site_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'idx_daily_checkins_department_id'
  ) THEN
    CREATE INDEX idx_daily_checkins_department_id ON daily_checkins(department_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'idx_daily_checkins_shift_date'
  ) THEN
    CREATE INDEX idx_daily_checkins_shift_date ON daily_checkins(shift_date);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'idx_checkin_categories_checkin_id'
  ) THEN
    CREATE INDEX idx_checkin_categories_checkin_id ON checkin_categories(checkin_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'idx_checkin_actions_checkin_id'
  ) THEN
    CREATE INDEX idx_checkin_actions_checkin_id ON checkin_actions(checkin_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'idx_checkin_actions_assigned_to'
  ) THEN
    CREATE INDEX idx_checkin_actions_assigned_to ON checkin_actions(assigned_to);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'idx_checkin_comments_checkin_id'
  ) THEN
    CREATE INDEX idx_checkin_comments_checkin_id ON checkin_comments(checkin_id);
  END IF;
END $$;

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