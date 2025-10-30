import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, Users, MessageSquare, CheckCircle, XCircle } from "lucide-react";

const stats = [
  { title: "Total Shops", value: "245", icon: Store, color: "text-primary" },
  { title: "Active Customers", value: "12,456", icon: Users, color: "text-accent" },
  { title: "Feedback Received", value: "89", icon: MessageSquare, color: "text-blue-600" },
];

const pendingShops = [
  {
    id: 1,
    shopName: "Trendy Fashion Hub",
    ownerName: "John Smith",
    mobile: "+1 234 567 8900",
    email: "john@trendyhub.com",
  },
  {
    id: 2,
    shopName: "Elegant Styles",
    ownerName: "Sarah Johnson",
    mobile: "+1 234 567 8901",
    email: "sarah@elegantstyles.com",
  },
  {
    id: 3,
    shopName: "Modern Wardrobe",
    ownerName: "Mike Davis",
    mobile: "+1 234 567 8902",
    email: "mike@modernwardrobe.com",
  },
];

const AdminDashboard = () => {
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
          {stats.map((stat) => (
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

          <div className="space-y-4">
            {pendingShops.map((shop) => (
              <div
                key={shop.id}
                className="p-4 rounded-lg border bg-card flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-lg">{shop.shopName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Owner: {shop.ownerName}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-muted-foreground">
                      📱 {shop.mobile}
                    </span>
                    <span className="text-muted-foreground">
                      ✉️ {shop.email}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button size="sm" className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2 text-destructive">
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Feedback */}
        <Card className="p-6 border-0 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Feedback</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">Customer #{i}</h4>
                    <p className="text-sm text-muted-foreground">
                      Regarding: Fashion Store {i}
                    </p>
                  </div>
                  <Badge variant="outline">New</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Great experience shopping from this platform. The products are
                  high quality and delivery was fast.
                </p>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    Mark as Reviewed
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
