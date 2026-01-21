import { state, els, updateHeaderCounts, formatMoney } from "/main.js";
import { navigate } from "/views/router.js";
import {
  getFavoritesProductByUserID,
  deleteFavoriteProductById
} from "/api.js";

export async function displayFavoritesView() {
  els.main.innerHTML = `<h2 class="cart-title">Lemmikud</h2>`;
  els.container.innerHTML = "";

  try {
    // ✅ loe lemmikute ID-d backendist (favorites.json)
    const favIds = await getFavoritesProductByUserID(state.userId);

    updateHeaderCounts();

    // ✅ leia vastavad tooted
    const favProducts = state.products.filter((p) =>
      favIds.includes(String(p.id))
    );

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
      removeFavBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        await deleteFavoriteProductById(state.userId, p.id);
        // reload view
        await displayFavoritesView();
      });

      btnRow.append(addBtn, removeFavBtn);

      card.addEventListener("click", () => navigate("productDetail", p.id));
      card.append(title, price, btnRow);
      wrap.appendChild(card);
    });

    els.container.appendChild(wrap);
  } catch (err) {
    els.main.innerHTML += `
      <div class="product-card" style="margin-top:12px;">
        <p>Viga lemmikute laadimisel: ${err.message}</p>
        <button id="goShopping">Tagasi poodi</button>
      </div>
    `;
    document.getElementById("goShopping").addEventListener("click", () =>
      navigate("allProducts", "all")
    );
  }
}
