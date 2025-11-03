import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingBag, TrendingUp, DollarSign, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "@/integrations/supabase";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ShopDashboard = () => {
  const { shop, loading } = useShop();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    completedOrders: 0,
    revenue: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (shop?.id) {
      fetchStats();
    }
  }, [shop]);

  const fetchStats = async () => {
    if (!shop?.id) return;

    try {
      // Fetch products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('shop_id', shop.id)
        .eq('is_active', true);

      // Fetch orders
      const { data: orders } = await supabase
        .from('orders')
        .select('status, total_amount')
        .eq('shop_id', shop.id);

      const completedOrders = orders?.filter(o => o.status === 'delivered').length || 0;
      const totalRevenue = orders?.filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + Number(o.total_amount), 0) || 0;

      setStats({
        products: productsCount || 0,
        orders: orders?.length || 0,
        completedOrders,
        revenue: totalRevenue,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="p-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">No Shop Found</h2>
              <p className="text-muted-foreground mb-6">
                You need to create a shop to access the dashboard.
              </p>
              <Button asChild>
                <Link to="/auth">Go to Setup</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!shop.approved) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your shop is pending approval from the admin. You'll be notified once approved.
            </AlertDescription>
          </Alert>
          
          <Card className="p-12">
            <div className="text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-4">Shop Pending Approval</h2>
              <p className="text-muted-foreground mb-2">
                Thank you for registering your shop "{shop.name}"!
              </p>
              <p className="text-muted-foreground">
                Our admin team is reviewing your application. You'll receive a notification once approved.
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const statsData = [
    {
      title: "Active Products",
      value: stats.products.toString(),
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Total Orders",
      value: stats.orders.toString(),
      icon: ShoppingBag,
      color: "text-accent",
    },
    {
      title: "Completed Orders",
      value: stats.completedOrders.toString(),
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString('en-IN')}`,
      icon: DollarSign,
      color: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {shop.name}!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your store today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat) => (
            <Card
              key={stat.title}
              className="p-6 border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-1">{loadingStats ? "..." : stat.value}</h3>
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
      </div>
    </div>
  );
};

export default ShopDashboard;
