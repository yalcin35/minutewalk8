/*
  # Update Meeting Types

  1. Changes
    - Add new meeting types to the meeting_type enum:
      - pre_shift (Pre-Shift Briefing)
      - post_shift (Post-Shift Review)

  2. Notes
    - Preserves existing meeting types
    - Maintains backward compatibility
*/

-- First create a backup of the existing enum type
CREATE TYPE meeting_type_new AS ENUM (
  'gemba_walk',
  'safety_review',
  'quality_review',
  'production_review',
  'pre_shift',
  'post_shift',
  'improvement_workshop',
  'other'
);

-- Update existing data to use compatible types
UPDATE meetings 
SET meeting_type = 'other'::meeting_type 
WHERE meeting_type NOT IN (
  'gemba_walk',
  'safety_review',
  'quality_review',
  'production_review',
  'improvement_workshop',
  'other'
);

-- Drop the old type and rename the new one
ALTER TABLE meetings ALTER COLUMN meeting_type DROP DEFAULT;
ALTER TABLE meetings ALTER COLUMN meeting_type TYPE meeting_type_new USING meeting_type::text::meeting_type_new;
DROP TYPE meeting_type;
ALTER TYPE meeting_type_new RENAME TO meeting_type;

-- Set default back
ALTER TABLE meetings ALTER COLUMN meeting_type SET DEFAULT 'other'::meeting_type;