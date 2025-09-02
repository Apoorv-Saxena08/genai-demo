import { Link } from "react-router-dom";
import {
  Feather,
  Megaphone,
  TrendingUp,
  User,
  ArrowRight,
  Sparkles,
  Heart,
  Camera,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quickLinks = [
  {
    title: "Share Your Story",
    description: "Tell the world about your craft and creative journey",
    icon: Feather,
    href: "/storyteller",
    color: "bg-palette-coral/10 hover:bg-palette-coral/20",
    iconColor: "text-palette-coral",
  },
  {
    title: "Market Your Art",
    description: "Get help creating content for social media platforms",
    icon: Megaphone,
    href: "/marketing",
    color: "bg-palette-yellow/10 hover:bg-palette-yellow/20",
    iconColor: "text-palette-yellow",
  },
  {
    title: "Discover Trends",
    description: "Explore market insights and audience preferences",
    icon: TrendingUp,
    href: "/insights",
    color: "bg-palette-teal/10 hover:bg-palette-teal/20",
    iconColor: "text-palette-teal",
  },
  {
    title: "Your Profile",
    description: "Manage your artisan profile and showcase your portfolio",
    icon: User,
    href: "/profile",
    color: "bg-palette-peach/10 hover:bg-palette-peach/20",
    iconColor: "text-palette-peach",
  },
];

const stats = [
  {
    label: "Stories Shared",
    value: "12",
    icon: Heart,
    color: "text-palette-coral",
  },
  {
    label: "Photos Uploaded",
    value: "48",
    icon: Camera,
    color: "text-palette-yellow",
  },
  {
    label: "Marketing Posts",
    value: "7",
    icon: Sparkles,
    color: "text-palette-teal",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, Artisan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Your creative journey continues here. Share your stories, connect
            with your audience, and grow your artisan business with the tools
            designed just for you.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card/50 border-border/50">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
          <p className="text-muted-foreground">
            Jump into the tools that help you craft and share your story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickLinks.map((link) => (
            <Card
              key={link.title}
              className="group relative overflow-hidden bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${link.color} transition-colors`}
                  >
                    <link.icon className={`h-6 w-6 ${link.iconColor}`} />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <CardTitle className="text-xl text-foreground">
                  {link.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4">{link.description}</p>
                <Button
                  asChild
                  variant="ghost"
                  className="inline-flex justify-start p-0 h-auto font-medium text-primary hover:text-primary hover:bg-primary/10 rounded-md px-2 py-1 transition-colors"
                >
                  <Link to={link.href} className="flex items-center gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Inspiration Section */}
      <Card className="bg-gradient-to-r from-palette-coral/10 to-palette-yellow/10 border-palette-coral/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5 text-palette-coral" />
            Daily Inspiration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="text-lg italic text-foreground/90 mb-4">
            "Every piece you create tells a story. Every story connects hearts.
            Every connection builds a community."
          </blockquote>
          <p className="text-sm text-muted-foreground">
            Start sharing your craft story today and inspire others on their
            creative journey.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
