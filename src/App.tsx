import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Shops from "./pages/Shops";
import ShopDetails from "./pages/ShopDetails";
import ShopDashboard from "./pages/ShopDashboard";
import ShopOrders from "./pages/ShopOrders";
import ShopProducts from "./pages/ShopProducts";
import ShopProductNew from "./pages/ShopProductNew";
import ShopProductEdit from "./pages/ShopProductEdit";
import ShopRevenue from "./pages/ShopRevenue";
import AdminDashboard from "./pages/AdminDashboard";
import CheckoutAddress from "./pages/CheckoutAddress";
import CheckoutSummary from "./pages/CheckoutSummary";
import CheckoutPayment from "./pages/CheckoutPayment";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/shops" element={<ProtectedRoute><Shops /></ProtectedRoute>} />
          <Route path="/shop/:id" element={<ProtectedRoute><ShopDetails /></ProtectedRoute>} />
          <Route path="/shop/dashboard" element={<ProtectedRoute requireRole="shop_owner"><ShopDashboard /></ProtectedRoute>} />
          <Route path="/shop/orders" element={<ProtectedRoute requireRole="shop_owner"><ShopOrders /></ProtectedRoute>} />
          <Route path="/shop/products" element={<ProtectedRoute requireRole="shop_owner"><ShopProducts /></ProtectedRoute>} />
          <Route path="/shop/products/new" element={<ProtectedRoute requireRole="shop_owner"><ShopProductNew /></ProtectedRoute>} />
          <Route path="/shop/products/:id/edit" element={<ProtectedRoute requireRole="shop_owner"><ShopProductEdit /></ProtectedRoute>} />
          <Route path="/shop/revenue" element={<ProtectedRoute requireRole="shop_owner"><ShopRevenue /></ProtectedRoute>} />
          <Route path="/checkout/address" element={<ProtectedRoute><CheckoutAddress /></ProtectedRoute>} />
          <Route path="/checkout/summary" element={<ProtectedRoute><CheckoutSummary /></ProtectedRoute>} />
          <Route path="/checkout/payment" element={<ProtectedRoute><CheckoutPayment /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute requireRole="admin"><AdminDashboard /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
