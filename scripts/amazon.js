import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurreny } from "./utils/money.js";
import { deliveryOptions } from "../data/delivery-options.js";

let productsHTML = "";

const url = new URL(window.location.href);
const search = url.searchParams.get("search");

let filteredProducts = products;

if (search) {
  filteredProducts = products.filter((product) => {
    let macthingKeyWord = false;
    product.keywords.forEach((keyword) => {
      if (search.toLowerCase().includes(keyword.toLowerCase())) {
        macthingKeyWord = true;
      }
    });
    return (
      macthingKeyWord ||
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  });
}

filteredProducts.forEach((product) => {
  productsHTML += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image" src="${product.image}" />
    </div>
    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>
    <div class="product-rating-container">
      <img class="product-rating-stars" src="${product.getStarsUrl()}" /> 
      <div class="product-rating-count link-primary">${
        product.rating.count
      }</div>
    </div>
    <div class="product-price">$${product.getPrice()}</div>
    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

      ${product.extraInfoHTML()}

    <div class="product-spacer"></div>
    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png" />
      Added
    </div>
    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
      product.id
    }">Add to Cart</button>
  </div>`;
});

document.querySelector(".js-product-grid").innerHTML = productsHTML;

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

function renderAddedToCart(productId) {
  const addedToCartElement = document.querySelector(
    `.js-added-to-cart-${productId}`
  );
  updateCartQuantity;
  addedToCartElement.classList.add("added-to-cart-success");

  return setTimeout(() => {
    addedToCartElement.classList.remove("added-to-cart-success");
  }, 2000);
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  let timeOutId;
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    addToCart(productId);
    updateCartQuantity();

    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = renderAddedToCart(productId);
  });
});

updateCartQuantity();

document
  .querySelector(".js-search-bar")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const searchTerm = document.querySelector(".js-search-bar").value;
      window.location.href = `amazon.html?search=${searchTerm}`;
    }
  });
