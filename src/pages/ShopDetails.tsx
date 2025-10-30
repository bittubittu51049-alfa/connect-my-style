import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, MapPin, Phone, Mail, ArrowLeft } from "lucide-react";

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Fashion Item ${i + 1}`,
  image: "/placeholder.svg",
  price: Math.floor(Math.random() * 5000) + 2000,
  originalPrice: Math.floor(Math.random() * 7000) + 4000,
  shop: "Fashion Store",
  shopId: 1,
  discount: Math.floor(Math.random() * 50) + 10,
}));

const ShopDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="icon" className="mb-4" asChild>
          <Link to="/shops">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <Card className="p-8 border-0 shadow-[var(--shadow-soft)] mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="h-32 w-32 rounded-lg overflow-hidden bg-muted shrink-0">
              <img
                src="/placeholder.svg"
                alt="Shop Logo"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Fashion Store {id}</h1>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                  <span className="ml-2 font-semibold">4.8</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">15.2K Followers</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">240 Products</span>
              </div>

              <p className="text-muted-foreground mb-4">
                Premium fashion collection featuring the latest trends and timeless classics.
                Discover unique styles that define your personality.
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>contact@fashionstore{id}.com</span>
                </div>
              </div>

              <Button className="mt-6">Follow Shop</Button>
            </div>
          </div>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-bold">Products from this Shop</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
