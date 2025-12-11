from typing import Optional
from boilerplate.python.models.product import Product


class CartItem:
    def __init__(self,
                 product: 'Product',
                 quantity: int,
                 price_at_added: Optional[float] = None):
        self.product = product
        self.quantity = quantity
        self.price_at_added = (price_at_added if price_at_added
                               is not None else product.price)

    def calculate_subtotal(self) -> float:
        return self.quantity * self.price_at_added

    def update_quantity(self, new_quantity: int):
        self.quantity = new_quantity

    def __repr__(self) -> str:
        return f"<CartItem {self.product.name} x {self.quantity}>"
