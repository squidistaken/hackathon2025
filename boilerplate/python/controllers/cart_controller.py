from models.cart import Cart
from models.product import Product


def view_cart():
    cart = Cart()

    return {
        "items": [{
            "product_name": item.product,
            "quantity": item.quantity,
            "subtotal": item.calculate_subtotal(),
        } for item in cart.items
        ],
        "total": cart.calculate_total()
    }


def add_to_cart(product_id: int, quantity: int = 1):
    product = Product(product_id=product_id, name="Example")
    cart = Cart()
    cart.add_item(product, quantity=quantity)

    return {"message": "Item added to cart"}

