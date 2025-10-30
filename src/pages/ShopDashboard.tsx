import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingBag, TrendingUp, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Active Products",
    value: "124",
    icon: Package,
    trend: "+12%",
    color: "text-primary",
  },
  {
    title: "Total Orders",
    value: "856",
    icon: ShoppingBag,
    trend: "+23%",
    color: "text-accent",
  },
  {
    title: "Completed Orders",
    value: "789",
    icon: TrendingUp,
    trend: "+18%",
    color: "text-green-600",
  },
  {
    title: "Revenue",
    value: "$45,231",
    icon: DollarSign,
    trend: "+31%",
    color: "text-blue-600",
  },
];

const ShopDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Fashion Store!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your store today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="p-6 border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-sm font-medium text-green-600">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 border-0 shadow-[var(--shadow-soft)] mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild className="h-auto py-4">
              <Link to="/shop/products/new">Add Product</Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4">
              <Link to="/shop/orders">Manage Orders</Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4">
              <Link to="/shop/products">View Products</Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4">
              <Link to="/shop/revenue">View Revenue</Link>
            </Button>
          </div>
        </Card>

        {/* Recent Orders */}
        <Card className="p-6 border-0 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/shop/orders">View All</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card"
              >
                <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img
                    src="/placeholder.svg"
                    alt="Product"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1">Order #{1234 + i}</h4>
                  <p className="text-sm text-muted-foreground">
                    Customer Name • Stylish Fashion Item
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold mb-1">$59.99</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    Pending
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ShopDashboard;
