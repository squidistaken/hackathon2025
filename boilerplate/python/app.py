from fastapi import FastAPI
from controllers.product_controller import ProductController
from controllers.cart_controller import CartController
from controllers.checkout_controller import CheckoutController

app = FastAPI()

@app.get("/products/id/{product_id}")
def products():
    return ProductController().get_all_products()

# TODO: Fix parameters
@app.get("/cart")
def cart():
    return CartController().view_cart(0)

@app.post("/cart/add")
def cart_add():
    return CartController().add_to_cart(0, 0)

@app.post("/checkout")
def checkout():
    return CheckoutController().process_checkout(0, None)
