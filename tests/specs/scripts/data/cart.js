import {
  addToCart,
  cart,
  loadFromStorage,
} from "../../../../scripts/data/cart.js";

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {});

  it("adds new product to the cart", () => {
    console.log(JSON.parse(localStorage.getItem("cart")));
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    console.log(JSON.parse(localStorage.getItem("cart")));
    loadFromStorage();

    // addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
  });
});
