from models.cart import Cart


class CartService:
    def __init__(self, cart_repository, product_repository):
        self.cart_repo = cart_repository
        self.product_repo = product_repository

    def get_cart(self, customer_id: int) -> Cart:
        """Get a cart for a customer (create new if doesn't exist)"""
        return self.cart_repo.get_cart(customer_id) or Cart()

    def add_item_to_cart(self, customer_id: int, product_id: int, quantity: int = 1) -> Cart:
        """Add an item to the cart"""
        cart = self.get_cart(customer_id)
        product = self.product_repo.get_product(product_id)
        if not product:
            raise ValueError("Product not found")

        cart.add_item(product, quantity)
        self.cart_repo.save_cart(customer_id, cart)
        return cart

    def view_cart(self, customer_id: int) -> dict:
        """Get cart details for a customer"""
        cart = self.get_cart(customer_id)
        return {
            "items": [
                {
                    "product_id": item.product.product_id,
                    "product_name": item.product.name,
                    "quantity": item.quantity,
                    "subtotal": item.calculate_subtotal(),
                }
                for item in cart.items
            ],
            "total": cart.calculate_total(),
        }

    def remove_item_from_cart(self, customer_id: int, product_id: int) -> Cart:
        """Remove an item from the cart"""
        cart = self.get_cart(customer_id)
        product = self.product_repo.get_product(product_id)
        if not product:
            raise ValueError("Product not found")

        cart.remove_item(product)
        self.cart_repo.save_cart(customer_id, cart)
        return cart

    def update_item_quantity(self, customer_id: int, product_id: int, quantity: int) -> Cart:
        """Update the quantity of an item in the cart"""
        cart = self.get_cart(customer_id)
        product = self.product_repo.get_product(product_id)
        if not product:
            raise ValueError("Product not found")

        cart.update_quantity(product, quantity)
        self.cart_repo.save_cart(customer_id, cart)
        return cart

    def clear_cart(self, customer_id: int) -> Cart:
        """Clear all items from the cart"""
        cart = self.get_cart(customer_id)
        cart.clear()
        self.cart_repo.save_cart(customer_id, cart)
        return cart
