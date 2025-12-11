from .cart_item import CartItem
from typing import List, Optional
from .order import Order
from .shipping_option import ShippingOption
from .product import Product


class Cart:
    def __init__(self) -> None:
        self.items: List[CartItem] = []

    def add_item(self, product: Product, quantity: int = 1) -> None:
        existing_item = next(
            (item for item in self.items if item.product == product),
            None,
        )
        if existing_item:
            existing_item.update_quantity(existing_item.quantity + quantity)
        else:
            self.items.append(CartItem(product=product, quantity=quantity))

    def remove_item(self, product: Product) -> None:
        self.items = [item for item in self.items if item.product != product]

    def update_quantity(self, product: Product, new_quantity: int) -> None:
        for item in self.items:
            if item.product == product:
                item.update_quantity(new_quantity)
                break

    def clear(self) -> None:
        self.items.clear()

    def calculate_total(self) -> float:
        return sum(item.calculate_subtotal() for item in self.items)

    def __repr__(self) -> str:
        return f"<Cart with {len(self.items)} items>"
