class Product:
    def __init__(self, product_id, name, description, price, currency,
                 stock, category, attributes):
        self.product_id = product_id
        self.name = name
        self.description = description
        self.price = price
        self.currency = currency
        self.stock = stock  # can be None for subscriptions
        self.category = category
        self.attributes = attributes or {}


    def to_dict(self):
            """Convert Product object to dictionary"""
            return {
                "id": self.product_id,
                "name": self.name,
                "description": self.description,
                "price": self.price,
                "currency": self.currency,
                "stock": self.stock,
                "category": self.category,
                "attributes": self.attributes
            }
            
    def to_dict(self):
        """Convert Product object to dictionary"""
        return {
            "id": self.product_id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "currency": self.currency,
            "stock": self.stock,
            "category": self.category,
            "attributes": self.attributes
        }

    @staticmethod
    def from_dict(data):
        """Create a Product object from dictionary"""
        return Product(
            product_id = data.get("id"),
            name = data.get("name"),
            description = data.get("description"),
            price = data.get("price"),
            currency = data.get("currency"),
            stock = data.get("stock"),
            category = data.get("category"),
            attributes = data.get("attributes")
        )