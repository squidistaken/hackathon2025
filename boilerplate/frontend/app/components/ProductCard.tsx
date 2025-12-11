import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onProductClick: () => void;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  onCompareClick?: () => void;
  isCompared?: boolean;
}

export function ProductCard({
  product,
  quantity,
  onProductClick,
  onAddToCart,
  onRemoveFromCart,
  onCompareClick,
  isCompared,
}: ProductCardProps) {
  return (
    <Card
      className="overflow-hidden active:scale-[0.98] transition-all duration-200 hover:shadow-md cursor-pointer border-zinc-200 dark:border-zinc-800"
      onClick={onProductClick}
    >
      <div className="relative bg-linear-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-contain p-4"
        />
        {product.stock && product.stock < 20 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
            Only {product.stock} left
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-3 relative">
        <div className="space-y-1">
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 line-clamp-2 leading-tight min-h-10">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-end justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-0.5">
              Price
            </p>
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              €{product.price.toFixed(2)}
            </span>
          </div>
          {quantity > 0 ? (
            <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromCart();
                }}
              >
                <Minus className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </Button>
              <span className="text-sm font-bold px-2 text-blue-600 dark:text-blue-400 min-w-6 text-center">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
              >
                <Plus className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </Button>
            </div>
          ) : (
            <Button
              size="icon"
              className="h-9 w-9 rounded-lg shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          )}
        </div>
        {/* Compare Button */}
        {onCompareClick && (
          <Button
            size="sm"
            variant={isCompared ? "default" : "outline"}
            className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${isCompared ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"}`}
            onClick={(e) => {
              e.stopPropagation();
              onCompareClick();
            }}
          >
            {isCompared ? "Selected" : "Compare"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
