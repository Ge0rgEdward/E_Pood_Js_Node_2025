// import { Cart } from "./cart.js";

// export class Order {
//   constructor(cart) {
//     this.orderDate = new Date();
//     this.cart = cart;
//   }

//   printOrder() {
//     console.log("=== ORDER DETAILS ===");
//     console.log("Order Date:", this.orderDate.toLocaleString());

//     console.log("\nProducts:");
//     this.cart.products.forEach((item) => {
//       console.log(
//         `- ${item.product.title} x ${item.quantity} = $${(
//           item.product.price * item.quantity
//         ).toFixed(2)}`
//       );
//     });

//     console.log("\nTotal Items:", this.cart.totalItems);
//     console.log("Total Price: $" + this.cart.calculateTotal().toFixed(2));
//   }
// }

export class Order {
  constructor(cartSnapshot, vatRate = 0.22) {
    this.id = crypto.randomUUID();
    this.createdAt = new Date();

    // [{id,title,price,quantity}]
    this.items = cartSnapshot.items;
    this.subtotal = cartSnapshot.subtotal;

    this.vatRate = vatRate;
    this.vat = this.subtotal * this.vatRate;
    this.total = this.subtotal + this.vat;
  }

  static fromCart(cart, vatRate = 0.22) {
    const snapshot = {
      items: cart.products.map((it) => ({
        id: it.product.id,
        title: it.product.title,
        price: it.product.price,
        quantity: it.quantity
      })),
      subtotal: cart.calculateTotal()
    };

    return new Order(snapshot, vatRate);
  }
}

