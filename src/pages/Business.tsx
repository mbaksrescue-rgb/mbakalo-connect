import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Phone, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";

const Business = () => {
  // Sample data - will be replaced with real data from Supabase
  const businesses = [
    {
      id: 1,
      name: "Mbakalo General Store",
      description: "Your one-stop shop for groceries and household items",
      category: "Shop",
      contact: "0712345678",
      location: "Mbakalo Center",
    },
    {
      id: 2,
      name: "Tech Solutions Kenya",
      description: "Hiring: Web Developer (Junior Level)",
      category: "Job",
      contact: "0723456789",
      location: "Remote/Mbakalo",
    },
    {
      id: 3,
      name: "Mama Njeri's Catering",
      description: "Professional catering services for all events",
      category: "Service",
      contact: "0734567890",
      location: "Mbakalo West",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Shop":
        return "bg-primary/10 text-primary";
      case "Job":
        return "bg-accent/10 text-accent-foreground";
      case "Service":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8 space-y-6 pb-24 md:pb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Business Hub</h1>
            <p className="text-muted-foreground">Discover local businesses, services, and job opportunities</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Post Listing</span>
          </Button>
        </div>

        <div className="grid gap-4">
          {businesses.map((business) => (
            <Card key={business.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">{business.name}</CardTitle>
                      <Badge className={getCategoryColor(business.category)}>
                        {business.category}
                      </Badge>
                    </div>
                    <CardDescription>{business.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {business.location}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {business.contact}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Business;