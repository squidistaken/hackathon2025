from typing import List
from fastapi import HTTPException

from models.product import Product
from repositories.product_repository import ProductRepository


class ProductController:
    def __init__(self):
        self.product_repo = ProductRepository()

    def add_product(self, product: Product):
        """Add a new product."""
        if self.product_repo.product_exists(product.product_id):
            raise HTTPException(status_code=400, detail="Product ID already exists")

        self.product_repo.save_product(product)
        return {"message": "Product added successfully."}

    def get_product(self, product_id: int) -> Product:
        """Retrieve a product by ID."""
        product = self.product_repo.get_product(product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product

    def get_all_products(self) -> List[Product]:
        """Return all products."""
        return self.product_repo.get_all_products()

    def delete_product(self, product_id: int):
        """Delete a product by ID."""
        if not self.product_repo.product_exists(product_id):
            raise HTTPException(status_code=404, detail="Product not found")

        self.product_repo.delete_product(product_id)
        return {"message": "Product deleted successfully."}
