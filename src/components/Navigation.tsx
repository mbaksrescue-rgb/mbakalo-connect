import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, AlertTriangle, Briefcase, MessageSquare, Shield, User } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/alerts", icon: AlertTriangle, label: "Alerts" },
    { path: "/business", icon: Briefcase, label: "Business" },
    { path: "/community", icon: MessageSquare, label: "Community" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            Mbakalo Rescue
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>

        <Link to="/auth">
          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Sign In</span>
          </Button>
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="flex-col h-auto py-2 px-3 gap-1"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;