from fastapi import FastAPI
from models.product import Product
from controllers.product_controller import ProductController
from controllers.cart_controller import CartController
from controllers.checkout_controller import CheckoutController

app = FastAPI()
cart_controller = CartController()
product_controller = ProductController()


# region Product Endpoints
@app.get("/products/id/{product_id}")
def products():
    return product_controller.get_all_products()


@app.post("/products/", response_model=dict)
def add_product(product: Product):
    """Add a new product"""
    return product_controller.add_product(product)


@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    """Retrieve a product by ID"""
    return product_controller.get_product(product_id)


@app.get("/products/", response_model=List[Product])
def get_all_products():
    """Return all products"""
    return product_controller.get_all_products()


@app.delete("/products/{product_id}", response_model=dict)
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


@app.post("/checkout")
def checkout():
    return CheckoutController().process_checkout(0, None)
