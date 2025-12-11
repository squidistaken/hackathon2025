from typing import Dict, Any, Optional


class Product:
    def __init__(
        self,
        product_id: int,
        name: str,
        description: str = "",
        price: float = 0.0,
        currency: str = "USD",
        stock: Optional[int] = None,
        category: str = "Uncategorized",
        attributes: Optional[Dict[str, Any]] = None,
    ):
        self.product_id = product_id
        self.name = name
        self.description = description
        self.price = price
        self.currency = currency
        self.stock = stock  # Can be None for subscriptions or digital products
        self.category = category
        self.attributes = attributes or {}

    def to_dict(self) -> Dict[str, Any]:
        """Convert Product object to dictionary."""
        return {
            "id": self.product_id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "currency": self.currency,
            "stock": self.stock,
            "category": self.category,
            "attributes": self.attributes,
        }

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> 'Product':
        return Product(
            product_id=data.get("id"),
            name=data.get("name", ""),
            description=data.get("description", ""),
            price=data.get("price", 0.0),
            currency=data.get("currency", "USD"),
            stock=data.get("stock"),
            category=data.get("category", "Uncategorized"),
            attributes=data.get("attributes"),
        )

    def update_price(self, new_price: float) -> None:
        self.price = new_price

    def update_stock(self, new_stock: Optional[int]) -> None:
        self.stock = new_stock

    def is_in_stock(self) -> bool:
        return self.stock is not None and self.stock > 0

    def __repr__(self) -> str:
        return f"<Product {self.name} (${self.price:.2f} {self.currency})>"

    def __str__(self) -> str:
        return self.name
