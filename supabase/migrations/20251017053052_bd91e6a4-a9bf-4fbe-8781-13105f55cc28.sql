-- Create storage buckets for post media
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('post-images', 'post-images', true),
  ('post-videos', 'post-videos', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for post-images bucket
CREATE POLICY "Anyone can view post images"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

CREATE POLICY "Authenticated users can upload post images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'post-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can update their own post images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'post-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own post images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'post-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS policies for post-videos bucket
CREATE POLICY "Anyone can view post videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-videos');

CREATE POLICY "Authenticated users can upload post videos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'post-videos' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can update their own post videos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'post-videos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own post videos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'post-videos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Add video_url column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS video_url text;