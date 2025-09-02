import { User, Settings, Camera, Award, BookOpen, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
            <User className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Artisan Profile
            </h1>
            <p className="text-muted-foreground">
              Showcase your craft, story, and portfolio to the world
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Card */}
      <Card className="text-center py-16 bg-gradient-to-br from-secondary/10 to-earth-500/5 border-secondary/20">
        <CardHeader>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20">
            <Settings className="h-10 w-10 text-secondary-foreground" />
          </div>
          <CardTitle className="text-2xl text-foreground mb-4">
            Profile Builder Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 max-w-2xl mx-auto">
          <p className="text-lg text-muted-foreground">
            We're creating a beautiful profile system where you can showcase
            your artisan journey, portfolio, and connect with art lovers
            worldwide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center gap-3 p-4">
              <Camera className="h-8 w-8 text-secondary-foreground" />
              <div className="text-center">
                <div className="text-sm font-medium">Portfolio Gallery</div>
                <div className="text-xs text-muted-foreground">
                  Showcase your best work
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
              <BookOpen className="h-8 w-8 text-secondary-foreground" />
              <div className="text-center">
                <div className="text-sm font-medium">Artisan Bio</div>
                <div className="text-xs text-muted-foreground">
                  Tell your story
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
              <Award className="h-8 w-8 text-secondary-foreground" />
              <div className="text-center">
                <div className="text-sm font-medium">Achievements</div>
                <div className="text-xs text-muted-foreground">
                  Display your credentials
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="p-4 bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-earth-500" />
                <span className="text-sm font-medium">Craft Specialties</span>
              </div>
              <p className="text-xs text-muted-foreground">
                List your skills and specializations
              </p>
            </Card>
            <Card className="p-4 bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-earth-500" />
                <span className="text-sm font-medium">Contact Info</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Let customers find and reach you
              </p>
            </Card>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Ready to build your artisan profile? Let us know what features
              would best represent your craft and connect you with your
              audience.
            </p>
            <Button
              variant="outline"
              className="border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground"
            >
              Help Build This Feature
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
