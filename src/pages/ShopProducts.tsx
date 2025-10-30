import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const mockProducts = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Fashion Item ${i + 1}`,
  image: "/placeholder.svg",
  price: Math.floor(Math.random() * 5000) + 2000,
  originalPrice: Math.floor(Math.random() * 7000) + 4000,
  stock: Math.floor(Math.random() * 100) + 10,
  category: i % 2 === 0 ? "Men" : "Women",
}));

const ShopProducts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/shop/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">My Products</h1>
              <p className="text-muted-foreground">Manage your product catalog</p>
            </div>
          </div>

          <Button asChild>
            <Link to="/shop/products/new">
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-0 shadow-[var(--shadow-soft)]">
              <div className="aspect-square bg-muted relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">{product.category}</Badge>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Stock: {product.stock} units
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
