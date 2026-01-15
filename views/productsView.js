// productsView.js

import { state, els, updateHeaderCounts, formatMoney } from "/main.js";
import { navigate } from "/router.js";

function setFavButtonText(btn, productId) {
  btn.textContent = state.customer.isFavorite(productId) ? "💚 Lemmik" : "🤍 Lemmik";
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.style.cursor = "pointer";

  const title = document.createElement("h2");
  title.textContent = product.title;

  const category = document.createElement("p");
  category.textContent = `Category: ${product.category}`;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = formatMoney(product.price);

  // pilt (kui olemas)
  if (product.image) {
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.style.width = "100%";
    img.style.height = "160px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "10px";
    img.style.marginTop = "10px";
    card.appendChild(img);
  }

  const btnRow = document.createElement("div");
  btnRow.style.display = "flex";
  btnRow.style.gap = "10px";
  btnRow.style.marginTop = "12px";
  btnRow.style.flexWrap = "wrap";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Lisa korvi";
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    state.cart.addProduct(product, 1);
    updateHeaderCounts();
  });

  const favBtn = document.createElement("button");
  setFavButtonText(favBtn, product.id);
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    state.customer.toggleFavorite(product.id);
    setFavButtonText(favBtn, product.id);
    updateHeaderCounts();
  });

  btnRow.append(addBtn, favBtn);

  card.addEventListener("click", () => navigate("productDetail", product.id));

  card.append(title, category, price, btnRow);
  return card;
}

export function displayProductsView(filterCategory = "all") {
  els.main.innerHTML = "";
  els.container.innerHTML = "";

  const products =
    filterCategory === "all"
      ? state.products
      : state.products.filter((p) => p.category === filterCategory);

  // kategooriate kaupa
  const categories = {};
  products.forEach((p) => {
    (categories[p.category] ||= []).push(p);
  });

  Object.keys(categories).forEach((categoryName) => {
    const header = document.createElement("h2");
    header.className = "category-header";
    header.textContent = categoryName;

    const wrap = document.createElement("div");
    wrap.className = "category-container";

    categories[categoryName].forEach((p) => {
      wrap.appendChild(createProductCard(p));
    });

    els.container.append(header, wrap);
  });
}

