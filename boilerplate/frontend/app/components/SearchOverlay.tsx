import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, Plus, ShoppingCart } from "lucide-react";
import type { Product, Category } from "../data/products";

interface SearchOverlayProps {
  searchQuery: string;
  filteredProducts: Product[];
  categories: Category[];
  popularSearches: string[];
  onClose: () => void;
  onSearchChange: (query: string) => void;
  onSearchClear: () => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onPopularSearchClick: (term: string) => void;
}

export function SearchOverlay({
  searchQuery,
  filteredProducts,
  categories,
  popularSearches,
  onClose,
  onSearchChange,
  onSearchClear,
  onProductClick,
  onAddToCart,
  onPopularSearchClick,
}: SearchOverlayProps) {
  return (
    <>
      {/* Overlay Background */}
      <div
        className="fixed inset-0 bg-black/60 z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 animate-fade-in">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-zinc-200 dark:border-zinc-800">
            <Search className="h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search for phones, accessories, plans..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent outline-none text-base text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400"
            />
            {searchQuery && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={onSearchClear}
              >
                <Plus className="h-4 w-4 rotate-45" />
              </Button>
            )}
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {searchQuery.trim() ? (
              filteredProducts.length > 0 ? (
                <div className="p-2">
                  {filteredProducts.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                      onClick={() => onProductClick(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-contain bg-zinc-100 dark:bg-zinc-800 rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {
                              categories.find((c) => c.id === product.category)
                                ?.label
                            }
                          </Badge>
                          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                            €{product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        className="h-9 w-9 shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {filteredProducts.length > 6 && (
                    <div className="text-center py-3 text-sm text-zinc-500 dark:text-zinc-400">
                      +{filteredProducts.length - 6} more results
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                  <Search className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-3" />
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    No results found
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Try searching with different keywords
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <Search className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-3" />
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                  Start searching
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Type to find phones, accessories, and more
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {!searchQuery.trim() && (
            <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                POPULAR SEARCHES
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Badge
                    key={term}
                    variant="outline"
                    className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => onPopularSearchClick(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
