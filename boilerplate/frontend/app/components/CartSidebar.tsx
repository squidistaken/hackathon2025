import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import type { CartItem } from "../types/cart";
import type { Product } from "../data/products";

interface CartSidebarProps {
  cart: CartItem[];
  products: Product[];
  totalPrice: number;
  totalItems: number;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: number) => void;
  onProceedToCheckout: () => void;
}

export function CartSidebar({
  cart,
  products,
  totalPrice,
  totalItems,
  onClose,
  onAddToCart,
  onRemoveFromCart,
  onProceedToCheckout,
}: CartSidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-900 z-50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Cart Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Shopping Cart
            </h2>
            {totalItems > 0 && (
              <Badge variant="secondary">{totalItems} items</Badge>
            )}
          </div>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <Plus className="h-5 w-5 rotate-45" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-16 w-16 text-zinc-300 dark:text-zinc-700 mb-4" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Add some phones to get started!
              </p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      €{item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 rounded-lg w-fit">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => onRemoveFromCart(item.id)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-semibold px-2">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => {
                          const product = products.find(
                            (p) => p.id === item.id
                          );
                          if (product) onAddToCart(product);
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
            {/* Subtotal */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Subtotal
                </span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  €{totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Shipping
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  Free
                </span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold border-t border-zinc-200 dark:border-zinc-800 pt-2">
                <span className="text-zinc-900 dark:text-zinc-50">Total</span>
                <span className="text-zinc-900 dark:text-zinc-50">
                  €{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              className="w-full h-12 text-base"
              size="lg"
              onClick={onProceedToCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
