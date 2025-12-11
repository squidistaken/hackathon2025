import React, { useState } from "react";
import { Button } from "./ui/button";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onDone: () => void;
}

export function CheckoutModal({ open, onClose, onDone }: CheckoutModalProps) {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-900"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
          Checkout
        </h2>
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
            onClick={onDone}
          >
            Done!
          </Button>
        </form>
      </div>
    </div>
  );
}
