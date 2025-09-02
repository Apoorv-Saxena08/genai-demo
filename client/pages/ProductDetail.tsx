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
import { useCart } from "@/hooks/CartContext";

// Mock product data - in real app, this would come from API
const mockProductData = {
  id: 1,
  name: "Hand-woven Wool Scarf",
  artisan: "Emma Chen",
  artisanId: "emma-chen",
  images: [
    "/scarf-new.jpg",
    "/scarf1-new.jpg",
    "/scarf2-new.jpg",
    "/scarf3-new.jpg"
  ],
  rating: 5,
  reviews: 24,
  price: 89,
  originalPrice: 120,
  category: "Textiles",
  tags: ["wool", "scarf", "winter", "handwoven"],
  shortDescription: "Beautiful handwoven scarf made from organic merino wool",
  description: `
    <h3>Crafted with Love and Tradition</h3>
    
    <p>This exquisite hand-woven wool scarf represents the perfect fusion of traditional craftsmanship and contemporary style. Each thread has been carefully selected and woven using techniques passed down through generations of textile artisans.</p>
    
    <h4>Materials & Construction</h4>
    <p>Made from 100% organic merino wool sourced from ethical farms in New Zealand, this scarf offers unparalleled softness and warmth. The wool is naturally dyed using plant-based colors, creating rich, lasting hues that won't fade over time.</p>
    
    <h4>The Story Behind the Craft</h4>
    <p>Emma learned the art of hand-weaving from her grandmother in rural Oregon. Each scarf takes approximately 15 hours to complete on a traditional floor loom, with every pattern being unique due to the handmade nature of the process.</p>
    
    <h4>Care Instructions</h4>
    <p>Hand wash in cold water with wool-specific detergent. Lay flat to dry. Store folded in a breathable cotton bag.</p>
  `,
  inStock: true,
  stockCount: 3,
  artisanInfo: {
    name: "Emma Chen",
    location: "Portland, OR",
    memberSince: "2019",
    specialties: ["Hand-weaving", "Natural Dyeing", "Textile Design"],
    bio: "Emma is a third-generation textile artisan specializing in traditional hand-weaving techniques. Her work focuses on sustainable practices and preserving traditional craft methods.",
    avatar: "/artist1.avif",
    productsCount: 24,
    rating: 4.9,
  },
  features: [
    "100% Organic Merino Wool",
    "Hand-woven on Traditional Loom",
    "Natural Plant-based Dyes",
    "Unique Pattern (No Two Alike)",
    "Sustainable & Ethically Sourced",
  ],
  dimensions: '70" x 12" (178cm x 30cm)',
  weight: "8 oz (227g)",
  shippingInfo: {
    freeShipping: true,
    estimatedDays: "3-5 business days",
    international: true,
  },
};

const relatedProducts = [
  {
    id: 2,
    name: "Merino Wool Sweater",
    artisan: "Emma Chen",
    image: "/scarf1-new.jpg",
    price: 145,
    rating: 5,
  },
  {
    id: 3,
    name: "Hand-woven Table Runner",
    artisan: "Emma Chen",
    image: "/scarf2-new.jpg",
    price: 75,
    rating: 4,
  },
  {
    id: 4,
    name: "Alpaca Wool Blanket",
    artisan: "Emma Chen",
    image: "/scarf3-new.jpg",
    price: 220,
    rating: 5,
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

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
                  className="p-2"
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: product.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-palette-yellow text-palette-yellow" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
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

          <Separator />

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
              <Button size="lg" className="flex-1" disabled={!product.inStock} onClick={() => addItem({ id: product.id, name: product.name, image: product.images[0], price: product.price }, quantity)}>
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

          {/* Shipping & Returns */}
          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {product.shippingInfo.freeShipping
                    ? "Free Shipping"
                    : "Shipping Available"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Estimated delivery: {product.shippingInfo.estimatedDays}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">30-day returns</p>
                <p className="text-xs text-muted-foreground">
                  Return for any reason within 30 days
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Authenticity guaranteed</p>
                <p className="text-xs text-muted-foreground">
                  Every piece is verified handmade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-8">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Product Details</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Dimensions:</dt>
                      <dd>{product.dimensions}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Weight:</dt>
                      <dd>{product.weight}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Category:</dt>
                      <dd>{product.category}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Artisan Info</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Artisan:</dt>
                      <dd>{product.artisan}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Location:</dt>
                      <dd>{product.artisanInfo.location}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Member Since:</dt>
                      <dd>{product.artisanInfo.memberSince}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-8">
              <p className="text-center text-muted-foreground">
                Reviews functionality coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Artisan Profile Section */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            About the Artisan
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
                  <Star className="h-4 w-4 fill-palette-yellow text-palette-yellow" />
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
                      <Star className="h-3 w-3 fill-palette-yellow text-palette-yellow" />
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
