import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, SlidersHorizontal, ShoppingBag, Users, Baby, Watch, Sparkles, Tag, X } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";

const categories = [
  { name: "All", icon: ShoppingBag },
  { name: "Men", icon: Users },
  { name: "Women", icon: Sparkles },
  { name: "Kids", icon: Baby },
  { name: "Accessories", icon: Watch },
  { name: "New Arrivals", icon: Sparkles },
  { name: "Offers", icon: Tag },
];

const mockProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Fashion Item ${i + 1}`,
  image: "/placeholder.svg",
  price: Math.floor(Math.random() * 5000) + 1500,
  originalPrice: Math.floor(Math.random() * 8000) + 3000,
  shop: `Fashion Store ${(i % 3) + 1}`,
  shopId: (i % 3) + 1,
  discount: Math.floor(Math.random() * 50) + 10,
}));

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-background/80" />
        <div className="container relative mx-auto px-4 py-12 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <Badge variant="secondary" className="mb-2 md:mb-4 text-xs md:text-sm">
              Welcome to FashionConnect
            </Badge>
            <h1 className="text-2xl md:text-6xl font-bold tracking-tight">
              Shop from Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Favorite Stores
              </span>
            </h1>
            <p className="text-sm md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Compare, Choose, and Shine! Discover unique fashion from multiple stores in one place.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center pt-2 md:pt-4">
              <Button size="sm" className="shadow-lg md:size-lg">
                Start Shopping
              </Button>
              <Button size="sm" variant="outline" className="md:size-lg">
                Explore Shops
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="container mx-auto px-4">
        <div className="border-b mb-4 md:mb-8">
          <div className="flex gap-2 md:gap-4 overflow-x-auto py-2 md:py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-1 md:gap-2 whitespace-nowrap px-3 py-1.5 md:px-6 md:py-3 rounded-full transition-all border text-xs md:text-sm ${
                  selectedCategory === category.name
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)] border-primary"
                    : "hover:bg-muted border-border"
                }`}
              >
                <category.icon className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Filters Sidebar - Right Side */}
          <div
            className={`
              fixed lg:static inset-y-0 right-0 z-50 
              lg:w-72 w-80 max-w-[85vw]
              bg-background lg:bg-transparent
              transform transition-transform duration-300 ease-out
              ${filtersOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
              overflow-y-auto lg:order-2
            `}
          >
            <Card className="lg:w-72 h-fit p-6 border-0 shadow-[var(--shadow-soft)] space-y-6 m-4 lg:m-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">Filters</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-xs">Clear All</Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-8 w-8"
                    onClick={() => setFiltersOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <span className="text-primary">₹</span>
                    Price Range
                  </label>
                  <div className="space-y-3">
                    <Slider
                      defaultValue={[0]}
                      max={10000}
                      step={500}
                      className="mb-2"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <Input placeholder="Min" className="h-9 text-xs" />
                      <span className="text-muted-foreground">-</span>
                      <Input placeholder="Max" className="h-9 text-xs" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹0</span>
                      <span>₹10,000+</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Available Sizes</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <Button
                        key={size}
                        variant="outline"
                        size="sm"
                        className="h-10 hover:bg-primary hover:text-primary-foreground"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Customer Rating</label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        className="flex items-center gap-2 text-sm hover:text-primary transition-colors w-full p-2 hover:bg-muted rounded-lg"
                      >
                        <span className="text-base">{"⭐".repeat(rating)}</span>
                        <span className="text-muted-foreground">& above</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Discount</label>
                  <div className="space-y-2">
                    {["50% or more", "40% or more", "30% or more", "20% or more", "10% or more"].map((discount) => (
                      <button
                        key={discount}
                        className="flex items-center gap-2 text-sm hover:text-primary transition-colors w-full p-2 hover:bg-muted rounded-lg text-left"
                      >
                        <Tag className="h-4 w-4 text-primary" />
                        {discount}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Overlay */}
          {filtersOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setFiltersOpen(false)}
            />
          )}

          {/* Products */}
          <div className="flex-1 lg:order-1">
            {/* Floating Filter Button (Mobile/Tablet) */}
            {!filtersOpen && (
              <Button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden fixed right-4 bottom-24 z-40 rounded-full h-14 w-14 shadow-[var(--shadow-strong)]"
                size="icon"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            )}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Trending Products</h2>
                <p className="text-muted-foreground">
                  Showing {mockProducts.length} products
                </p>
              </div>

              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
