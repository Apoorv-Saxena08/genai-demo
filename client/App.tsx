import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Theme
import { ThemeProvider } from "@/components/ThemeProvider";

// Layouts
import { PublicLayout } from "@/components/PublicLayout";
import { ArtisanLayout } from "@/components/ArtisanLayout";

// Public Pages
import Homepage from "./pages/Homepage";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import ArtisanProfile from "./pages/ArtisanProfile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CeramicTeaSet from "./pages/CeramicTeaSet";
import LeatherJournal from "./pages/LeatherJournal";
import WoodenBowlSet from "./pages/WoodenBowlSet";
import GlassPendantNecklace from "./pages/GlassPendantNecklace";
import WovenBasket from "./pages/WovenBasket";

// Artisan Dashboard Pages
import Dashboard from "./pages/Dashboard";
import StorytellerStudio from "./pages/StorytellerStudio";
import MarketingAssistant from "./pages/MarketingAssistant";
import AudienceInsights from "./pages/AudienceInsights";
import Profile from "./pages/Profile";

// Other
import NotFound from "./pages/NotFound";
import { CartProvider } from "@/hooks/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <ThemeProvider defaultTheme="dark" storageKey="artisan-muse-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Homepage />
                </PublicLayout>
              }
            />
            <Route
              path="/marketplace"
              element={
                <PublicLayout>
                  <Marketplace />
                </PublicLayout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PublicLayout>
                  <ProductDetail />
                </PublicLayout>
              }
            />
            <Route
              path="/cart"
              element={
                <PublicLayout>
                  <Cart />
                </PublicLayout>
              }
            />
            <Route
              path="/checkout"
              element={
                <PublicLayout>
                  <Checkout />
                </PublicLayout>
              }
            />
            <Route
              path="/ceramic-tea-set"
              element={
                <PublicLayout>
                  <CeramicTeaSet />
                </PublicLayout>
              }
            />
            <Route
              path="/leather-journal"
              element={
                <PublicLayout>
                  <LeatherJournal />
                </PublicLayout>
              }
            />
            <Route
              path="/wooden-bowl-set"
              element={
                <PublicLayout>
                  <WoodenBowlSet />
                </PublicLayout>
              }
            />
            <Route
              path="/glass-pendant-necklace"
              element={
                <PublicLayout>
                  <GlassPendantNecklace />
                </PublicLayout>
              }
            />
            <Route
              path="/woven-basket"
              element={
                <PublicLayout>
                  <WovenBasket />
                </PublicLayout>
              }
            />
            <Route
              path="/artisan/:id"
              element={
                <PublicLayout>
                  <ArtisanProfile />
                </PublicLayout>
              }
            />

            {/* Artisan Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ArtisanLayout>
                  <Dashboard />
                </ArtisanLayout>
              }
            />
            <Route
              path="/storyteller"
              element={
                <ArtisanLayout>
                  <StorytellerStudio />
                </ArtisanLayout>
              }
            />
            <Route
              path="/marketing"
              element={
                <ArtisanLayout>
                  <MarketingAssistant />
                </ArtisanLayout>
              }
            />
            <Route
              path="/insights"
              element={
                <ArtisanLayout>
                  <AudienceInsights />
                </ArtisanLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <ArtisanLayout>
                  <Profile />
                </ArtisanLayout>
              }
            />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </CartProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
