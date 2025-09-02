import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Star,
  Users,
  Sparkles,
  ShoppingBag,
  Palette,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: 1,
    name: "Hand-woven Wool Scarf",
    artisan: "Emma Chen",
    image: "/scarf1-new.jpg",
    rating: 5,
    price: "₹89",
  },
  {
    id: 2,
    name: "Artisan Crafted Scarf",
    artisan: "Marcus Rivera",
    image: "/scarf2-new.jpg",
    rating: 5,
    price: "₹156",
  },
  {
    id: 3,
    name: "Premium Wool Scarf",
    artisan: "Sofia Andersson",
    image: "/scarf3-new.jpg",
    rating: 4,
    price: "₹65",
  },
];

const featuredArtisans = [
  {
    name: "Emma Chen",
    craft: "Textile Arts",
    location: "Portland, OR",
    image: "/artist1.avif",
    products: 24,
  },
  {
    name: "Marcus Rivera",
    craft: "Ceramics",
    location: "Santa Fe, NM",
    image: "/artist2.avif",
    products: 18,
  },
  {
    name: "Sofia Andersson",
    craft: "Leatherwork",
    location: "Stockholm, SE",
    image: "/artist3.avif",
    products: 31,
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Crafted with Care",
    description: "Every piece tells a story of passion and dedication",
  },
  {
    icon: Users,
    title: "Support Local Artisans",
    description: "Direct purchases help artisans build sustainable businesses",
  },
  {
    icon: Award,
    title: "Unique & Authentic",
    description: "One-of-a-kind pieces you won't find anywhere else",
  },
];

export default function Homepage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#935D43] to-[#7B4A36] py-20 lg:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white dark:bg-muted/30 dark:text-foreground text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  Crafted with Care
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white dark:text-foreground leading-tight">
                  Discover <span className="text-palette-coral">Unique Crafts</span>{" "}
                  from Talented Artisans
                </h1>
                <p className="text-xl text-white/90 dark:text-muted-foreground leading-relaxed">
                  Connect with passionate artisans and discover one-of-a-kind,
                  handcrafted treasures that tell meaningful stories. Every
                  purchase supports creative dreams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-lg bg-palette-coral hover:bg-palette-coral/90"
                >
                  <Link to="/marketplace" className="flex items-center gap-2">
                    Discover Unique Crafts
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg"
                >
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Join as Artisan
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-palette-coral">500+</div>
                  <div className="text-sm text-white/80 dark:text-muted-foreground">Artisans</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-palette-coral">2,000+</div>
                  <div className="text-sm text-white/80 dark:text-muted-foreground">
                    Unique Items
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-palette-coral">10,000+</div>
                  <div className="text-sm text-white/80 dark:text-muted-foreground">
                    Happy Customers
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-palette-coral/20 to-palette-yellow/20">
                <img
                  src="/hero.jpg" 
                  alt="Artisan at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating cards */}
              <Card className="absolute -left-4 top-16 w-48 bg-background/95 backdrop-blur shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-palette-coral/10 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-palette-coral" />
                    </div>
                    <div>
                      <div className="font-semibold">Handcrafted</div>
                      <div className="text-sm text-muted-foreground">
                        with Love
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="absolute -right-4 bottom-16 w-48 bg-background/95 backdrop-blur shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-palette-yellow/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-palette-yellow" />
                    </div>
                    <div>
                      <div className="font-semibold">Authentic</div>
                      <div className="text-sm text-muted-foreground">
                        & Unique
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Why Choose Artisan Muse?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the joy of owning something truly special while
              supporting passionate creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center group hover:shadow-lg transition-all duration-300 border-border/50"
              >
                <CardContent className="p-8">
                  <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-palette-coral/10 flex items-center justify-center group-hover:bg-palette-coral/20 transition-colors">
                    <benefit.icon className="h-8 w-8 text-palette-coral" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Featured Crafts
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover our most loved handcrafted pieces
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link to="/marketplace" className="flex items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block"
              >
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: product.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-accent text-accent"
                          />
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground">
                        by {product.artisan}
                      </p>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-2xl font-bold text-primary">
                          {product.price}
                        </span>
                        <Button
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Meet Our Artisans
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Talented creators from around the world sharing their passion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtisans.map((artisan, index) => (
              <Link
                key={index}
                to={`/artisan/${artisan.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block"
              >
                <Card className="text-center group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="mx-auto mb-6 h-24 w-24 rounded-full overflow-hidden bg-muted">
                      <img
                        src={artisan.image}
                        alt={artisan.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {artisan.name}
                    </h3>
                    <p className="text-primary font-medium mb-1">
                      {artisan.craft}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {artisan.location}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      {artisan.products} products
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Ready to Discover Something Special?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of art lovers who have found their perfect
              handcrafted treasures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-lg bg-primary hover:bg-primary/90"
              >
                <Link to="/marketplace" className="flex items-center gap-2">
                  Discover Unique Crafts
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg"
              >
                <Link to="/dashboard" className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Become an Artisan
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
