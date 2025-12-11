import { Button } from "./ui/button";
import { ShoppingCart, Search } from "lucide-react";

interface HeaderProps {
  totalItems: number;
  onSearchClick: () => void;
  onCartClick: () => void;
}

export function Header({ totalItems, onSearchClick, onCartClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Godimo
          </h1>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={onSearchClick}>
              <Search className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
