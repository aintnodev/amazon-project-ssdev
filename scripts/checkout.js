import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../scripts/data/products.js";

// import "../scripts/data/cart.js";
// import "../scripts/data/cart-class.js";
// import "../scripts/data/cart-oop.js";

loadProductsFetch().then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
