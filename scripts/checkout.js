import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

// import "../scripts/data/cart-class.js";
// import "../scripts/data/cart-oop.js";
import { loadProducts } from "../scripts/data/products.js";

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
