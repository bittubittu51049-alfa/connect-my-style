import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  shop: string;
  rating?: number;
  discount?: number;
}

export const ProductCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  shop,
  discount,
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300">
      <Link to={`/product/${id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {discount && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              {discount}% OFF
            </Badge>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist logic
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{shop}</p>
          <Link to={`/product/${id}`}>
            <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">${price}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
          </div>

          <Button size="icon" variant="outline" className="shrink-0">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
