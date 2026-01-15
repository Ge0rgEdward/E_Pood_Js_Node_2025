import { state, els, updateHeaderCounts, formatMoney } from "/main.js";
import { navigate } from "/views/router.js";

export function displayFavoritesView() {
  els.main.innerHTML = `<h2 class="cart-title">Lemmikud</h2>`;
  els.container.innerHTML = "";

  const favIds = state.customer.favorites;
  const favProducts = state.products.filter((p) => favIds.includes(p.id));

  if (favProducts.length === 0) {
    els.main.innerHTML += `
      <div class="product-card" style="margin-top:12px;">
        <p>Lemmikuid pole veel.</p>
        <button id="goShopping">Otsi tooteid</button>
      </div>
    `;
    document.getElementById("goShopping").addEventListener("click", () =>
      navigate("allProducts", "all")
    );
    return;
  }

  const wrap = document.createElement("div");
  wrap.className = "category-container";

  favProducts.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.cursor = "pointer";

    const title = document.createElement("h2");
    title.textContent = p.title;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatMoney(p.price);

    const btnRow = document.createElement("div");
    btnRow.style.display = "flex";
    btnRow.style.gap = "10px";
    btnRow.style.marginTop = "10px";
    btnRow.style.flexWrap = "wrap";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Lisa korvi";
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      state.cart.addProduct(p, 1);
      updateHeaderCounts();
    });

    const removeFavBtn = document.createElement("button");
    removeFavBtn.textContent = "Eemalda lemmikutest";
    removeFavBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      state.customer.toggleFavorite(p.id);
      updateHeaderCounts();
      displayFavoritesView();
    });

    btnRow.append(addBtn, removeFavBtn);

    card.addEventListener("click", () => navigate("productDetail", p.id));
    card.append(title, price, btnRow);
    wrap.appendChild(card);
  });

  els.container.appendChild(wrap);
}
