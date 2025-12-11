from fastapi import FastAPI
from typing import Optional
from models.product import Product
from controllers.product_controller import ProductController
from controllers.cart_controller import CartController
from controllers.checkout_controller import CheckoutController

app = FastAPI()

# Initialize controllers once
product_controller = ProductController()
cart_controller = CartController()
checkout_controller = CheckoutController()


# region Product Endpoints
@app.get("/products/id/{product_id}")
def products():
    return product_controller.get_all_products()


@app.post("/products/")
def add_product(product: Product):
    """Add a new product"""
    return product_controller.add_product(product)


@app.get("/products/{product_id}")
def get_product(product_id: int):
    """Retrieve a product by ID"""
    return product_controller.get_product(product_id)


@app.get("/products/")
def get_all_products():
    """Return all products"""
    return product_controller.get_all_products()


@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    """Delete a product by ID"""
    return product_controller.delete_product(product_id)
# endregion


# region Cart Endpoints
@app.get("/cart/{customer_id}")
def view_cart(customer_id: int):
    """View a customer's cart"""
    return cart_controller.view_cart(customer_id)


@app.post("/cart/{customer_id}/add")
def add_to_cart(customer_id: int, product_id: int, quantity: int = 1):
    """Add an item to the cart"""
    return cart_controller.add_to_cart(customer_id, product_id, quantity)


@app.delete("/cart/{customer_id}/items/{product_id}")
def remove_from_cart(customer_id: int, product_id: int):
    """Remove an item from the cart"""
    return cart_controller.remove_from_cart(customer_id, product_id)


@app.put("/cart/{customer_id}/items/{product_id}")
def update_cart_item(customer_id: int, product_id: int, quantity: int):
    """Update the quantity of an item in the cart"""
    return cart_controller.update_cart_item(customer_id, product_id, quantity)

@app.delete("/cart/{customer_id}/clear")
def clear_cart(customer_id: int):
    """Clear all items from the cart"""
    return cart_controller.clear_cart(customer_id)
# endregion

# region Checkout Endpoints
@app.get("/checkout/shipping-options")
def get_shipping_options():
    """Get available shipping options"""
    return checkout_controller.get_shipping_options()

@app.post("/checkout/{customer_id}")
def process_checkout(customer_id: int, shipping_option_name: Optional[str] = None):
    """Process checkout for a customer"""
    return checkout_controller.process_checkout(customer_id, shipping_option_name)
# endregion
