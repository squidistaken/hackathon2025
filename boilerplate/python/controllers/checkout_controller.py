from models.cart import Cart
from fastapi import HTTPException
from models.customer import Customer


class CheckoutController:
    def process_checkout(self, customer_id: int, cart: 'Cart'):
        if not cart or not cart.items:
            raise HTTPException(status_code=400, detail="Cart is empty or invalid.")

        customer = Customer(customer_id=customer_id, name="John Doe", email="john.doe@example.com")
        order = cart.to_order(customer=customer)

        cart.clear()

        return {
            "message": "Checkout successful.",
            "order": {
                "order_id": hash(f"{customer_id}{len(order.items)}"),
                "customer": customer_id,
                "items": [{
                    "product_id": item.product.product_id,
                    "product_name": item.product.name,
                    "quantity": item.quantity,
                    "subtotal": item.calculate_subtotal()
                 } for item in order.items
                ],
                "total": order.calculate_total(),
                "status": order.status
            }
        }
