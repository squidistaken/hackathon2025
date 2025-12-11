# controllers/checkout_controller.py
from fastapi import HTTPException, Depends
from typing import Optional
from models.shipping_option import ShippingOption
from repositories.cart_repository import CartRepository
from repositories.product_repository import ProductRepository
from services.checkout_service import CheckoutService


class CheckoutController:
    def __init__(
        self,
        cart_repo: CartRepository = Depends(CartRepository),
        product_repo: ProductRepository = Depends(ProductRepository)
    ):
        self.shipping_options = [
            ShippingOption(
                name="Standard",
                cost=5.99,
                estimated_delivery_days=5,
                description="Standard delivery within 5 business days"
            ),
            ShippingOption(
                name="Express",
                cost=12.99,
                estimated_delivery_days=2,
                description="Express delivery within 2 business days"
            ),
            ShippingOption(
                name="Overnight",
                cost=24.99,
                estimated_delivery_days=1,
                description="Overnight delivery"
            )
        ]
        self.checkout_service = CheckoutService(cart_repo, product_repo)

    def get_shipping_options(self):
        """Get available shipping options"""
        return self.shipping_options

    def process_checkout(self, customer_id: int, shipping_option_name: Optional[str] = None):
        """Process checkout for a customer"""
        # Find selected shipping option
        shipping_option = None
        if shipping_option_name:
            shipping_option = next(
                (opt for opt in self.shipping_options if opt.name.lower() == shipping_option_name.lower()),
                None
            )
            if not shipping_option:
                raise HTTPException(status_code=400, detail="Invalid shipping option")

        try:
            # Use the service to perform checkout
            order = self.checkout_service.checkout(customer_id, shipping_option)

            # Prepare response
            response = {
                "message": "Checkout successful.",
                "order": {
                    "order_id": hash(f"{customer_id}{len(order.items)}{shipping_option_name or 'none'}"),
                    "customer": {
                        "id": customer.customer_id,
                        "name": customer.name,
                        "email": customer.email
                    },
                    "items": [
                        {
                            "product_id": item.product.product_id,
                            "product_name": item.product.name,
                            "quantity": item.quantity,
                            "subtotal": item.calculate_subtotal()
                        } for item in order.items
                    ],
                    "subtotal": sum(item.calculate_subtotal() for item in order.items),
                    "status": order.status
                }
            }

            # Add shipping information if a shipping option was selected
            if shipping_option:
                response["order"]["shipping"] = {
                    "option": shipping_option.name,
                    "cost": shipping_option.cost,
                    "estimated_delivery_days": shipping_option.estimated_delivery_days,
                    "description": shipping_option.description
                }
                response["order"]["total"] = order.calculate_total()
            else:
                response["order"]["total"] = response["order"]["subtotal"]

            return response

        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
