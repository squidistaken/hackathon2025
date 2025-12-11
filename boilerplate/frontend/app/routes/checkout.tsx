import { useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotalPrice } = useCart();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [done, setDone] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center">
      {/* Breadcrumb */}
      <nav className="w-full max-w-md mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          Home
        </span>{" "}
        &gt; <span>Checkout</span>
      </nav>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-extrabold mb-6 text-zinc-900 dark:text-zinc-50 tracking-tight">
          Checkout
        </h2>
        {/* Cart Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-zinc-800 dark:text-zinc-100">
            Your Cart
          </h3>
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800 mb-2">
            {cart.length === 0 ? (
              <li className="py-4 text-zinc-500 dark:text-zinc-400 text-center">
                Your cart is empty.
              </li>
            ) : (
              cart.map((item) => (
                <li key={item.id} className="flex items-center py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover mr-4 border border-zinc-200 dark:border-zinc-800"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {item.name}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-50">
                    €{(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))
            )}
          </ul>
          <div className="flex justify-between items-center pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <span className="font-bold text-zinc-700 dark:text-zinc-200">
              Total
            </span>
            <span className="font-bold text-green-600 dark:text-green-400 text-lg">
              €{getTotalPrice().toFixed(2)}
            </span>
          </div>
        </div>
        {/* Customer Form */}
        {!done ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
                Name
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
                Email
              </label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
                Address
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                value={customer.address}
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
                }
                placeholder="Enter your address"
              />
            </div>
            <Button
              type="button"
              className="w-full h-12 text-base"
              onClick={() => setDone(true)}
            >
              Done!
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              Thank you for your order!
            </h2>
            <p className="text-zinc-700 dark:text-zinc-200 mb-6">
              Your (dummy) checkout is complete.
            </p>
            <Button
              className="w-full h-12 text-base"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
