import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Package, IndianRupee } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const mockCartItems = [
  {
    id: 1,
    name: "Stylish Fashion Item",
    image: "/placeholder.svg",
    price: 2999,
    quantity: 2,
    size: "M",
    color: "Black",
  },
  {
    id: 2,
    name: "Premium Fashion Wear",
    image: "/placeholder.svg",
    price: 3499,
    quantity: 1,
    size: "L",
    color: "Navy",
  },
];

const CheckoutSummary = () => {
  const navigate = useNavigate();
  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 0;
  const total = subtotal + delivery;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/checkout/address">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Order Summary</h1>
            <p className="text-muted-foreground">Step 2 of 3</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
            <div className="h-full w-2/3 bg-primary" />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
              ✓
            </div>
            <span className="text-xs font-medium">Address</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
              2
            </div>
            <span className="text-xs font-medium">Summary</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold mb-2">
              3
            </div>
            <span className="text-xs text-muted-foreground">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Address & Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card className="p-6 border-0 shadow-[var(--shadow-soft)]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Delivery Address</h2>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/checkout/address">Edit</Link>
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">John Doe</p>
                <p>123, Fashion Street, MG Road</p>
                <p>Mumbai, Maharashtra - 400001</p>
                <p>Mobile: +91 98765 43210</p>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-6 border-0 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Order Items</h2>
              </div>
              <div className="space-y-4">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-bold text-primary">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Price Details */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-0 shadow-[var(--shadow-soft)] sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Price Details</h2>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({mockCartItems.length} items)
                  </span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Charges</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full mt-6"
                onClick={() => navigate("/checkout/payment")}
              >
                Continue to Payment
              </Button>

              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  By placing this order, you agree to our Terms & Conditions
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
