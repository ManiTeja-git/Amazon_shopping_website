import { addToCart, cart, loadCartFromStorage } from "../../data/cart.js";

describe("test suite : addToCart", () => {
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

    // Create a mock input element for quantity selection
    let mockElement = document.createElement("input");
    mockElement.className =
      "js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    mockElement.value = "1"; // Set initial value
    document.body.appendChild(mockElement);

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

    document.body.removeChild(mockElement);
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    // Create a mock input element for quantity selection
    let mockElement = document.createElement("input");
    mockElement.className =
      "js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    mockElement.value = "2"; // Set initial value
    document.body.appendChild(mockElement);

    loadCartFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);

    document.body.removeChild(mockElement);
  });
});
