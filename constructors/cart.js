import { Product } from "./product.js";

export class Cart {
  constructor() {
    this.products = [];
  }

  addProduct(product, quantity) {
    this.products.push({ product, quantity });
  }

  removeProduct(productId) {
    this.products = this.products.filter(
      (item) => item.product.id !== productId
    );
  }

  calculateTotal() {
    return this.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  get totalItems() {
    return this.products.reduce((count, item) => count + item.quantity, 0);
  }
}