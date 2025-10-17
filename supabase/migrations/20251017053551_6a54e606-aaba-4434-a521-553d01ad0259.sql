-- Add location and profession fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS profession text,
ADD COLUMN IF NOT EXISTS bio text;