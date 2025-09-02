import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Feather,
  Megaphone,
  TrendingUp,
  User,
  Palette,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

interface ArtisanLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Storyteller Studio",
    url: "/storyteller",
    icon: Feather,
  },
  {
    title: "Marketing Assistant",
    url: "/marketing",
    icon: Megaphone,
  },
  {
    title: "Audience & Trends",
    url: "/insights",
    icon: TrendingUp,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function ArtisanLayout({ children }: ArtisanLayoutProps) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar className="border-r-0">
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-3 px-2 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Palette className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-sidebar-foreground">
                Artisan Muse
              </h1>
              <p className="text-xs text-sidebar-foreground/70">
                Craft Your Story
              </p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu className="gap-2 p-4">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="h-12 hover:bg-primary/10 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-center">
              <ThemeToggle variant="ghost" size="sm" showLabel={false} />
            </div>
            <div className="text-center">
              <p className="text-xs text-sidebar-foreground/50">
                Made with ❤️ for artisans
              </p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <main className="flex-1 p-6 md:p-8 lg:p-10">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
