import { Cart } from "./cart.js";

export class Order {
  constructor(cart) {
    this.orderDate = new Date();
    this.cart = cart;
  }

  printOrder() {
    console.log("=== ORDER DETAILS ===");
    console.log("Order Date:", this.orderDate.toLocaleString());

    console.log("\nProducts:");
    this.cart.products.forEach((item) => {
      console.log(
        `- ${item.product.title} x ${item.quantity} = $${(
          item.product.price * item.quantity
        ).toFixed(2)}`
      );
    });

    console.log("\nTotal Items:", this.cart.totalItems);
    console.log("Total Price: $" + this.cart.calculateTotal().toFixed(2));
  }
}