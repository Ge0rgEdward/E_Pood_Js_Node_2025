export class Product {
  constructor({ id, title, price, category, image = "", description = "" }) {
    this.id = id || crypto.randomUUID();
    this.title = title;
    this.price = Number(price) || 0;
    this.category = category || "Other";
    this.image = image || "";
    this.description = description || "";
  }

  displayProduct() {
    console.log(
      `ID: ${this.id}, Title: ${this.title}, Price: €${this.price}, Category: ${this.category}`
    );
  }

  discountedPrice(discountPercent) {
    const d = Math.max(0, Number(discountPercent) || 0);
    return this.price - (this.price * d) / 100;
  }

  static fromJSON(obj) {
    return new Product(obj);
  }
}
