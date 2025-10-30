import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Store, User, Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isShopRoute = location.pathname.startsWith("/shop");

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FashionConnect
            </span>
          </Link>

          {/* Search Bar - Desktop */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {!isAdminRoute && !isShopRoute && (
              <>
                <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/shops" className="text-sm font-medium hover:text-primary transition-colors">
                  Shops
                </Link>
                <Link to="/orders" className="text-sm font-medium hover:text-primary transition-colors">
                  Orders
                </Link>
              </>
            )}

            <div className="flex items-center gap-2">
              {!isAdminRoute && !isShopRoute && (
                <>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/cart">
                      <ShoppingCart className="h-5 w-5" />
                    </Link>
                  </Button>
                </>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/" className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Customer
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/shop/dashboard" className="flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      Shop Owner
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 bg-muted/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors p-2">
                Home
              </Link>
              <Link to="/shops" className="text-sm font-medium hover:text-primary transition-colors p-2">
                Shops
              </Link>
              <Link to="/orders" className="text-sm font-medium hover:text-primary transition-colors p-2">
                Orders
              </Link>
              <Link to="/cart" className="text-sm font-medium hover:text-primary transition-colors p-2">
                Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
