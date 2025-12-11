from typing import Optional

from models.customer import Customer
from models.order import Order
from models.shipping_option import ShippingOption

from repositories.cart_repository import CartRepository
from repositories.product_repository import ProductRepository


class CheckoutService:
    def __init__(
        self,
        cart_repo: CartRepository,
        product_repo: ProductRepository,
    ):
        self.cart_repo = cart_repo
        self.product_repo = product_repo

    def checkout(
        self,
        customer_id: int,
        customer: Customer,
        shipping_option: Optional[ShippingOption] = None,
    ) -> Order:
        """
        Perform a checkout:
        - Validate cart exists and is not empty
        - Validate product availability
        - Convert cart into Order
        - Clear cart
        (Stock deduction is caller responsibility)
        """
        cart = self.cart_repo.get_cart(customer_id)
        if not cart or len(cart.items) == 0:
            raise ValueError("Cannot checkout: Cart is empty")
        
        # Validate product availability in a single loop
        for item in cart.items:
            stored_product = self.product_repo.get_product(item.product.product_id)
            if not stored_product:
                raise ValueError(f"Product {item.product.name} no longer exists")
            if stored_product.stock is not None and stored_product.stock < item.quantity:
                raise ValueError(
                    f"Not enough stock for {stored_product.name}: "
                    f"requested {item.quantity}, available {stored_product.stock}"
                )
        
        order = cart.to_order(customer=customer, shipping_option=shipping_option)
        self.cart_repo.clear_cart(customer_id)
        return order
