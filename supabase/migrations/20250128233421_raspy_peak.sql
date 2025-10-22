/*
  # Add default user levels

  1. Changes
    - Add default level (5) for existing users
    - Add trigger to set default level for new users

  2. Security
    - Maintain existing RLS policies
*/

-- Insert default level for existing users
INSERT INTO user_levels (user_id, level)
SELECT id, 5
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- Create function to set default user level
CREATE OR REPLACE FUNCTION public.handle_new_user_level()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_levels (user_id, level)
  VALUES (new.id, 5);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to set default level for new users
CREATE TRIGGER on_auth_user_created_set_level
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_level();