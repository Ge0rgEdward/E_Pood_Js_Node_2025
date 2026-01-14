// productsView.js

import { state, els, updateHeaderCounts, formatMoney } from "../main.js";
import { navigate } from "../router.js";

function setFavButtonText(btn, productId) {
  btn.textContent = state.customer.isFavorite(productId) ? "💚 Lemmik" : "🤍 Lemmik";
}

function displayProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.style.cursor = "pointer";

  const title = document.createElement("h2");
  title.textContent = product.title;

  const category = document.createElement("p");
  category.textContent = `Category: ${product.category}`;

  const price = document.createElement("p");
  price.textContent = formatMoney(product.price);
  price.classList.add("product-price");

  const btnRow = document.createElement("div");
  btnRow.style.display = "flex";
  btnRow.style.gap = "10px";
  btnRow.style.marginTop = "10px";
  btnRow.style.flexWrap = "wrap";

  const cartButton = document.createElement("button");
  cartButton.textContent = "Lisa korvi";
  cartButton.addEventListener("click", (e) => {
    e.stopPropagation();
    state.cart.addProduct(product, 1);
    updateHeaderCounts();
  });

  const favButton = document.createElement("button");
  setFavButtonText(favButton, product.id);
  favButton.addEventListener("click", (e) => {
    e.stopPropagation();
    state.customer.toggleFavorite(product.id);
    setFavButtonText(favButton, product.id);
    updateHeaderCounts();
  });

  btnRow.append(cartButton, favButton);

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

  // Group by category
  const categories = {};
  products.forEach((p) => {
    (categories[p.category] ||= []).push(p);
  });

  for (const categoryName of Object.keys(categories)) {
    const categoryHeader = document.createElement("h2");
    categoryHeader.textContent = categoryName;
    categoryHeader.classList.add("category-header");
    els.container.appendChild(categoryHeader);

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    categories[categoryName].forEach((p) => {
      categoryContainer.appendChild(displayProductCard(p));
    });

    els.container.appendChild(categoryContainer);
  }
}
