import type { Product } from "../data/products";

/**
 * Converts a product name to a URL-friendly slug
 * Example: "Samsung Galaxy S24 128GB" -> "samsung-galaxy-s24-128gb"
 */
export const createProductSlug = (productName: string): string => {
  return productName.toLowerCase().replace(/\s+/g, "-");
};

/**
 * Converts a slug back to the original product name
 * Example: "samsung-galaxy-s24-128gb" -> "Samsung Galaxy S24 128GB"
 */
export const slugToProductName = (slug: string): string => {
  return slug
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Filters products by category and search query
 */
export const filterProducts = (
  products: Product[],
  category: string,
  searchQuery: string
): Product[] => {
  let filtered = products;

  // Filter by category
  if (category !== "all") {
    filtered = filtered.filter((product) => product.category === category);
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }

  return filtered;
};
