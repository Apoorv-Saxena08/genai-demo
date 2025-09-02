import { Megaphone, Instagram, Users, Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MarketingAssistant() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
            <Megaphone className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Marketing Assistant
            </h1>
            <p className="text-muted-foreground">
              AI-powered tools to help you market your artisan creations
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Card */}
      <Card className="text-center py-16 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
        <CardHeader>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
            <Wand2 className="h-10 w-10 text-accent" />
          </div>
          <CardTitle className="text-2xl text-foreground mb-4">
            Marketing Magic Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 max-w-2xl mx-auto">
          <p className="text-lg text-muted-foreground">
            We're crafting powerful marketing tools to help you connect with
            your audience and grow your artisan business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="flex flex-col items-center gap-2 p-4">
              <Instagram className="h-8 w-8 text-accent" />
              <span className="text-sm font-medium">Social Media Posts</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <Users className="h-8 w-8 text-accent" />
              <span className="text-sm font-medium">Audience Targeting</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <Megaphone className="h-8 w-8 text-accent" />
              <span className="text-sm font-medium">Campaign Creation</span>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Want to see this feature built out? Let us know what marketing
              tools would be most helpful for your artisan business.
            </p>
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              Request This Feature
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
