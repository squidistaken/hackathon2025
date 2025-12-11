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

    def __repr__(self) -> str:
        return f"<ShippingOption {self.name} - ${self.cost:.2f}>"
