import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Star,
  ShoppingBag,
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/CartContext";

// Mock product data - in real app, this would come from API
const mockProducts = [
  {
    id: 1,
    name: "Hand-woven Wool Scarf",
    artisan: "Emma Chen",
    artisanId: "emma-chen",
    artisanAvatar: "/artist1.avif",
    image: "/scarf-new.jpg",
    rating: 5,
    reviews: 24,
    price: 89,
    category: "Textiles",
    tags: ["wool", "scarf", "winter", "handwoven"],
    description: "Beautiful handwoven scarf made from organic merino wool",
    detailPage: "/product/1", // Uses existing ProductDetail component
  },
  {
    id: 2,
    name: "Ceramic Tea Set",
    artisan: "Marcus Rivera",
    artisanId: "marcus-rivera",
    artisanAvatar: "/artist2.avif",
    image: "/ceramic-tea-set.jpg",
    rating: 5,
    reviews: 18,
    price: 156,
    category: "Ceramics",
    tags: ["ceramic", "tea", "handmade", "kitchen"],
    description: "Elegant ceramic tea set with traditional glazing techniques",
    detailPage: "/ceramic-tea-set", // Custom detail page
  },
  {
    id: 3,
    name: "Leather Journal",
    artisan: "Sofia Andersson",
    artisanId: "sofia-andersson",
    artisanAvatar: "/artist3.avif",
    image: "/leather-journal.jpg",
    rating: 4,
    reviews: 31,
    price: 65,
    category: "Leather",
    tags: ["leather", "journal", "notebook", "handbound"],
    description: "Hand-bound leather journal with handmade paper",
    detailPage: "/leather-journal", // Custom detail page
  },
  {
    id: 4,
    name: "Wooden Bowl Set",
    artisan: "David Park",
    artisanId: "david-park",
    artisanAvatar: "/artist1.avif",
    image: "/wooden-bowl-set.jpg",
    rating: 5,
    reviews: 12,
    price: 120,
    category: "Woodwork",
    tags: ["wood", "bowl", "kitchen", "carved"],
    description: "Hand-carved wooden bowls from sustainable oak",
    detailPage: "/wooden-bowl-set", // Custom detail page
  },
  {
    id: 5,
    name: "Glass Pendant Necklace",
    artisan: "Luna Martinez",
    artisanId: "luna-martinez",
    artisanAvatar: "/artist2.avif",
    image: "/glass-pendant-necklace.jpg",
    rating: 4,
    reviews: 27,
    price: 85,
    category: "Jewelry",
    tags: ["glass", "jewelry", "necklace", "pendant"],
    description: "Handblown glass pendant with sterling silver chain",
    detailPage: "/glass-pendant-necklace", // Custom detail page
  },
  {
    id: 6,
    name: "Woven Basket",
    artisan: "Aisha Johnson",
    artisanId: "aisha-johnson",
    artisanAvatar: "/artist3.avif",
    image: "/woven-basket.jpg",
    rating: 5,
    reviews: 15,
    price: 45,
    category: "Textiles",
    tags: ["basket", "woven", "storage", "natural"],
    description: "Traditional woven basket using sustainable materials",
    detailPage: "/woven-basket", // Custom detail page
  },
];

const categories = [
  "All",
  "Textiles",
  "Ceramics",
  "Leather",
  "Woodwork",
  "Jewelry",
];
const priceRanges = [
  { label: "Under ₹50", min: 0, max: 50 },
  { label: "₹50 - ₹100", min: 50, max: 100 },
  { label: "₹100 - ₹200", min: 100, max: 200 },
  { label: "Over ₹200", min: 200, max: Infinity },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export default function Marketplace() {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter products
  const filteredProducts = mockProducts.filter((product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.artisan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    // Category filter
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    // Price range filter
    const matchesPriceRange =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        const priceRange = priceRanges.find((r) => r.label === range);
        if (!priceRange) return false;
        return (
          product.price >= priceRange.min && product.price <= priceRange.max
        );
      });

    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    } else {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== range));
    }
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="text-primary"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.label} className="flex items-center space-x-2">
              <Checkbox
                id={range.label}
                checked={selectedPriceRanges.includes(range.label)}
                onCheckedChange={(checked) =>
                  handlePriceRangeChange(range.label, checked as boolean)
                }
              />
              <Label htmlFor={range.label} className="text-sm cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Marketplace
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover unique, handcrafted treasures from talented artisans
          worldwide
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for products, artisans, or crafts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full lg:w-[200px] h-12">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-12 w-12 p-0"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-12 w-12 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Filters */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden h-12">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Refine your search to find the perfect craft
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5" />
                <h2 className="font-semibold">Filters</h2>
              </div>
              <FiltersContent />
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid/List */}
        <main className="flex-1">
          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {sortedProducts.length} products found
            </p>
          </div>

          {/* Products */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <Link to={product.detailPage}>
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
                          {Array.from({ length: product.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-palette-yellow text-palette-yellow"
                              />
                            ),
                          )}
                          <span className="text-sm text-muted-foreground ml-2">
                            ({product.reviews})
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <Link
                          to={`/artisan/${product.artisanId}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          by {product.artisan}
                        </Link>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xl font-bold text-primary">
                            ₹{product.price}
                          </span>
                          <Button
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addItem({ id: product.id, name: product.name, image: product.image, price: product.price }, 1);
                            }}
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Add to Cart
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
                  <CardContent className="p-6">
                    <Link to={product.detailPage} className="flex gap-6">
                      <div className="w-32 h-32 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <Link
                            to={`/artisan/${product.artisanId}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            by {product.artisan}
                          </Link>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: product.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-palette-yellow text-palette-yellow"
                              />
                            ),
                          )}
                          <span className="text-sm text-muted-foreground ml-2">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-primary">
                            ₹{product.price}
                          </span>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addItem({ id: product.id, name: product.name, image: product.image, price: product.price }, 1);
                            }}
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
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

          {/* No Results */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-4">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
