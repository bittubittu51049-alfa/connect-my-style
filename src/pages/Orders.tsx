import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Truck, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    items: [
      {
        name: "Stylish Fashion Item 1",
        image: "/placeholder.svg",
        quantity: 2,
        price: 4999,
      },
    ],
    total: 9998,
    status: "on-the-way",
    date: "2024-10-25",
    shop: "Fashion Store 1",
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    items: [
      {
        name: "Stylish Fashion Item 2",
        image: "/placeholder.svg",
        quantity: 1,
        price: 6499,
      },
    ],
    total: 6499,
    status: "delivered",
    date: "2024-10-20",
    shop: "Fashion Store 2",
  },
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "on-the-way": { label: "On the Way", icon: Truck, color: "bg-blue-100 text-blue-700" },
      delivered: { label: "Delivered", icon: CheckCircle, color: "bg-green-100 text-green-700" },
      cancelled: { label: "Cancelled", icon: Package, color: "bg-red-100 text-red-700" },
      packed: { label: "Packed", icon: Package, color: "bg-yellow-100 text-yellow-700" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <config.icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your orders</p>
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockOrders.map((order) => (
              <Card key={order.id} className="p-6 border-0 shadow-[var(--shadow-soft)]">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{order.orderNumber}</h3>
                    <p className="text-sm text-muted-foreground">
                      Ordered on {new Date(order.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 mb-4">
                    <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1">{order.shop}</p>
                      <h4 className="font-semibold mb-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="font-semibold">Total Amount</p>
                  <p className="text-xl font-bold text-primary">₹{order.total.toLocaleString('en-IN')}</p>
                </div>

                {order.status === "delivered" && (
                  <Button className="w-full mt-4">Order Again</Button>
                )}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="ongoing" className="space-y-4">
            {mockOrders
              .filter((o) => o.status === "on-the-way" || o.status === "packed")
              .map((order) => (
                <Card key={order.id} className="p-6 border-0 shadow-[var(--shadow-soft)]">
                  {/* Same content as above */}
                  <p className="text-center text-muted-foreground">Order content here</p>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            {mockOrders
              .filter((o) => o.status === "delivered")
              .map((order) => (
                <Card key={order.id} className="p-6 border-0 shadow-[var(--shadow-soft)]">
                  <p className="text-center text-muted-foreground">Order content here</p>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            <p className="text-center text-muted-foreground py-12">No cancelled orders</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
