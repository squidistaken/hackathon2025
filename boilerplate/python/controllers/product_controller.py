from typing import Dict, Optional, List
from hackathlon.hackathon2025.boilerplate.python.models.product import Product 


class ProductController:
    def __init__(self):
        self.products: Dict[int, Product] = {}

    def add_product(self, product: Product) -> None:
        """Add a new product."""
        self.products[product.product_id] = product

    def get_product(self, product_id: int) -> Optional[Product]:
        """Retrieve a product by ID."""
        return self.products.get(product_id)

    def get_all_products(self) -> List[Product]:
        """Return all products."""
        return list(self.products.values())

    def delete_product(self, product_id: int) -> bool:
        """Delete a product by ID. Returns True if successful."""
        if product_id in self.products:
            del self.products[product_id]
            return True
        return False
