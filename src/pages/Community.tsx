import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, Share2, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";

const Community = () => {
  // Sample data - will be replaced with real data from Supabase
  const posts = [
    {
      id: 1,
      title: "Ward Development Meeting This Saturday",
      content: "Join us for a community meeting to discuss upcoming development projects in Mbakalo Ward.",
      category: "Events",
      author: "MCA Office Mbakalo",
      timestamp: "1 hour ago",
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      title: "New Water Point Installed in Mbakalo East",
      content: "Residents of East Mbakalo now have access to clean water thanks to the new borehole project.",
      category: "Politics",
      author: "Team Leader Iveen",
      timestamp: "3 hours ago",
      likes: 89,
      comments: 24,
    },
    {
      id: 3,
      title: "Did You Hear About the Market Extension?",
      content: "Word on the street is that our local market is getting expanded! More vendors coming soon.",
      category: "Gossip",
      author: "Community Member",
      timestamp: "5 hours ago",
      likes: 23,
      comments: 8,
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Events":
        return "bg-primary/10 text-primary";
      case "Politics":
        return "bg-accent/10 text-accent-foreground";
      case "Gossip":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8 space-y-6 pb-24 md:pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Feed</h1>
          <p className="text-muted-foreground">Stay connected with news and conversations from Mbakalo</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {["All", "Events", "Politics", "Gossip", "Business"].map((filter) => (
            <Button
              key={filter}
              variant={filter === "All" ? "default" : "outline"}
              size="sm"
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{post.author}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="gap-4 border-t pt-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  {post.comments}
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