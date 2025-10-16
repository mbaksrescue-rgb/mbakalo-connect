import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Users, Briefcase, MessageCircle, Shield, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-rescue.jpg";
import emergencyIcon from "@/assets/emergency-icon.png";
import communityIcon from "@/assets/community-icon.png";
import businessIcon from "@/assets/business-icon.png";

const Home = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: "Emergency Alerts",
      description: "Report emergencies instantly with location and photos. Our team responds quickly to keep the community safe.",
      image: emergencyIcon,
      link: "/alerts",
      color: "bg-destructive/10 text-destructive",
    },
    {
      icon: Users,
      title: "Community News",
      description: "Stay updated with local news, events, politics, and what's happening in Mbakalo Ward.",
      image: communityIcon,
      link: "/community",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Briefcase,
      title: "Business Hub",
      description: "Discover local businesses, job opportunities, and services. Support your community economy.",
      image: businessIcon,
      link: "/business",
      color: "bg-accent/10 text-accent-foreground",
    },
  ];

  const stats = [
    { label: "Active Members", value: "500+", icon: Users },
    { label: "Alerts Resolved", value: "150+", icon: Shield },
    { label: "Local Businesses", value: "80+", icon: Briefcase },
    { label: "Ward Coverage", value: "100%", icon: MapPin },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container py-12 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-500">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Shield className="h-4 w-4" />
                Serving Mbakalo Ward
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your Community
                <span className="block bg-gradient-to-r from-primary via-primary-hover to-accent bg-clip-text text-transparent">
                  Safety First
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                Connecting neighbors, coordinating emergencies, and building a stronger Mbakalo community together.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/alerts">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary-hover hover:opacity-90 transition-opacity">
                    <AlertTriangle className="h-5 w-5" />
                    Report Emergency
                  </Button>
                </Link>
                <Link to="/community">
                  <Button size="lg" variant="outline" className="gap-2">
                    <MessageCircle className="h-5 w-5" />
                    View News Feed
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right duration-700">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Mbakalo Rescue Team in action"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Everything Your Community Needs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From emergency response to local business discovery, we've got Mbakalo covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                      <img src={feature.image} alt={feature.title} className="w-10 h-10" />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={feature.link}>
                      <Button variant="ghost" className="w-full group-hover:bg-primary/5">
                        Learn More →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Join Mbakalo Rescue Team Today
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Be part of a community that looks out for one another. Sign up to report alerts, share news, and connect with neighbors.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="gap-2">
              <Users className="h-5 w-5" />
              Create Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;