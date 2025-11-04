import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, Users, MessageSquare, CheckCircle, XCircle, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface PendingShop {
  id: string;
  name: string;
  owner_id: string;
  phone: string | null;
  email: string | null;
  description: string | null;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
    phone: string | null;
  };
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    shops: 0,
    customers: 0,
    feedbacks: 0,
  });
  const [pendingShops, setPendingShops] = useState<PendingShop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const { count: shopsCount } = await supabase
        .from('shops')
        .select('*', { count: 'exact', head: true })
        .eq('approved', true);

      const { count: customersCount } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'customer');

      // Fetch pending shops
      const { data: shops, error } = await supabase
        .from('shops')
        .select(`
          *,
          profiles:owner_id (
            full_name,
            email,
            phone
          )
        `)
        .eq('approved', false)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setStats({
        shops: shopsCount || 0,
        customers: customersCount || 0,
        feedbacks: 0,
      });
      setPendingShops(shops || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (shopId: string) => {
    try {
      const { error } = await supabase
        .from('shops')
        .update({ approved: true, is_active: true })
        .eq('id', shopId);

      if (error) throw error;
      toast.success('Shop approved successfully');
      fetchDashboardData();
    } catch (error) {
      console.error('Error approving shop:', error);
      toast.error('Failed to approve shop');
    }
  };

  const handleReject = async (shopId: string) => {
    if (!confirm('Are you sure you want to reject this shop application?')) return;

    try {
      const { error } = await supabase
        .from('shops')
        .delete()
        .eq('id', shopId);

      if (error) throw error;
      toast.success('Shop application rejected');
      fetchDashboardData();
    } catch (error) {
      console.error('Error rejecting shop:', error);
      toast.error('Failed to reject shop');
    }
  };

  const statsData = [
    { title: "Total Shops", value: stats.shops.toString(), icon: Store, color: "text-primary" },
    { title: "Active Customers", value: stats.customers.toString(), icon: Users, color: "text-accent" },
    { title: "Feedback Received", value: stats.feedbacks.toString(), icon: MessageSquare, color: "text-blue-600 dark:text-blue-400" },
  ];

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your FashionConnect platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsData.map((stat) => (
            <Card
              key={stat.title}
              className="p-6 border-0 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-primary/10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pending Shop Approvals */}
        <Card className="p-6 border-0 shadow-[var(--shadow-soft)] mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Pending Shop Approvals</h2>
            <Badge variant="secondary">{pendingShops.length} pending</Badge>
          </div>

          {pendingShops.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No pending approvals</p>
          ) : (
            <div className="space-y-4">
              {pendingShops.map((shop) => (
                <div
                  key={shop.id}
                  className="p-4 rounded-lg border bg-card flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-semibold text-lg">{shop.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Owner: {shop.profiles?.full_name || 'N/A'}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      {shop.profiles?.phone && (
                        <span className="text-muted-foreground">
                          📱 {shop.profiles.phone}
                        </span>
                      )}
                      {shop.profiles?.email && (
                        <span className="text-muted-foreground">
                          ✉️ {shop.profiles.email}
                        </span>
                      )}
                    </div>
                    {shop.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {shop.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" className="gap-2" onClick={() => handleApprove(shop.id)}>
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-2 text-destructive"
                      onClick={() => handleReject(shop.id)}
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Role Switcher */}
        <Card className="p-6 border-0 shadow-[var(--shadow-soft)]">
          <h2 className="text-xl font-bold mb-4">Switch Views</h2>
          <div className="flex gap-4">
            <Button asChild variant="outline" className="h-auto py-4 flex-1">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Customer View
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
