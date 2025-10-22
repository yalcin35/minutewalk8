-- Create function to get Gemba-specific statistics
CREATE OR REPLACE FUNCTION get_gemba_stats(
  p_company_id uuid DEFAULT NULL,
  p_site_id uuid DEFAULT NULL,
  p_department_id uuid DEFAULT NULL,
  p_days_back integer DEFAULT 30
)
RETURNS TABLE (
  avg_score numeric,
  critical_issues bigint,
  total_audits bigint,
  process_efficiency_rate numeric,
  engagement_score numeric
) 
SECURITY DEFINER
AS $$
BEGIN
  -- Check if user has access to the requested company
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid()
    AND company_id = COALESCE(p_company_id, company_id)
  ) THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT 
    ROUND(AVG((a.data->>'score')::numeric), 2) as avg_score,
    COUNT(DISTINCT CASE WHEN (a.data->>'critical_issues')::integer > 0 THEN a.id END) as critical_issues,
    COUNT(DISTINCT a.id) as total_audits,
    -- Calculate process efficiency rate (percentage of scores >= 4)
    ROUND(
      (COUNT(DISTINCT CASE WHEN (a.data->>'score')::numeric >= 4 THEN a.id END)::numeric / 
       NULLIF(COUNT(DISTINCT a.id), 0)::numeric) * 100, 
      2
    ) as process_efficiency_rate,
    -- Calculate engagement score (average score for people engagement questions)
    ROUND(
      AVG(
        CASE 
          WHEN EXISTS (
            SELECT 1 
            FROM jsonb_array_elements(a.data->'answers') as ans 
            WHERE (ans->>'questionId')::integer BETWEEN 6 AND 10
          ) 
          THEN (
            SELECT AVG((ans->>'rating')::numeric)
            FROM jsonb_array_elements(a.data->'answers') as ans 
            WHERE (ans->>'questionId')::integer BETWEEN 6 AND 10
          )
          ELSE NULL
        END
      ), 
      2
    ) as engagement_score
  FROM audits a
  JOIN audit_setups aus ON a.setup_id = aus.id
  WHERE 
    aus.audit_type = 'gemba'
    AND a.created_at >= NOW() - (p_days_back || ' days')::interval
    AND (p_company_id IS NULL OR a.company_id = p_company_id)
    AND (p_site_id IS NULL OR aus.site_id = p_site_id)
    AND (p_department_id IS NULL OR aus.department_id = p_department_id);
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_gemba_stats(uuid, uuid, uuid, integer) TO authenticated;