import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, Home, Store, Package, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileNav } from "./MobileNav";
import { useAuth } from "@/integrations/supabase";
import { toast } from "sonner";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();
  
  // Check if current route is customer role (not shop or admin)
  const isCustomerRole = !location.pathname.startsWith('/shop') && !location.pathname.startsWith('/admin');

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
      navigate("/auth");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FashionConnect
              </span>
            </Link>

            {/* Search Bar - Desktop - Only for Customer */}
            {isCustomerRole && (
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search for products or shops..."
                    className="pl-10 bg-muted/50"
                  />
                </div>
              </div>
            )}

            {/* Desktop Navigation - Only for Customer */}
            {isCustomerRole && (
              <div className="hidden md:flex items-center gap-6">
                <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Home className="h-5 w-5" />
                </Link>
                <Link to="/shops" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Store className="h-5 w-5" />
                </Link>
                <Link to="/orders" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <Package className="h-5 w-5" />
                </Link>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {userRole === "shop_owner" && (
                      <DropdownMenuItem asChild>
                        <Link to="/shop/dashboard" className="cursor-pointer">
                          <Store className="mr-2 h-4 w-4" />
                          Shop Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {userRole === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="cursor-pointer">
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </>
  );
};
