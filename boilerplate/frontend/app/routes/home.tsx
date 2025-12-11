import type { Route } from "./+types/home";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Header } from "../components/Header";
import { HeroBanner } from "../components/HeroBanner";
import { CategoryFilter } from "../components/CategoryFilter";
import { FlashSaleBanner } from "../components/FlashSaleBanner";
import { ProductGrid } from "../components/ProductGrid";
import { ToastNotification } from "../components/ToastNotification";
import { CartSidebar } from "../components/CartSidebar";
import { SearchOverlay } from "../components/SearchOverlay";
import { useCart } from "../hooks/useCart";
import { products, categories, popularSearches } from "../data/products";
import { createProductSlug, filterProducts } from "../utils/productUtils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Godimo - Buy Latest Smartphones" },
    {
      name: "description",
      content:
        "Shop the latest smartphones and mobile devices at the best prices!",
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const {
    cart,
    showToast,
    toastMessage,
    addToCart,
    removeFromCart,
    getCartItemQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Navigate to product detail page
  const goToProduct = (productName: string) => {
    const slug = createProductSlug(productName);
    navigate(`/product/${slug}`);
  };

  // Get filtered products
  const filteredProducts = filterProducts(
    products,
    selectedCategory,
    searchQuery
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <Header
        totalItems={getTotalItems()}
        onSearchClick={() => setIsSearchOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="pt-16">
        <HeroBanner />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <FlashSaleBanner />
        <ProductGrid
          products={filteredProducts}
          categories={categories}
          selectedCategory={selectedCategory}
          getCartItemQuantity={getCartItemQuantity}
          onProductClick={(product) => goToProduct(product.name)}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          onResetCategory={() => setSelectedCategory("all")}
        />
      </main>

      {/* Toast Notification */}
      {showToast && <ToastNotification message={toastMessage} />}

      {/* Cart Summary Floating Button */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 right-4 z-40">
          <Button
            className="h-12 px-4 shadow-lg"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />€
            {getTotalPrice().toFixed(2)}
          </Button>
        </div>
      )}

      {/* Cart Side Panel */}
      {isCartOpen && (
        <CartSidebar
          cart={cart}
          products={products}
          totalPrice={getTotalPrice()}
          totalItems={getTotalItems()}
          onClose={() => setIsCartOpen(false)}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
        />
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <SearchOverlay
          searchQuery={searchQuery}
          filteredProducts={filteredProducts}
          categories={categories}
          popularSearches={popularSearches}
          onClose={() => {
            setIsSearchOpen(false);
            setSearchQuery("");
          }}
          onSearchChange={setSearchQuery}
          onSearchClear={() => setSearchQuery("")}
          onProductClick={(product) => {
            setIsSearchOpen(false);
            setSearchQuery("");
            goToProduct(product.name);
          }}
          onAddToCart={addToCart}
          onPopularSearchClick={setSearchQuery}
        />
      )}
    </div>
  );
}
