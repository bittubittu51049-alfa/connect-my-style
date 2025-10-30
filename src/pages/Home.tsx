import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";

const categories = ["All", "Men", "Women", "Kids", "Accessories", "New Arrivals", "Offers"];

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Stylish Fashion Item ${i + 1}`,
  image: `/placeholder.svg`,
  price: Math.floor(Math.random() * 100) + 20,
  originalPrice: Math.floor(Math.random() * 150) + 50,
  shop: `Fashion Store ${Math.floor(Math.random() * 5) + 1}`,
  rating: 4.5,
  discount: Math.floor(Math.random() * 50) + 10,
}));

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

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
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              Welcome to FashionConnect
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Shop from Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Favorite Stores
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Compare, Choose, and Shine! Discover unique fashion from multiple stores in one place.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Button size="lg" className="shadow-lg">
                Start Shopping
              </Button>
              <Button size="lg" variant="outline">
                Explore Shops
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Trending Products</h2>
              <p className="text-muted-foreground">
                Showing {mockProducts.length} products
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
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

              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
      </section>
    </div>
  );
};

export default Home;
