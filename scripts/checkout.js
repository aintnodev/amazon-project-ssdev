import {
  cart,
  removeCartItem,
  updateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

// function addDeliveryDate(days) {
//   const date = dayjs().add(days, "day").format("dddd, MMMM D");
//   return date;
// }
// console.log(addDeliveryDate(4));

let cartSummary = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  cartSummary += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date">Delivery date: ${dateString}</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="cart-item-details">
          <div class="product-name">
          ${matchingProduct.name}
          </div>
          <div class="product-price">$${formatCurrency(
            matchingProduct.priceCents
          )}</div>
          <div class="product-quantity">
            <span> Quantity: <span class="quantity-label quantity-label-${
              matchingProduct.id
            }">${cartItem.quantity}</span> </span>
            <span class="update-quantity-link link-primary" data-product-id="${
              matchingProduct.id
            }">
              Update
            </span>
            <input class="quantity-input quantity-input-${
              matchingProduct.id
            }" data-product-id="${matchingProduct.id}" type="number" value="1">
            <span class="save-quantity-link link-primary" data-product-id="${
              matchingProduct.id
            }">Save</span>
            <span class="delete-quantity-link link-primary" data-product-id="${
              matchingProduct.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>`;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input
          type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>`;
  });

  return html;
}

document.querySelector(".order-summary").innerHTML = cartSummary;

updateCheckoutHeader();

function updateCheckoutHeader() {
  document.querySelector(
    ".return-to-home-link"
  ).innerHTML = `${updateCartQuantity()} items`;
}

document.querySelectorAll(".delete-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeCartItem(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    container.remove();
    updateCheckoutHeader();
  });
});

document.querySelectorAll(".update-quantity-link").forEach((link) => {
  const productId = link.dataset.productId;
  link.addEventListener("click", () => {
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".save-quantity-link").forEach((link) => {
  const productId = link.dataset.productId;
  const quantityInput = document.querySelector(`.quantity-input-${productId}`);

  link.addEventListener("click", () => {
    saveButtonClick(productId, quantityInput);
  });
});

document.querySelectorAll(".quantity-input").forEach((label) => {
  const productId = label.dataset.productId;
  const quantityInput = document.querySelector(`.quantity-input-${productId}`);

  label.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      console.log("maataji");
      saveButtonClick(productId, quantityInput);
    }
  });
});

function saveButtonClick(productId, quantityInput) {
  document
    .querySelector(`.js-cart-item-container-${productId}`)
    .classList.remove("is-editing-quantity");

  const quantityInputValue = Number(quantityInput.value);
  updateQuantity(productId, quantityInputValue);

  const quantityLabel = document.querySelector(`.quantity-label-${productId}`);
  quantityLabel.innerHTML = quantityInputValue;

  updateCheckoutHeader();
}

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;
    console.log(productId, deliveryOptionId)
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
