import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../scripts/data/products.js";
import { loadCart } from "../scripts/data/cart.js";

// import "../scripts/data/cart-class.js";
// import "../scripts/data/cart-oop.js";

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve();
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

// loadProducts(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });
