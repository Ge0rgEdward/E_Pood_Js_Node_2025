// import { Product } from "./product.js";
// import { Cart } from "./cart.js";
// import { Order } from "./order.js";
// import { Customer } from "./customer.js";

// const laptop = new Product("Laptop", 999.99, "Electronics");
// const phone = new Product("Smartphone", 499.99, "Electronics");

// const myCart = new Cart();
// myCart.addProduct(laptop, 1);
// myCart.addProduct(phone, 2);

// console.log(`Total Items: ${myCart.totalItems}`);
// console.log(`Total Price: $${myCart.calculateTotal().toFixed(2)}`);

// myCart.removeProduct(phone.id);
// console.log(`Total Items in Cart after removal: ${myCart.totalItems}`);
// console.log(
//   `Total Price after removal: $${myCart.calculateTotal().toFixed(2)}`
// );

// const myOrder = new Order(myCart);
// myOrder.printOrder();

// const customer1 = new Customer("Alice");
// customer1.placeOrder(myCart);
// customer1.printOrderHistory();

// //STEP 1 CREATE ELEMENT 
// const newH1 = document.createElement.createElement("h1")

// // STEP 2 ADD ATTRIBUTES/PROPERTIES
// newH1. textContent = "I like pizza!"
// newH1.id = "myH1";
// newH1.style.color = "tomato";
// newH1.style.textAlign = "center";


// //STEP 3 APPEND ELEMENT TO DOM 

// document.body.prepend(newH1);
// document.body.prepend(newH1);
// document.getElementById("box1").prepend(newH1);
// document.getElementById("box1").append(newH1);

// const header = document.getElementById('header');
// header.style.background = '#333' 
// header.style.color = 'white';
// header.style.padding = '20px';
// header.style.display = 'flex';
// header.style.justifyContent = 'space-between';
// header.style.alignItems = 'center';

// const logo = document.createElement('h1');
// logo.textContent = 'ePood';
// logo.style.margin = '0';


import { Cart } from "/constructors/Cart.js";
import { Customer } from "/constructors/Customer.js";
import { Product } from "/constructors/Product.js";
import { navigate } from "/views/router.js";
import { getAllProducts } from "/api.js";


// KM rate: muuda vajadusel
export const VAT_RATE = 0.22;

// “globaalne” app state
export const state = {
  products: [],
  cart: new Cart(),
  customer: new Customer("Georg")
};

export const els = {
  main: document.getElementById("main-section"),
  container: document.getElementById("products-container"),
  logo: document.getElementById("logo"),
  navHome: document.getElementById("nav-home"),
  navFav: document.getElementById("nav-favorites"),
  navCart: document.getElementById("nav-cart"),
  cartCount: document.getElementById("cart-count"),
  favCount: document.getElementById("fav-count")
};

export function formatMoney(n) {
  return `${Number(n).toFixed(2)} €`;
}

export function updateHeaderCounts() {
  els.cartCount.textContent = String(state.cart.totalItems);
  els.favCount.textContent = String(state.customer.favorites.length);
}

export function initApp() {
  els.main.innerHTML = "";
  navigate("allProducts", "all");
  updateHeaderCounts();
}

async function loadProducts() {
  const data = await getAllProducts();
   if (!Array.isArray(data)) {
    throw new Error("API peab tagastama massiivi ([])!");
  }

  state.products = data.map(Product.fromJSON);
}
  


function wireHeader() {
  const noReload = (fn) => (e) => {
    e.preventDefault();
    fn();
  };

  els.logo.addEventListener("click", noReload(initApp));
  els.navHome.addEventListener("click", noReload(initApp));
  els.navFav.addEventListener("click", noReload(() => navigate("favorites")));
  els.navCart.addEventListener("click", noReload(() => navigate("cart")));
}

(async function boot() {
  wireHeader();
  await loadProducts();
  initApp();
})();






