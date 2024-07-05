import {
  addToCart,
  cart,
  loadCartFromStorage,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

describe("test suite : addToCart", () => {
  let mockElement;

  beforeEach(() => {
    // Create a mock input element for quantity selection
    mockElement = document.createElement("input");
    mockElement.className =
      "js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    mockElement.value = "1"; // Set initial value
    document.body.appendChild(mockElement);
  });

  afterEach(() => {
    document.body.removeChild(mockElement);
  });

  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadCartFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadCartFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});

describe("test suite : removeFromCart", () => {
  it("removes existing product from cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadCartFromStorage();
    removeFromCart(productId1);
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});

describe("test suite : updateDeliveryOption", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadCartFromStorage();
  });
  it("update the delivery option of a  product  that's in the cart", () => {
    updateDeliveryOption(productId1, "2");
    expect(cart[0].deliveryOptionId).toEqual("2");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("update the delivery option of a product that's not  in the cart", () => {
    updateDeliveryOption(productId2, "2");
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("delivery option deosn't exist", () => {
    updateDeliveryOption(productId1, "4");
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
