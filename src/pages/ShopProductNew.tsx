import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const ShopProductNew = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/shop/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="text-muted-foreground">Fill in the product details</p>
          </div>
        </div>

        <Card className="p-6 border-0 shadow-[var(--shadow-soft)]">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="images">Product Images</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="Enter product name" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Available</Label>
                <Input id="stock" type="number" placeholder="0" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="original-price">Original Price (₹)</Label>
                <Input id="original-price" type="number" placeholder="0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount-price">Discount Price (₹)</Label>
                <Input id="discount-price" type="number" placeholder="0" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Available Sizes</Label>
                <div className="flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant="outline"
                      size="sm"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Available Colors</Label>
                <div className="flex flex-wrap gap-2">
                  {["Black", "White", "Navy", "Gray", "Red"].map((color) => (
                    <Button
                      key={color}
                      type="button"
                      variant="outline"
                      size="sm"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" size="lg" className="flex-1">
                Add Product
              </Button>
              <Button type="button" variant="outline" size="lg" asChild>
                <Link to="/shop/products">Cancel</Link>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ShopProductNew;
