import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
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
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shop/:id" element={<ShopDetails />} />
          <Route path="/shop/dashboard" element={<ShopDashboard />} />
          <Route path="/shop/orders" element={<ShopOrders />} />
          <Route path="/shop/products" element={<ShopProducts />} />
          <Route path="/shop/products/new" element={<ShopProductNew />} />
          <Route path="/shop/products/:id/edit" element={<ShopProductEdit />} />
          <Route path="/shop/revenue" element={<ShopRevenue />} />
          <Route path="/checkout/address" element={<CheckoutAddress />} />
          <Route path="/checkout/summary" element={<CheckoutSummary />} />
          <Route path="/checkout/payment" element={<CheckoutPayment />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
