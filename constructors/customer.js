// import { Order } from "./Order.js";

// export class Customer {
//   constructor(name, orderHistory = []) {
//     this.name = name;
//     this.orderHistory = orderHistory;
//   }

//   placeOrder(cart) {
//     const newOrder = new Order(cart);
//     this.orderHistory.push(newOrder);
//     return newOrder;
//   }

//   printOrderHistory() {
//     console.log(`=== ORDER HISTORY FOR ${this.name.toUpperCase()} ===`);
//     this.orderHistory.forEach((ord, index) => {
//       console.log(`\n--- Order ${index + 1} ---`);
//       ord.printOrder();
//     });
//     console.log("=====================================\n");
//   }
// }

// export function toggleFavorite(product) {
//   const exists = favorites.some(fav => fav.id === product.id);
//   if(exists) {
//     favorites = favorites.filter(fav => fav.id !== product.id);
//   }
//   else {
//     favorites.push(product)
//   }
// }

// export function updateFavoriteButton(button, product) {
//     const isFavorite = isFavorite.some(fav => fav.id === product.id);

//     if (isFavorite) {
//         button.textContent = "❤️"
//     }
//     else {
//         button.textContent = "🤍";
//     }
// }

export class Customer {
  constructor(name = "Guest") {
    this.name = name;
    /** @type {string[]} */
    this.favorites = [];
    /** @type {any[]} */
    this.orderHistory = [];
  }

  isFavorite(productId) {
    return this.favorites.includes(productId);
  }

  toggleFavorite(productId) {
    if (this.isFavorite(productId)) {
      this.favorites = this.favorites.filter((id) => id !== productId);
      return false;
    }
    this.favorites.push(productId);
    return true;
  }

  addOrder(order) {
    this.orderHistory.push(order);
  }
}
