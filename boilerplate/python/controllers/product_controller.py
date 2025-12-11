from typing import Dict, Any, Optional, List
from fastapi import HTTPException
from repositories.product_repository import ProductRepository
from services.product_service import ProductService

class ProductController:
    def __init__(self):
        self.product_service = ProductService()

    def add_product(self, product: Dict[str, Any]):
        """Add a new product."""
        try:
            self.product_service.add_product(product)
            return {"message": "Product added successfully."}
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    def get_product(self, product_id: int) -> Dict[str, Any]:
        """Retrieve a product by ID."""
        product = self.product_service.get_product(product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product

    def get_all_products(self) -> List[Dict[str, Any]]:
        """Return all products."""
        return self.product_service.get_all_products()

    def delete_product(self, product_id: int):
        """Delete a product by ID."""
        try:
            self.product_service.delete_product(product_id)
            return {"message": "Product deleted successfully."}
        except ValueError as e:
            raise HTTPException(status_code=404, detail=str(e))
