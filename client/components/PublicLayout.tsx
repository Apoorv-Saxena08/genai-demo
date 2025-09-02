import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Palette, ShoppingBag, Home, User, LogIn } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "@/hooks/CartContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

interface PublicLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Marketplace",
    url: "/marketplace",
    icon: ShoppingBag,
  },
];

export function PublicLayout({ children }: PublicLayoutProps) {
  const location = useLocation();
  const { count } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src="/logo.jpg" alt="Aangan logo" className="h-10 w-10 rounded-lg object-cover" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground">
                Aangan
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Weaving stories, Selling crafts
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm">
              <RouterLink to="/cart" className="relative flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1.5 rounded">
                    {count}
                  </span>
                )}
              </RouterLink>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden sm:flex"
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Artisan Portal
              </Link>
            </Button>
            <Button asChild variant="default" size="sm">
              <Link to="/dashboard" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden px-4 pb-3">
          <nav className="flex items-center gap-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Aangan logo" className="h-8 w-8 rounded-lg object-cover" />
                <span className="text-lg font-bold text-foreground">Aangan</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting artisans with art lovers worldwide. Weaving stories,
                selling crafts.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Explore</h3>
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/marketplace"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Marketplace
                </Link>
                <Link
                  to="/artisans"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Featured Artisans
                </Link>
              </div>
            </div>

            {/* For Artisans */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                For Artisans
              </h3>
              <div className="flex flex-col space-y-2">
                <Link
                  to="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Join as Artisan
                </Link>
                <Link
                  to="/storyteller"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Share Your Story
                </Link>
                <Link
                  to="/marketing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Marketing Tools
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Support</h3>
              <div className="flex flex-col space-y-2">
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/40">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2025 Aangan. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Made with ❤️ for artisans
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
