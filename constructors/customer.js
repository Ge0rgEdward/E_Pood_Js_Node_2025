import { Order } from "./order.js";

export class Customer {
  constructor(name, orderHistory = []) {
    this.name = name;
    this.orderHistory = orderHistory;
  }

  placeOrder(cart) {
    const newOrder = new Order(cart);
    this.orderHistory.push(newOrder);
    return newOrder;
  }

  printOrderHistory() {
    console.log(`=== ORDER HISTORY FOR ${this.name.toUpperCase()} ===`);
    this.orderHistory.forEach((ord, index) => {
      console.log(`\n--- Order ${index + 1} ---`);
      ord.printOrder();
    });
    console.log("=====================================\n");
  }
}