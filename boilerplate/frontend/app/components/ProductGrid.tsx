import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Product, Category } from "../data/products";
import { CompareDrawer } from "./CompareDrawer";
import { useNavigate } from "react-router";

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
  const [compared, setCompared] = React.useState<number[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [showTable, setShowTable] = React.useState(false);
  const navigate = useNavigate();

  const toggleCompare = (id: number) => {
    setCompared((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev
    );
    setDrawerOpen(true);
  };

  const handleRemove = (id: number) => {
    setCompared((prev) => prev.filter((pid) => pid !== id));
  };

  const handleCompare = () => {
    if (compared.length >= 2) {
      setShowTable(true);
      setDrawerOpen(false);
    }
  };

  const comparedProducts = products.filter((p) => compared.includes(p.id));

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
              onCompareClick={() => toggleCompare(product.id)}
              isCompared={compared.includes(product.id)}
            />
          ))}
        </div>
      )}

      {/* Comparison Drawer */}
      <CompareDrawer
        compared={comparedProducts}
        onRemove={handleRemove}
        onCompare={handleCompare}
        open={drawerOpen && compared.length > 0}
        onClose={() => setDrawerOpen(false)}
      />
      {showTable && comparedProducts.length >= 2 && (
        <div className="mt-8 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow">
          <h3 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-200">
            Product Comparison
          </h3>
          <div className="overflow-x-auto">
            <div className="flex gap-6 justify-center">
              {comparedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-1 min-w-[220px] bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-contain mx-auto mb-2"
                  />
                  <div className="font-bold text-zinc-900 dark:text-zinc-50 mb-1 text-center">
                    {product.name}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-center">
                    €{product.price.toFixed(2)}
                  </div>
                  <div className="text-xs text-zinc-700 dark:text-zinc-300 mb-2 text-center">
                    {product.description}
                  </div>
                  {/* Add more specs here if available */}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold"
              onClick={() => setShowTable(false)}
            >
              Close Comparison
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
