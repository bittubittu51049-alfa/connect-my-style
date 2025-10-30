import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customerName: "Rahul Sharma",
    product: "Stylish Fashion Item 1",
    image: "/placeholder.svg",
    quantity: 2,
    total: 9998,
    status: "pending",
    date: "2024-10-28",
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customerName: "Priya Patel",
    product: "Stylish Fashion Item 2",
    image: "/placeholder.svg",
    quantity: 1,
    total: 6499,
    status: "packed",
    date: "2024-10-27",
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customerName: "Amit Kumar",
    product: "Stylish Fashion Item 3",
    image: "/placeholder.svg",
    quantity: 3,
    total: 14997,
    status: "on-the-way",
    date: "2024-10-26",
  },
];

const ShopOrders = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/shop/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Manage Orders</h1>
            <p className="text-muted-foreground">Track and update order statuses</p>
          </div>
        </div>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id} className="p-6 border-0 shadow-[var(--shadow-soft)]">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="h-24 w-24 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{order.orderNumber}</h3>
                    <p className="text-sm text-muted-foreground">
                      Customer: {order.customerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Ordered on {new Date(order.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">{order.product}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <p className="text-xl font-bold text-primary">
                      ₹{order.total.toLocaleString('en-IN')}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Status:</span>
                      <Select defaultValue={order.status}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="packed">Packed</SelectItem>
                          <SelectItem value="on-the-way">On the Way</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopOrders;
