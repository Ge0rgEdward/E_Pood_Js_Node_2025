// // cartView.js

// export function displayCart(cartItems, container) {
//     // Tühjenda konteiner enne uue sisu lisamist
//     container.innerHTML = '';

//     const cartTitle = document.createElement('h2');
//     cartTitle.textContent = 'Ostukorv';
//     cartTitle.classList.add('cart-title');
//     container.appendChild(cartTitle);

//     if (cartItems.length === 0) {
//         const emptyMessage = document.createElement('p');
//         emptyMessage.textContent = 'Ostukorv on tühi.';
//         container.appendChild(emptyMessage);
//         return;
//     }

//     const cartList = document.createElement('div');
//     cartList.classList.add('cart-list');

//     let totalPrice = 0;

//     cartItems.forEach(item => {
//         const cartItem = document.createElement('div');
//         cartItem.classList.add('cart-item');

//         const name = document.createElement('p');
//         name.textContent = item.product.title;
//         name.classList.add('cart-item-name');

//         const quantity = document.createElement('p');
//         quantity.textContent = `Kogus: ${item.quantity}`;
//         quantity.classList.add('cart-item-quantity');

//         const price = document.createElement('p');
//         const itemTotal = item.product.price * item.quantity;
//         price.textContent = `Hind: $${itemTotal.toFixed(2)}`;
//         price.classList.add('cart-item-price');

//         totalPrice += itemTotal;

//         cartItem.appendChild(name);
//         cartItem.appendChild(quantity);
//         cartItem.appendChild(price);

//         cartList.appendChild(cartItem);
//     });

//     container.appendChild(cartList);

//     const total = document.createElement('h3');
//     total.textContent = `Kokku: $${totalPrice.toFixed(2)}`;
//     total.classList.add('cart-total');
//     container.appendChild(total);
// }
import { state, els, updateHeaderCounts, formatMoney, VAT_RATE } from "/main.js";
import { Order } from "/constructors/Order.js";
import { navigate } from "/router.js";

export function displayCartView() {
  els.main.innerHTML = "";
  els.container.innerHTML = "";

  const items = state.cart.products;

  if (items.length === 0) {
    els.main.innerHTML = `
      <div class="product-card">
        <h2>Ostukorv on tühi</h2>
        <button id="goShopping">Tagasi poodi</button>
      </div>
    `;
    document.getElementById("goShopping").addEventListener("click", () =>
      navigate("allProducts", "all")
    );
    return;
  }

  const subtotal = state.cart.calculateTotal();
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  const list = document.createElement("div");
  list.className = "cart-list";

  items.forEach((it, index) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <p class="cart-item-name">${it.product.title}</p>
        <p class="cart-item-price">Ühik: ${formatMoney(it.product.price)}</p>
      </div>

      <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; justify-content:flex-end;">
        <button data-action="dec">-</button>
        <span class="cart-item-quantity">${it.quantity}</span>
        <button data-action="inc">+</button>
        <button data-action="remove">Eemalda</button>
      </div>
    `;

    row.querySelector('[data-action="dec"]').addEventListener("click", () => {
      state.cart.updateProductQuantity(it.product.id, -1);
      updateHeaderCounts();
      displayCartView();
    });

    row.querySelector('[data-action="inc"]').addEventListener("click", () => {
      state.cart.updateProductQuantity(it.product.id, +1);
      updateHeaderCounts();
      displayCartView();
    });

    row.querySelector('[data-action="remove"]').addEventListener("click", () => {
      state.cart.removeProduct(index); // indeksiga
      updateHeaderCounts();
      displayCartView();
    });

    list.appendChild(row);
  });

  const totals = document.createElement("div");
  totals.className = "cart-total";
  totals.innerHTML = `
    <div style="text-align:right; line-height:1.6;">
      <div>Vahehind: <strong>${formatMoney(subtotal)}</strong></div>
      <div>KM (${Math.round(VAT_RATE * 100)}%): <strong>${formatMoney(vat)}</strong></div>
      <div>Lõpphind: <strong>${formatMoney(total)}</strong></div>
    </div>

    <div style="margin-top:16px; display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap;">
      <button id="clearCart">Tühista ostukorv</button>
      <button id="buyBtn">Osta</button>
    </div>
  `;

  els.main.innerHTML = `<h2 class="cart-title">Ostukorv</h2>`;
  els.main.append(list, totals);

  document.getElementById("clearCart").addEventListener("click", () => {
    state.cart.clear();
    updateHeaderCounts();
    displayCartView();
  });

  document.getElementById("buyBtn").addEventListener("click", () => {
    const order = Order.fromCart(state.cart, VAT_RATE);
    state.customer.addOrder(order);
    state.cart.clear();
    updateHeaderCounts();

    els.main.innerHTML = `
      <div class="product-detail-card">
        <h2>Tellimus kinnitatud ✅</h2>
        <p><strong>Tellimuse ID:</strong> ${order.id}</p>
        <p><strong>Lõpphind:</strong> ${formatMoney(order.total)}</p>
        <button id="backHome">Tagasi poodi</button>
      </div>
    `;

    document.getElementById("backHome").addEventListener("click", () =>
      navigate("allProducts", "all")
    );
  });
}
