from fastapi import HTTPException
from repositories.cart_repository import CartRepository
from repositories.product_repository import ProductRepository
from services.cart_service import CartService


class CartController:
    def __init__(self):
        self.cart_repo = CartRepository()
        self.product_repo = ProductRepository()
        self.cart_service = CartService(self.cart_repo, self.product_repo)

    def view_cart(self, customer_id: int):
        try:
            return self.cart_service.view_cart(customer_id)
        except ValueError as e:
            raise HTTPException(status_code=404, detail=str(e))

    def add_to_cart(self, customer_id: int, product_id: int, quantity: int = 1):
        try:
            self.cart_service.add_item_to_cart(customer_id, product_id, quantity)
            return {"message": "Item added to cart"}
        except ValueError as e:
            raise HTTPException(status_code=404, detail=str(e))

    def remove_from_cart(self, customer_id: int, product_id: int):
        """Endpoint to remove an item from the cart"""
        try:
            self.cart_service.remove_item_from_cart(customer_id, product_id)
            return {"message": "Item removed from cart"}
        except ValueError as e:
            raise HTTPException(status_code=404, detail=str(e))

    def update_cart_item(self, customer_id: int, product_id: int, quantity: int):
        """Endpoint to update the quantity of an item in the cart"""
        try:
            self.cart_service.update_item_quantity(customer_id, product_id, quantity)
            return {"message": "Item quantity updated"}
        except ValueError as e:
            raise HTTPException(status_code=404, detail=str(e))

    def clear_cart(self, customer_id: int):
        """Endpoint to clear all items from the cart"""
        try:
            self.cart_service.clear_cart(customer_id)
            return {"message": "Cart cleared"}
        except ValueError as e:
            raise HTTPException(status_code=404, detail=str(e))
