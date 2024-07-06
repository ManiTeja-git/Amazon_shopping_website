class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadCartFromStorage();
  }

  #loadCartFromStorage() {
    this.cartItems = JSON.parse(
      localStorage.getItem(this.#localStorageKey)
    ) || [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    const quantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`).value
    );
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
  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (productId !== cartItem.productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;

    this.saveToStorage();
  }
  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }
  updateProductQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });
    this.saveToStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    let isInCart = false;
    let isDeliveryOptionIdAvailable = false;

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
        isInCart = true;
      }
    });

    if (
      deliveryOptionId === "1" ||
      deliveryOptionId === "2" ||
      deliveryOptionId === "3"
    ) {
      isDeliveryOptionIdAvailable = true;
    }

    if (isDeliveryOptionIdAvailable && isInCart) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    } else {
      return;
    }
  }
}

const cart = new Cart("cart-oop");
const bussinessCart = new Cart("cart-bussiness");

/*const element = document.createElement("input");
element.className = "js-quantity-selector-83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
element.value = "1"; // Set initial value
document.body.appendChild(element);
cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");*/

console.log(cart);
console.log(bussinessCart);
