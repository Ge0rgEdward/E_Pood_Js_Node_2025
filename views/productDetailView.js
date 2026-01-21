import { state, els, updateHeaderCounts, formatMoney } from "/main.js";
import { navigate } from "/views/router.js";

export function displayProductDetailView(productId) {
  const p = state.products.find((x) => x.id === productId);

  if (!p) {
    els.main.innerHTML = `<div class="product-card"><h2>Toodet ei leitud</h2></div>`;
    els.container.innerHTML = "";
    return;
  }

  els.container.innerHTML = "";



  const isFav = () => state.customer.isFavorite(p.id);

  els.main.innerHTML = `
    <div class="product-detail-card">
      <h2>${p.title}</h2>
      <p><strong>Kategooria:</strong> ${p.category}</p>
      <p><strong>Hind:</strong> ${formatMoney(p.price)}</p>
      <p>${p.description || ""}</p>
      ${
        p.image
          ? `<img class="product-detail-image" src="${p.image}" alt="${p.title}" />`
          : ""
      }

      <div style="margin-top:16px; display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
        <button id="detailAddToCart">Lisa korvi</button>
        <button id="detailToggleFav">${isFav() ? "💚 Lemmik" : "🤍 Lemmik"}</button>
        <button id="detailBack">Tagasi</button>
      </div>
    </div>
  `;

  document.getElementById("detailAddToCart").addEventListener("click", () => {
    state.cart.addProduct(p, 1);
    updateHeaderCounts();
  });

  document.getElementById("detailToggleFav").addEventListener("click", (e) => {
    state.customer.toggleFavorite(p.id);
    e.target.textContent = isFav() ? "💚 Lemmik" : "🤍 Lemmik";
    updateHeaderCounts();
  });

  document.getElementById("detailBack").addEventListener("click", () => {
    els.main.innerHTML = "";
    navigate("allProducts", "all");
  });
}


