// import { Product } from "./Product.js";

// export class Cart {
//   constructor() {
//     this.products = [];
//   }

//   addProduct(product, quantity) {
//     this.products.push({ product, quantity });
//   }

//   removeProduct(productId) {
//     this.products = this.products.filter(
//       (item) => item.product.id !== productId
//     );
//   }

//   calculateTotal() {
//     return this.products.reduce(
//       (total, item) => total + item.product.price * item.quantity,
//       0
//     );
//   }

//   get totalItems() {
//     return this.products.reduce((count, item) => count + item.quantity, 0);
//   }

//   updateCartButton(button, product) {
//     const inCart = this.totalItems.some(item => item.product.id === product.id);
//     button.textContent = inCart ? "Added" : "Add to Cart";
//   }
// }

export class Cart {
  constructor() {
    this.products = []; // [{ product, quantity }]
  }

  addProduct(product, quantity = 1) {
    const qty = Math.max(1, Number(quantity) || 1);
    const found = this.products.find((it) => it.product.id === product.id);

    if (!found) {
      this.products.push({ product, quantity: qty });
    } else {
      found.quantity += qty;
    }
  }

  updateProductQuantity(productId, delta) {
    const d = Number(delta) || 0;
    const item = this.products.find((it) => it.product.id === productId);
    if (!item) return;

    item.quantity += d;

    if (item.quantity <= 0) {
      this.products = this.products.filter((it) => it.product.id !== productId);
    }
  }

  removeProduct(indexOrProductId) {
    if (typeof indexOrProductId === "number") {
      this.products.splice(indexOrProductId, 1);
      return;
    }

    // fallback: productId
    this.products = this.products.filter(
      (it) => it.product.id !== indexOrProductId
    );
  }

  calculateTotal() {
    return this.products.reduce(
      (sum, it) => sum + it.product.price * it.quantity,
      0
    );
  }

  get totalItems() {
    return this.products.reduce((sum, it) => sum + it.quantity, 0);
  }

  clear() {
    this.products = [];
  }
}
