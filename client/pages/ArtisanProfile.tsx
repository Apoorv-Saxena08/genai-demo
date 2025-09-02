import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Calendar,
  Award,
  Heart,
  Share2,
  Grid3X3,
  List,
  Filter,
  ArrowLeft,
  Mail,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types for mock data
interface ArtisanProfileData {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  location: string;
  memberSince: string;
  specialties: string[];
  rating: number;
  totalReviews: number;
  totalProducts: number;
  totalSales: number;
  bio: string;
  journey: string;
  achievements: string[];
  philosophy: string;
  studioInfo: {
    name: string;
    address: string;
    hours: string;
    visitorsWelcome: boolean;
  };
  socialStats: {
    followers: number;
    following: number;
    posts: number;
  };
}

interface ProductItem {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  featured: boolean;
}

// Per-artisan mock data (replace with API in real app)
const artisansById: Record<string, ArtisanProfileData> = {
  "emma-chen": {
    id: "emma-chen",
    name: "Emma Chen",
    avatar: "/woolArtisian.jpg",
    coverImage: "/woolArtisian.jpg",
    location: "Portland, OR",
    memberSince: "2019",
    specialties: ["Hand-weaving", "Natural Dyeing", "Textile Design"],
    rating: 4.9,
    totalReviews: 127,
    totalProducts: 6,
    totalSales: 342,
    bio: `I'm a third-generation textile artisan passionate about preserving traditional hand-weaving techniques while creating contemporary pieces that tell meaningful stories.`,
    journey: `My artistic journey began in my grandmother's weaving studio in rural Oregon...`,
    achievements: [
      "Featured Artist - Portland Art Museum (2023)",
      "Best in Show - Pacific Northwest Textile Fair (2022)",
      "Sustainability Award - Oregon Craft Council (2021)",
      "Rising Artist Grant - Regional Arts Council (2020)",
    ],
    philosophy:
      "Every thread tells a story, every weave builds a bridge between past and future.",
    studioInfo: {
      name: "Chen Weaving Studio",
      address: "1234 Artisan Way, Portland, OR 97210",
      hours: "By appointment only",
      visitorsWelcome: true,
    },
    socialStats: { followers: 1540, following: 89, posts: 156 },
  },
  "marcus-rivera": {
    id: "marcus-rivera",
    name: "Marcus Rivera",
    avatar: "/artist2.avif",
    coverImage: "/ceramic-tea-set.jpg",
    location: "Santa Fe, NM",
    memberSince: "2018",
    specialties: ["Ceramics", "Glazing", "Wheel Throwing"],
    rating: 4.8,
    totalReviews: 98,
    totalProducts: 3,
    totalSales: 410,
    bio: "Ceramic artist focusing on traditional glazing techniques and functional art.",
    journey: "Started in a community studio and now runs a small ceramic workshop...",
    achievements: ["Regional Ceramics Award (2021)", "Gallery Feature (2022)"],
    philosophy: "Form meets function; beauty in daily rituals.",
    studioInfo: {
      name: "Rivera Ceramics",
      address: "200 Clay Rd, Santa Fe, NM",
      hours: "Wed-Sun 11am-5pm",
      visitorsWelcome: true,
    },
    socialStats: { followers: 980, following: 120, posts: 204 },
  },
  "sofia-andersson": {
    id: "sofia-andersson",
    name: "Sofia Andersson",
    avatar: "/artist3.avif",
    coverImage: "/leather-journal.jpg",
    location: "Stockholm, Sweden",
    memberSince: "2020",
    specialties: ["Leatherwork", "Hand-binding"],
    rating: 4.7,
    totalReviews: 76,
    totalProducts: 2,
    totalSales: 240,
    bio: "Leather artisan crafting journals and accessories.",
    journey: "Apprenticed under a master bookbinder before launching her brand...",
    achievements: ["Design Fair Finalist (2022)"],
    philosophy: "Tactile materials, timeless design.",
    studioInfo: {
      name: "Andersson Atelier",
      address: "14 Gamla Stan, Stockholm",
      hours: "By appointment",
      visitorsWelcome: false,
    },
    socialStats: { followers: 720, following: 45, posts: 132 },
  },
  "david-park": {
    id: "david-park",
    name: "David Park",
    avatar: "/artist1.avif",
    coverImage: "/wooden-bowl-set.jpg",
    location: "Seattle, WA",
    memberSince: "2017",
    specialties: ["Woodturning", "Sustainable Sourcing"],
    rating: 4.9,
    totalReviews: 84,
    totalProducts: 2,
    totalSales: 520,
    bio: "Woodworker making functional bowls and utensils.",
    journey: "From hobbyist to full-time woodturner...",
    achievements: ["Craftsman of the Year (2020)"],
    philosophy: "Respect the grain.",
    studioInfo: {
      name: "Park Woodworks",
      address: "88 Pine St, Seattle, WA",
      hours: "Mon-Fri 10am-4pm",
      visitorsWelcome: true,
    },
    socialStats: { followers: 1350, following: 60, posts: 186 },
  },
  "luna-martinez": {
    id: "luna-martinez",
    name: "Luna Martinez",
    avatar: "/artist2.avif",
    coverImage: "/glass-pendant-necklace.jpg",
    location: "Austin, TX",
    memberSince: "2021",
    specialties: ["Glassblowing", "Jewelry"],
    rating: 4.6,
    totalReviews: 54,
    totalProducts: 2,
    totalSales: 150,
    bio: "Creates handblown glass jewelry with vibrant colors.",
    journey: "Trained in glass studios around the Southwest...",
    achievements: ["Emerging Artist Showcase (2023)"],
    philosophy: "Light, color, and motion.",
    studioInfo: {
      name: "Luna Glass Studio",
      address: "50 Rio Grande, Austin, TX",
      hours: "Sat-Sun 12pm-6pm",
      visitorsWelcome: true,
    },
    socialStats: { followers: 510, following: 77, posts: 92 },
  },
  "aisha-johnson": {
    id: "aisha-johnson",
    name: "Aisha Johnson",
    avatar: "/artist3.avif",
    coverImage: "/woven-basket.jpg",
    location: "Accra, Ghana",
    memberSince: "2016",
    specialties: ["Weaving", "Natural Fibers"],
    rating: 4.8,
    totalReviews: 61,
    totalProducts: 3,
    totalSales: 305,
    bio: "Traditional woven baskets with contemporary forms.",
    journey: "Learned weaving from family artisans; promotes sustainable materials...",
    achievements: ["Cultural Heritage Award (2019)"],
    philosophy: "Function woven with culture.",
    studioInfo: {
      name: "Johnson Weaves",
      address: "12 Market Rd, Accra",
      hours: "Tue-Sat 10am-5pm",
      visitorsWelcome: true,
    },
    socialStats: { followers: 820, following: 110, posts: 166 },
  },
};

