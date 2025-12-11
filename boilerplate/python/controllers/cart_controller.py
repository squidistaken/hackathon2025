from fastapi import HTTPException
from models.cart import Cart
from models.product import Product
from repositories.cart_repository import CartRepository


class CartController:
    def __init__(self):
        self.cart_repo = CartRepository()

    def view_cart(self, customer_id: int):
        cart = self.cart_repo.get_cart(customer_id)
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")

        return {
            "items": [
                {
                    "product_id": item.product.product_id,
                    "product_name": item.product.name,
                    "quantity": item.quantity,
                    "subtotal": item.calculate_subtotal(),
                }
                for item in cart.items
            ],
            "total": cart.calculate_total(),
        }

    def add_to_cart(self, customer_id: int, product_id: int,
                    quantity: int = 1):
        cart = self.cart_repo.get_cart(customer_id) or Cart()

        # TODO: Replace with actual product fetching logic
        product = Product(
            product_id=product_id,
            name="Example Product",
            price=10.0,
            currency="USD",
            stock=100,
        )

        cart.add_item(product, quantity=quantity)
        self.cart_repo.save_cart(customer_id, cart)

        return {"message": "Item added to cart"}
