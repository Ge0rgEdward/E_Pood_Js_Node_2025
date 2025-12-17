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


import { displayAllProducts } from './allProductView.js';
import { displayProductDetail } from './productDetailView.js';
import { displayCart } from './productDetailView.js';

const products = [
    { title: 'Grill', category: 'BBQ', price: 120.99 },
    { title: 'Tongs', category: 'BBQ', price: 15.50 },
    { title: 'Protein Shake', category: 'Supplements', price: 45.00 }
];

const container = document.getElementById('products-container');
displayAllProducts(products, container);
displayProductDetail(products, container);
displayCart(cartItems, container);

