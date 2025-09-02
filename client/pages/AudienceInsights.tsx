import { TrendingUp, BarChart3, Target, Eye, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AudienceInsights() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Audience & Trend Insights
            </h1>
            <p className="text-muted-foreground">
              Data-driven insights to help you understand your market
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Card */}
      <Card className="text-center py-16 bg-gradient-to-br from-primary/10 to-earth-500/5 border-primary/20">
        <CardHeader>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
            <BarChart3 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-foreground mb-4">
            Insights Dashboard Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 max-w-2xl mx-auto">
          <p className="text-lg text-muted-foreground">
            We're developing powerful analytics to help you understand market
            trends, customer preferences, and optimize your artisan business
            strategy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="flex flex-col items-center gap-2 p-4">
              <Target className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Audience Analysis</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Market Trends</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <PieChart className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Sales Analytics</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <Eye className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Engagement Metrics</span>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Want detailed market insights for artisan businesses? Tell us what
              data would be most valuable for growing your craft.
            </p>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Request Analytics Features
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
