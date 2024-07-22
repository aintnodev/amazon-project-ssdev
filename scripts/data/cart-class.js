class Cart {
  cartItems;
  localStorageKey;

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    const quantity = 1;
    // const quantity = Number(
    //   document.querySelector(`.quantity-selector-${productId}`).value
    // );

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeCartItem(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem["quantity"] = newQuantity;
      }
    });

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart();
const businessCart = new Cart();

cart.localStorageKey = "cart-class";
businessCart.localStorageKey = "business-cart-class";

cart.loadFromStorage();
businessCart.loadFromStorage();

cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
businessCart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");

console.log(cart);
console.log(businessCart);
