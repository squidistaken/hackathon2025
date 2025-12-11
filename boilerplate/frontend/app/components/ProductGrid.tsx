import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Product, Category } from "../data/products";

interface ProductGridProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  getCartItemQuantity: (productId: number) => number;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: number) => void;
  onResetCategory: () => void;
}

export function ProductGrid({
  products,
  categories,
  selectedCategory,
  getCartItemQuantity,
  onProductClick,
  onAddToCart,
  onRemoveFromCart,
  onResetCategory,
}: ProductGridProps) {
  return (
    <section className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          {selectedCategory === "all"
            ? "All Products"
            : categories.find((c) => c.id === selectedCategory)?.label}
          <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400 ml-2">
            ({products.length})
          </span>
        </h2>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Menu className="h-16 w-16 text-zinc-300 dark:text-zinc-700 mb-4" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            No products found
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            Try selecting a different category
          </p>
          <Button onClick={onResetCategory}>View All Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={getCartItemQuantity(product.id)}
              onProductClick={() => onProductClick(product)}
              onAddToCart={() => onAddToCart(product)}
              onRemoveFromCart={() => onRemoveFromCart(product.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
