class ShippingOption:
    def __init__(self,
                 name: str,
                 cost: float,
                 estimated_delivery_days: int,
                 description: str = "") -> None:
        self.name = name
        self.cost = cost
        self.estimated_delivery_days = estimated_delivery_days
        self.description = description

    def calculate_cost(self) -> float:
        return self.cost

    def to_dict(self) -> dict:
        """Convert ShippingOption object to dictionary for serialization."""
        return {
            "name": self.name,
            "cost": self.cost,
            "estimated_delivery_days": self.estimated_delivery_days,
            "description": self.description,
        }

    def __repr__(self) -> str:
        return f"<ShippingOption {self.name} - ${self.cost:.2f}>"
