import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import Map from "@/components/Map";

const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    customerAddress: "123, MG Road, Bangalore, Karnataka - 560001",
    location: [12.9716, 77.5946] as [number, number],
    product: "Stylish Fashion Item 1",
    image: "/placeholder.svg",
    quantity: 2,
    price: 4999,
    total: 9998,
    status: "pending",
    date: "2024-10-28",
    paymentMethod: "UPI",
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customerName: "Priya Patel",
    customerPhone: "+91 87654 32109",
    customerAddress: "456, Tech Park, Whitefield, Bangalore - 560066",
    location: [12.9698, 77.7500] as [number, number],
    product: "Stylish Fashion Item 2",
    image: "/placeholder.svg",
    quantity: 1,
    price: 6499,
    total: 6499,
    status: "packed",
    date: "2024-10-27",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customerName: "Amit Kumar",
    customerPhone: "+91 76543 21098",
    customerAddress: "789, Koramangala, Bangalore - 560034",
    location: [12.9352, 77.6245] as [number, number],
    product: "Stylish Fashion Item 3",
    image: "/placeholder.svg",
    quantity: 3,
    price: 4999,
    total: 14997,
    status: "on-the-way",
    date: "2024-10-26",
    paymentMethod: "UPI",
  },
];

const ShopOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);

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

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
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

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <QrCode className="h-4 w-4 mr-2" />
                          View Details & QR
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-6 mt-4">
                          {/* QR Code */}
                          <div className="flex justify-center p-6 bg-muted rounded-lg">
                            <div className="bg-white p-4 rounded-lg">
                              <QRCodeSVG
                                value={JSON.stringify({
                                  orderNumber: order.orderNumber,
                                  total: order.total,
                                  customer: order.customerName,
                                })}
                                size={200}
                                level="H"
                              />
                            </div>
                          </div>
                          <p className="text-sm text-center text-muted-foreground">
                            Scan this QR code to complete the order
                          </p>

                          {/* Customer Details */}
                          <div className="space-y-3">
                            <h3 className="font-bold text-lg">Customer Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium">{order.customerName}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium">{order.customerPhone}</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-sm text-muted-foreground">Delivery Address</p>
                                <p className="font-medium">{order.customerAddress}</p>
                              </div>
                            </div>
                          </div>

                          {/* Order Details */}
                          <div className="space-y-3">
                            <h3 className="font-bold text-lg">Order Details</h3>
                            <div className="flex gap-4">
                              <img
                                src={order.image}
                                alt={order.product}
                                className="h-20 w-20 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-semibold">{order.product}</p>
                                <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
                                <p className="text-sm text-muted-foreground">Price per item: ₹{order.price.toLocaleString('en-IN')}</p>
                              </div>
                            </div>
                          </div>

                          {/* Payment Summary */}
                          <div className="space-y-3">
                            <h3 className="font-bold text-lg">Payment Summary</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>₹{order.total.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Delivery Fee</span>
                                <span className="text-green-600">FREE</span>
                              </div>
                              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                <span>Total Amount</span>
                                <span className="text-primary">₹{order.total.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Payment Method</span>
                                <span className="font-medium">{order.paymentMethod}</span>
                              </div>
                            </div>
                          </div>

                          {/* Delivery Location Map */}
                          <div className="space-y-3">
                            <h3 className="font-bold text-lg">Delivery Location</h3>
                            <Map
                              center={order.location}
                              zoom={15}
                              markers={[{
                                position: order.location,
                                title: order.customerName,
                                description: order.customerAddress,
                              }]}
                              className="h-[300px] w-full rounded-lg"
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
