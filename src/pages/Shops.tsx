import { Navbar } from "@/components/Navbar";
import { ShopCard } from "@/components/ShopCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const mockShops = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Fashion Store ${i + 1}`,
  logo: "/placeholder.svg",
  rating: 4.5 + Math.random() * 0.5,
  followers: Math.floor(Math.random() * 10000) + 1000,
  products: Math.floor(Math.random() * 500) + 50,
  description: "Premium fashion collection featuring the latest trends and timeless classics.",
}));

const Shops = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="icon" className="mb-4" asChild>
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Explore{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Fashion Shops
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover unique collections from verified fashion retailers
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search shops..."
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockShops.map((shop) => (
            <ShopCard key={shop.id} {...shop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shops;
