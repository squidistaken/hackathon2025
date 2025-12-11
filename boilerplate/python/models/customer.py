class Customer:
    def __init__(self, customer_id, name, email, phone=None, address=None):
        self.customer_id = customer_id
        self.name = name
        self.email = email
        self.phone = phone
        self.address = address

    def to_dict(self):
        """Convert customer object to dictionary"""
        return {
            "customer_id": self.customer_id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address
        }

    @staticmethod
    def from_dict(data):
        """Create a Customer object from dictionary"""
        return Customer(
            customer_id=data.get("customer_id"),
            name=data.get("name"),
            email=data.get("email"),
            phone=data.get("phone"),
            address=data.get("address")
        )
