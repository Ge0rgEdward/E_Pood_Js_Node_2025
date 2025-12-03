export class Product {
  constructor(title, price, category) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.price = price;
    this.category = category;
  }

  displayProduct() {
    console.log(`
            ID: ${this.id}, 
            Title: ${this.title}, 
            Price: $${this.price}, 
            Category: ${this.category}`);
  }

  discountedPrice(discountPercent) {
    return this.price - (this.price * discountPercent) / 100;
  }
}