const productsByArtisanId: Record<string, ProductItem[]> = {
  "emma-chen": [
    { id: 1, name: "Hand-woven Wool Scarf", image: "/scarf-new.jpg", price: 89, originalPrice: 120, rating: 5, reviews: 24, category: "Scarves", featured: true },
    { id: 2, name: "Wool Mittens", image: "/scarf1-new.jpg", price: 45, rating: 5, reviews: 12, category: "Accessories", featured: false },
    { id: 3, name: "Woven Table Runner", image: "/woven-basket.jpg", price: 65, rating: 4, reviews: 18, category: "Home Decor", featured: true },
    { id: 4, name: "Alpaca Throw Blanket", image: "/woven-basket-2.jpg", price: 180, rating: 5, reviews: 8, category: "Blankets", featured: true },
    { id: 5, name: "Baby Blanket Set", image: "/woven-basket-3.jpg", price: 95, rating: 5, reviews: 15, category: "Baby", featured: false },
    { id: 6, name: "Meditation Cushion Cover", image: "/woven-basket-4.jpg", price: 55, rating: 4, reviews: 9, category: "Home Decor", featured: false },
  ],
  "marcus-rivera": [
    { id: 7, name: "Ceramic Tea Set", image: "/ceramic-tea-set.jpg", price: 156, rating: 5, reviews: 18, category: "Ceramics", featured: true },
    { id: 8, name: "Ceramic Cup", image: "/ceramic-tea-set-2.jpg", price: 36, rating: 4, reviews: 6, category: "Ceramics", featured: false },
    { id: 9, name: "Ceramic Serving Bowl", image: "/ceramic-tea-set-3.jpg", price: 72, rating: 5, reviews: 9, category: "Ceramics", featured: false },
  ],
  "sofia-andersson": [
    { id: 10, name: "Leather Journal", image: "/leather-journal.jpg", price: 65, rating: 4, reviews: 31, category: "Leather", featured: true },
    { id: 11, name: "Pocket Notebook", image: "/leather-journal-2.jpg", price: 35, rating: 4, reviews: 12, category: "Leather", featured: false },
  ],
  "david-park": [
    { id: 12, name: "Wooden Bowl Set", image: "/wooden-bowl-set.jpg", price: 120, rating: 5, reviews: 12, category: "Woodwork", featured: true },
    { id: 13, name: "Salad Bowl", image: "/wooden-bowl-set-2.jpg", price: 80, rating: 5, reviews: 7, category: "Woodwork", featured: false },
  ],
  "luna-martinez": [
    { id: 14, name: "Glass Pendant Necklace", image: "/glass-pendant-necklace.jpg", price: 85, rating: 4, reviews: 27, category: "Jewelry", featured: true },
    { id: 15, name: "Glass Pendant (Blue)", image: "/glass-pendant-necklace-2.jpg", price: 90, rating: 4, reviews: 11, category: "Jewelry", featured: false },
  ],
  "aisha-johnson": [
    { id: 16, name: "Woven Basket", image: "/woven-basket.jpg", price: 45, rating: 5, reviews: 15, category: "Textiles", featured: true },
    { id: 17, name: "Storage Basket", image: "/woven-basket-2.jpg", price: 55, rating: 5, reviews: 8, category: "Textiles", featured: false },
    { id: 18, name: "Market Basket", image: "/woven-basket-3.jpg", price: 60, rating: 4, reviews: 10, category: "Textiles", featured: false },
  ],
};

