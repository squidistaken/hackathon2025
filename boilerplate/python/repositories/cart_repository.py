from typing import Dict, Optional
from models.cart import Cart


# TODO: Replace with DB.
class CartRepository:
    def __init__(self):
        self._carts: Dict[int, Cart] = {}

    def get_cart(self, customer_id: int) -> Optional[Cart]:
        return self._carts.get(customer_id)

    def save_cart(self, customer_id: int, cart: Cart) -> None:
        self._carts[customer_id] = cart

    def delete_cart(self, customer_id: int) -> None:
        if customer_id in self._carts:
            del self._carts[customer_id]

    def clear_cart(self, customer_id: int) -> None:
        """Clear all items from a customer's cart."""
        if customer_id in self._carts:
            self._carts[customer_id].clear()

    def cart_exists(self, customer_id: int) -> bool:
        """Check if a cart exists for a customer."""
        return customer_id in self._carts
