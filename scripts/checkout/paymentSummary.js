import { cart, calculateCartQuantity, saveToStorage } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery-options.js";
import { formatCurreny } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
      <div class="payment-summary-title">Order Summary</div>
      <div class="payment-summary-row">
        <div>Items (${calculateCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatCurreny(
          productPriceCents
        )}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-shipping-price">$${formatCurreny(
          shippingPriceCents
        )}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurreny(
          totalBeforeTaxCents
        )}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurreny(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-total-price">$${formatCurreny(
          totalCents
        )}</div>
      </div>

      <button class="place-order-button js-place-order button-primary">
        Place your order
      </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
  const placeOrderButton = document.querySelector(".js-place-order");
  console.log(placeOrderButton);
  console.log(cart.length);
  if (cart.length === 0) {
    placeOrderButton.disabled = true;
    placeOrderButton.classList.add("js-place-order-disabled");
  } else {
    placeOrderButton.disabled = false;
    placeOrderButton.classList.remove("js-place-order-disabled");
  }

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
        const order = await response.json();
        console.log(order);
        addOrder(order);
        const previousCart = [...cart];
        cart.length = 0;
        saveToStorage();
        localStorage.setItem("previousCart", JSON.stringify(previousCart));
      } catch (error) {
        console.log("Unexpected errror, try again");
      }
      window.location.href = "orders.html";
    });
}
