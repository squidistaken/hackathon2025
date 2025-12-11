import React from "react";
import { Button } from "./ui/button";
import type { Product } from "../data/products";

interface CompareDrawerProps {
  compared: Product[];
  onRemove: (id: number) => void;
  onCompare: () => void;
  open: boolean;
  onClose: () => void;
}

export function CompareDrawer({
  compared,
  onRemove,
  onCompare,
  open,
  onClose,
}: CompareDrawerProps) {
  const [showTable, setShowTable] = React.useState(false);

  const handleCompare = () => {
    if (compared.length >= 2) {
      setShowTable(true);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-t-2xl shadow-2xl p-6 border-t border-zinc-200 dark:border-zinc-800 animate-slide-up pointer-events-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-blue-700 dark:text-blue-200">
            Compare Products
          </h3>
          <Button size="icon" variant="ghost" onClick={onClose}>
            ×
          </Button>
        </div>
        <div className="flex gap-4 mb-4">
          {compared.length === 0 ? (
            <div className="text-zinc-500 dark:text-zinc-400">
              No products selected.
            </div>
          ) : (
            compared.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-2 relative"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-contain mb-1"
                />
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                  {product.name}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-1 right-1"
                  onClick={() => onRemove(product.id)}
                >
                  ×
                </Button>
              </div>
            ))
          )}
        </div>
        {!showTable ? (
          <div className="flex justify-end">
            <Button
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold"
              onClick={handleCompare}
              disabled={compared.length < 2}
            >
              Compare
            </Button>
          </div>
        ) : (
          <div className="mt-4">
            <h4 className="text-base font-bold mb-2 text-blue-700 dark:text-blue-200">
              Product Comparison
            </h4>
            <div className="overflow-x-auto">
              <div className="flex gap-6 justify-center">
                {(() => {
                  const minPrice = Math.min(...compared.map((p) => p.price));
                  return compared.map((product) => (
                    <div
                      key={product.id}
                      className={`flex-1 min-w-[180px] bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border ${
                        product.price === minPrice
                          ? "border-green-500 dark:border-green-400"
                          : "border-zinc-200 dark:border-zinc-800"
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-contain mx-auto mb-2"
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
                  ));
                })()}
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
      </div>
    </div>
  );
}
