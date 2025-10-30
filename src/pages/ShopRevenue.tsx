import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, DollarSign, ShoppingBag, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const revenueStats = [
  { title: "Today's Revenue", value: "₹12,450", icon: DollarSign, trend: "+18%" },
  { title: "This Month", value: "₹3,45,890", icon: Calendar, trend: "+25%" },
  { title: "Total Orders", value: "856", icon: ShoppingBag, trend: "+12%" },
  { title: "Growth Rate", value: "23%", icon: TrendingUp, trend: "+5%" },
];

const recentTransactions = [
  { id: 1, order: "ORD-2024-001", amount: 9998, date: "2024-10-28", customer: "Rahul Sharma" },
  { id: 2, order: "ORD-2024-002", amount: 6499, date: "2024-10-28", customer: "Priya Patel" },
  { id: 3, order: "ORD-2024-003", amount: 14997, date: "2024-10-27", customer: "Amit Kumar" },
  { id: 4, order: "ORD-2024-004", amount: 8499, date: "2024-10-27", customer: "Sneha Singh" },
  { id: 5, order: "ORD-2024-005", amount: 11999, date: "2024-10-26", customer: "Vikram Mehta" },
];

const ShopRevenue = () => {
  const totalRevenue = recentTransactions.reduce((sum, t) => sum + t.amount, 0);

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
            <h1 className="text-3xl font-bold">Revenue Dashboard</h1>
            <p className="text-muted-foreground">Track your earnings and performance</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {revenueStats.map((stat) => (
            <Card
              key={stat.title}
              className="p-6 border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-green-600">{stat.trend}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 border-0 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Transactions</h2>
            <p className="text-sm text-muted-foreground">
              Total: <span className="font-bold text-primary">₹{totalRevenue.toLocaleString('en-IN')}</span>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-right py-3 px-4 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{transaction.order}</td>
                    <td className="py-4 px-4">{transaction.customer}</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-primary">
                      ₹{transaction.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ShopRevenue;
