from typing import List, Optional
from datetime import datetime
from .cart_item import CartItem
from .customer import Customer
from .shipping_option import ShippingOption


class Order:
    def __init__(self,
                 customer: 'Customer',
                 items: list['CartItem'],
                 shipping_option: Optional['ShippingOption'] = None,
                 order_date: Optional[datetime] = None,
                 status: str = 'pending') -> None:
        self.customer = customer
        self.items = items
        self.shipping_option = shipping_option
        self.order_date = order_date if order_date else datetime.now()
        self.status = status

    def calculate_total(self) -> float:
        items_total = sum(item.calculate_subtotal() for item in self.items)

        shipping_cost = (self.shipping_option.cost
                         if self.shipping_option else 0.0)
        return items_total + shipping_cost

    def update_status(self, new_status: str) -> None:
        self.status = new_status

    def add_item(self, item: 'CartItem') -> None:
        self.items.append(item)

    def remove_item(self, item: 'CartItem') -> None:
        self.items.remove(item)

    def __repr__(self) -> str:
        return f"<Order {self.order_date} - {self.status}>"
