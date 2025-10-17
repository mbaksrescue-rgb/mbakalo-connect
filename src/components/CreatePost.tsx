import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus, Video, Loader2 } from "lucide-react";

interface CreatePostProps {
  onPostCreated: () => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
      setVideoFile(null); // Clear video if image is selected
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Video must be less than 50MB",
          variant: "destructive",
        });
        return;
      }
      setVideoFile(file);
      setImageFile(null); // Clear image if video is selected
    }
  };

  const uploadFile = async (file: File, bucket: string, userId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Math.random()}.${fileExt}`;
    
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category) {
      toast({
        title: "Category required",
        description: "Please select a category for your post",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let imageUrl = null;
      let videoUrl = null;

      if (imageFile) {
        imageUrl = await uploadFile(imageFile, 'post-images', user.id);
      }

      if (videoFile) {
        videoUrl = await uploadFile(videoFile, 'post-videos', user.id);
      }

      const { error } = await supabase
        .from('posts')
        .insert({
          title,
          content,
          category,
          user_id: user.id,
          image_url: imageUrl,
          video_url: videoUrl,
        });

      if (error) throw error;

      toast({
        title: "Post created!",
        description: "Your post has been shared with the community",
      });

      // Reset form
      setTitle("");
      setContent("");
      setCategory("");
      setImageFile(null);
      setVideoFile(null);
      onPostCreated();
    } catch (error: any) {
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What's happening in Mbakalo?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gossip">Gossip</SelectItem>
                <SelectItem value="community politics">Community Politics</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image')?.click()}
                  className="w-full"
                  disabled={!!videoFile}
                >
                  <ImagePlus className="h-4 w-4 mr-2" />
                  {imageFile ? imageFile.name : "Add Image"}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video">Video</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('video')?.click()}
                  className="w-full"
                  disabled={!!imageFile}
                >
                  <Video className="h-4 w-4 mr-2" />
                  {videoFile ? videoFile.name : "Add Video"}
                </Button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Post...
              </>
            ) : (
              "Create Post"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
