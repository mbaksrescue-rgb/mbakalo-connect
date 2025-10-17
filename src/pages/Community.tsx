import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, Share2, Clock, LogOut } from "lucide-react";
import Navigation from "@/components/Navigation";
import CreatePost from "@/components/CreatePost";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url: string | null;
  video_url: string | null;
  created_at: string;
  profiles: {
    username: string;
  };
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (!session) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles (
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (selectedFilter !== "All") {
        query = query.eq('category', selectedFilter.toLowerCase());
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading posts",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated, selectedFilter]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffMs = now.getTime() - posted.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "events":
        return "bg-primary/10 text-primary";
      case "community politics":
        return "bg-accent/10 text-accent-foreground";
      case "gossip":
        return "bg-secondary text-secondary-foreground";
      case "news":
        return "bg-blue-500/10 text-blue-600";
      case "business":
        return "bg-purple-500/10 text-purple-600";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8 space-y-6 pb-24 md:pb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Feed</h1>
            <p className="text-muted-foreground">Stay connected with news and conversations from Mbakalo</p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <CreatePost onPostCreated={fetchPosts} />

        <div className="flex gap-2 flex-wrap">
          {["All", "Gossip", "Community Politics", "Events", "News", "Business"].map((filter) => (
            <Button
              key={filter}
              variant={filter === selectedFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{post.content}</CardDescription>
                    
                    {post.image_url && (
                      <div className="mt-4">
                        <img 
                          src={post.image_url} 
                          alt="Post image" 
                          className="rounded-lg max-h-96 w-full object-cover"
                        />
                      </div>
                    )}
                    
                    {post.video_url && (
                      <div className="mt-4">
                        <video 
                          src={post.video_url} 
                          controls 
                          className="rounded-lg max-h-96 w-full"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{post.profiles.username}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(post.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="gap-4 border-t pt-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
