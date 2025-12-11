from typing import List, Optional
from models.product import Product
from repositories.product_repository import ProductRepository


class ProductService:
    def __init__(self, repository: Optional[ProductRepository] = None):
        self.repo = repository or ProductRepository()

    def add_product(self, product: Product) -> None:
        """Add a product if it does not already exist."""
        if self.repo.product_exists(product.product_id):
            raise ValueError("Product with this ID already exists.")

        self.repo.save_product(product)

    def get_product(self, product_id: int) -> Optional[Product]:
        """Retrieve product or return None."""
        return self.repo.get_product(product_id)

    def get_all_products(self) -> List[Product]:
        """Return all available products."""
        return self.repo.get_all_products()

    def delete_product(self, product_id: int) -> None:
        """Delete a product by ID."""
        if not self.repo.product_exists(product_id):
            raise ValueError("Product not found.")

        self.repo.delete_product(product_id)

    def update_stock(self, product_id: int, new_stock: Optional[int]) -> None:
        """Business rule: Updating product stock."""
        product = self.repo.get_product(product_id)
        if not product:
            raise ValueError("Product not found.")

        product.update_stock(new_stock)
        self.repo.save_product(product)

    def update_price(self, product_id: int, new_price: float) -> None:
        """Business rule: Updating price with validation."""
        if new_price < 0:
            raise ValueError("Price cannot be negative.")

        product = self.repo.get_product(product_id)
        if not product:
            raise ValueError("Product not found.")

        product.update_price(new_price)
        self.repo.save_product(product)
