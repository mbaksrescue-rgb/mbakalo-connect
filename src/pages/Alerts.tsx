import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MapPin, Clock, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";

const Alerts = () => {
  // Sample data - will be replaced with real data from Supabase
  const alerts = [
    {
      id: 1,
      title: "Road Accident on Mbakalo Main Road",
      description: "Vehicle collision near the market. Medical assistance needed.",
      location: "Mbakalo Market Junction",
      status: "active",
      timestamp: "15 minutes ago",
    },
    {
      id: 2,
      title: "Fire Outbreak Contained",
      description: "Small fire in residential area successfully contained by local team.",
      location: "Mbakalo East",
      status: "resolved",
      timestamp: "2 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8 space-y-6 pb-24 md:pb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Emergency Alerts</h1>
            <p className="text-muted-foreground">Real-time emergency updates from Mbakalo Ward</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Report Emergency</span>
          </Button>
        </div>

        <div className="grid gap-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-5 w-5 ${alert.status === 'active' ? 'text-destructive' : 'text-muted-foreground'}`} />
                      <CardTitle className="text-xl">{alert.title}</CardTitle>
                    </div>
                    <CardDescription>{alert.description}</CardDescription>
                  </div>
                  <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                    {alert.status === 'active' ? 'Active' : 'Resolved'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {alert.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {alert.timestamp}
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

export default Alerts;