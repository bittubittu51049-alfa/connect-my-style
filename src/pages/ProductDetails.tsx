import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star, Store, Truck, Shield, RefreshCw, ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Navy", "Gray", "Red"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="icon" className="mb-4" asChild>
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src="/placeholder.svg"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden bg-muted border-2 border-transparent hover:border-primary cursor-pointer transition-colors"
                >
                  <img
                    src="/placeholder.svg"
                    alt={`Thumbnail ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Link to="/shop/1" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-2">
                <Store className="h-4 w-4" />
                Fashion Store 1
              </Link>
              <h1 className="text-3xl font-bold mb-3">
                Stylish Premium Fashion Item
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                  <span className="text-sm ml-2">(4.8 • 342 reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">₹4,999</span>
              <span className="text-xl text-muted-foreground line-through">
                ₹7,499
              </span>
              <Badge className="bg-primary text-primary-foreground">33% OFF</Badge>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Select Color</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <Button size="lg" className="w-full">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free delivery on orders over ₹4,000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RefreshCw className="h-5 w-5 text-primary" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <Card className="mt-12 p-6 border-0 shadow-[var(--shadow-soft)]">
          <h2 className="text-2xl font-bold mb-4">Product Description</h2>
          <p className="text-muted-foreground leading-relaxed">
            Elevate your style with this premium fashion piece. Crafted with attention to detail
            and made from high-quality materials, this item combines comfort with contemporary
            design. Perfect for any occasion, it's a versatile addition to your wardrobe.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
