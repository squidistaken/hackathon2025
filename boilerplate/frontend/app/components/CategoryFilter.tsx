import { Badge } from "./ui/badge";
import type { Category } from "../data/products";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  return (
    <section className="px-4 py-4 overflow-x-hidden">
      <div className="flex gap-2 whitespace-nowrap">
        {categories.map((category) => (
          <Badge
            key={category.id}
            className={`px-4 py-2 cursor-pointer transition-colors ${
              selectedCategory === category.id
                ? ""
                : "bg-transparent text-zinc-900 dark:text-zinc-50 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.label}
          </Badge>
        ))}
      </div>
    </section>
  );
}