const categories = [
  "All",
  "Scarves",
  "Accessories",
  "Home Decor",
  "Blankets",
  "Baby",
];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export default function ArtisanProfile() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // In real app, fetch artisan data based on ID
  const artisanId = (id as string) || "";
  const artisan = artisansById[artisanId];

  if (!artisan) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Artisan Not Found
        </h1>
        <Button asChild>
          <Link to="/marketplace">Back to Marketplace</Link>
        </Button>
      </div>
    );
  }

  // Filter and sort products for this artisan
  const products = productsByArtisanId[artisanId] || [];
  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory,
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "featured":
        return b.featured ? 1 : -1;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-64 md:h-80 bg-gradient-to-r from-palette-peach to-palette-yellow">
          <img
            src={artisan.coverImage}
            alt={`${artisan.name}'s studio`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Button asChild variant="secondary" size="sm">
            <Link to="/marketplace" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="absolute -bottom-16 left-4 md:left-8">
          <div className="flex items-end gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-background border-4 border-background shadow-lg">
              <img
                src={artisan.avatar}
                alt={artisan.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pb-4 text-white">
              <h1 className="text-2xl md:text-3xl font-bold">{artisan.name}</h1>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="h-4 w-4" />
                <span>{artisan.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Stats Bar */}
        <div className="mt-20 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {artisan.totalProducts}
                </div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {artisan.totalSales}
                </div>
                <div className="text-sm text-muted-foreground">Sales</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <Star className="h-4 w-4 fill-palette-yellow text-palette-yellow" />
                  <span className="text-2xl font-bold text-foreground">
                    {artisan.rating}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  ({artisan.totalReviews} reviews)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button>
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-8">
          {artisan.specialties.map((specialty) => (
            <Badge key={specialty} variant="secondary" className="text-sm">
              {specialty}
            </Badge>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="products">
              Products ({artisan.totalProducts})
            </TabsTrigger>
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="studio">Studio</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>About {artisan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground whitespace-pre-line">
                      {artisan.bio}
                    </p>
                    <div className="pt-4">
                      <blockquote className="border-l-4 border-palette-coral pl-4 italic text-lg">
                        "{artisan.philosophy}"
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Member since {artisan.memberSince}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{artisan.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {artisan.achievements.length} achievements
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {artisan.achievements.map((achievement, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-square overflow-hidden bg-muted relative">
                        {product.featured && (
                          <Badge className="absolute top-2 left-2 z-10 bg-primary">
                            Featured
                          </Badge>
                        )}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: product.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-3 w-3 fill-palette-yellow text-palette-yellow"
                                />
                              ),
                            )}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({product.reviews})
                            </span>
                          </div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">
                                ₹{product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                            <Button
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addItem({ id: product.id, name: product.name, image: product.image, price: product.price }, 1);
                              }}
                            >
                              <ShoppingBag className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex gap-4"
                      >
                        <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                            {product.featured && (
                              <Badge variant="secondary" className="text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: product.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-3 w-3 fill-palette-yellow text-palette-yellow"
                                />
                              ),
                            )}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({product.reviews} reviews)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-primary">
                                ₹{product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                            <Button size="sm" onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addItem({ id: product.id, name: product.name, image: product.image, price: product.price }, 1);
                            }}>
                              <ShoppingBag className="h-3 w-3 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Story Tab */}
          <TabsContent value="story">
            <Card>
              <CardHeader>
                <CardTitle>My Artistic Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {artisan.journey}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Studio Tab */}
          <TabsContent value="studio">
            <Card>
              <CardHeader>
                <CardTitle>Studio Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Visit My Studio</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Studio Name:</strong> {artisan.studioInfo.name}
                      </p>
                      <p>
                        <strong>Address:</strong> {artisan.studioInfo.address}
                      </p>
                      <p>
                        <strong>Hours:</strong> {artisan.studioInfo.hours}
                      </p>
                      <p>
                        <strong>Visitors:</strong>{" "}
                        {artisan.studioInfo.visitorsWelcome
                          ? "Welcome by appointment"
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Workshop & Classes</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      I offer hands-on weaving workshops for all skill levels.
                      Learn traditional techniques in a supportive, creative
                      environment.
                    </p>
                    <Button>Inquire About Workshops</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
