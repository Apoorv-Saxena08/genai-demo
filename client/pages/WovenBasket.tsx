import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft,
  User,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock product data for Woven Basket
const mockProductData = {
  id: 6,
  name: "Woven Basket",
  artisan: "Aisha Johnson",
  artisanId: "aisha-johnson",
  images: [
    "/woven-basket.jpg",
    "/woven-basket-2.jpg",
    "/woven-basket-3.jpg",
    "/woven-basket-4.jpg"
  ],
  rating: 5,
  reviews: 15,
  price: 45,
  originalPrice: 60,
  category: "Textiles",
  tags: ["basket", "woven", "storage", "natural"],
  shortDescription: "Traditional woven basket using sustainable materials",
  description: `
    <h3>Artisan Woven Basket</h3>
    
    <p>This beautiful woven basket represents the perfect blend of traditional craftsmanship and sustainable practices. Each basket is handcrafted by Aisha Johnson using techniques passed down through generations of weavers.</p>
    
    <h4>Materials & Construction</h4>
    <p>Made from sustainably harvested natural fibers including seagrass, rattan, and bamboo, each basket is carefully woven using traditional techniques. The natural materials create a warm, organic feel while providing excellent durability and functionality.</p>
    
    <h4>The Story Behind the Craft</h4>
    <p>Aisha learned basket weaving from her grandmother in rural Kenya. Each basket takes approximately 12 hours to complete, including gathering materials, preparing fibers, weaving, and finishing. The traditional coiling and twining techniques ensure each piece is unique.</p>
    
    <h4>Care Instructions</h4>
    <p>Wipe clean with a damp cloth. Avoid soaking in water. Store in a dry place away from direct sunlight. The natural fibers will develop a beautiful patina over time.</p>
  `,
  inStock: true,
  stockCount: 8,
  artisanInfo: {
    name: "Aisha Johnson",
    location: "Nairobi, Kenya",
    memberSince: "2022",
    specialties: ["Basket Weaving", "Natural Fibers", "Traditional Techniques"],
    bio: "Aisha is a master basket weaver specializing in traditional African weaving techniques. Her work focuses on creating functional art that celebrates cultural heritage.",
    avatar: "/artist3.avif",
    productsCount: 18,
    rating: 4.9,
  },
  features: [
    "Hand-woven from Natural Fibers",
    "Sustainable Materials",
    "Traditional Weaving Techniques",
    "Versatile Storage Solution",
    "Eco-friendly & Biodegradable",
  ],
  dimensions: '12" diameter x 8" height',
  weight: "1.2 lbs (0.5kg)",
  shippingInfo: {
    freeShipping: true,
    estimatedDays: "7-10 business days",
    international: true,
  },
};

const relatedProducts = [
  {
    id: 13,
    name: "Storage Basket",
    artisan: "Aisha Johnson",
    image: "/woven-basket-2.jpg",
    price: 35,
    rating: 5,
  },
  {
    id: 14,
    name: "Decorative Wall Basket",
    artisan: "Aisha Johnson",
    image: "/woven-basket-3.jpg",
    price: 55,
    rating: 4,
  },
  {
    id: 15,
    name: "Picnic Basket",
    artisan: "Aisha Johnson",
    image: "/woven-basket-4.jpg",
    price: 65,
    rating: 5,
  },
];

export default function WovenBasket() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // In real app, fetch product data based on ID
  const product = mockProductData;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Product Not Found
        </h1>
        <Button asChild>
          <Link to="/marketplace">Back to Marketplace</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          to="/marketplace"
          className="hover:text-foreground transition-colors"
        >
          Marketplace
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6 -ml-4">
        <Link to="/marketplace" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden bg-muted border-2 transition-colors ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent hover:border-muted-foreground"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {product.name}
                </h1>
                <Link
                  to={`/artisan/${product.artisanId}`}
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                >
                  by {product.artisan}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`h-10 w-10 p-0 ${isWishlisted ? "text-red-500" : ""}`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: product.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <p className="text-sm text-green-600">
                Save ₹{product.originalPrice - product.price}(
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100,
                )}
                % off)
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="space-y-2">
            {product.inStock ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-600">
                  In Stock ({product.stockCount} available)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm text-red-600">Out of Stock</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Purchase Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setQuantity(Math.min(product.stockCount, quantity + 1))
                  }
                  disabled={quantity >= product.stockCount}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1" disabled={!product.inStock}>
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                disabled={!product.inStock}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span>
                {product.shippingInfo.freeShipping ? "Free shipping" : "Shipping calculated at checkout"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
              <span>Handmade to order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Dimensions</h4>
                  <p className="text-muted-foreground">{product.dimensions}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Weight</h4>
                  <p className="text-muted-foreground">{product.weight}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Materials</h4>
                <p className="text-muted-foreground">
                  Sustainably harvested natural fibers including seagrass, rattan, and bamboo
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Shipping Time</h4>
                  <p className="text-muted-foreground">
                    {product.shippingInfo.estimatedDays}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Shipping Cost</h4>
                  <p className="text-muted-foreground">
                    {product.shippingInfo.freeShipping ? "Free" : "Calculated at checkout"}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">International Shipping</h4>
                <p className="text-muted-foreground">
                  {product.shippingInfo.international ? "Available" : "Not available"}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              <div className="text-center py-8">
                <Star className="h-8 w-8 fill-accent text-accent mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-1">
                  {product.rating} out of 5 stars
                </h4>
                <p className="text-muted-foreground">
                  Based on {product.reviews} reviews
                </p>
              </div>
              <div className="text-center text-muted-foreground">
                <p>Reviews will be displayed here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Artisan Info */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Meet the Artisan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                <img
                  src={product.artisanInfo.avatar}
                  alt={product.artisanInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {product.artisanInfo.name}
                </h3>
                <p className="text-muted-foreground">
                  {product.artisanInfo.location}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm">{product.artisanInfo.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    • {product.artisanInfo.productsCount} products
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground mb-4">
                {product.artisanInfo.bio}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.artisanInfo.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <Button asChild variant="outline">
                <Link to={`/artisan/${product.artisanId}`}>
                  View Artisan Profile
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            More from this Artisan
          </h2>
          <Button asChild variant="outline">
            <Link to={`/artisan/${product.artisanId}`}>View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Card
              key={relatedProduct.id}
              className="group cursor-pointer hover:shadow-lg transition-shadow"
            >
              <Link to={`/product/${relatedProduct.id}`}>
                <div className="aspect-square overflow-hidden rounded-t-lg bg-muted">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {relatedProduct.artisan}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">
                      ₹{relatedProduct.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span className="text-xs">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
