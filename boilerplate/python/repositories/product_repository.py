from typing import Dict, Any, Optional, List

class ProductRepository:
    def __init__(self):
        self._products: Dict[int, Dict[str, Any]] = {}

    def get_product(self, product_id: int) -> Optional[Dict[str, Any]]:
        """Retrieve a product by ID."""
        return self._products.get(product_id)

    def save_product(self, product: Dict[str, Any]) -> None:
        """Save or update a product."""
        self._products[product["product_id"]] = product

    def delete_product(self, product_id: int) -> None:
        """Delete a product by ID."""
        if product_id in self._products:
            del self._products[product_id]

    def product_exists(self, product_id: int) -> bool:
        """Check if a product exists."""
        return product_id in self._products

    def get_all_products(self) -> List[Dict[str, Any]]:
        """Return all stored products."""
        return list(self._products.values())
