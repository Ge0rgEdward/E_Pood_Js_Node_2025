


import { Cart } from "/constructors/Cart.js";
import { Customer } from "/constructors/Customer.js";
import { Product } from "/constructors/Product.js";
import { navigate } from "/views/router.js";
import { getAllProducts, getFavoritesProductByUserID } from "/api.js";


const USER_ID_KEY = "epood_user_id";

export function getOrCreateUserId() {
  let id = sessionStorage.getItem(USER_ID_KEY);

  if (!id) {
    id =
      (globalThis.crypto?.randomUUID?.() ??
        `uid_${Date.now()}_${Math.random().toString(16).slice(2)}`);

    sessionStorage.setItem(USER_ID_KEY, id);
  }

  return id;
}

export const userId = getOrCreateUserId();
console.log("userId (sessionStorage):", userId);





export const state = {
  userId,
  products: [],
  cart: new Cart(),
  customer: new Customer("Georg"),
};

state.customer.id = userId;

export const VAT_RATE = 0.22;

export const els = {
  main: document.getElementById("main-section"),
  container: document.getElementById("products-container"),
  logo: document.getElementById("logo"),
  navHome: document.getElementById("nav-home"),
  navFav: document.getElementById("nav-favorites"),
  navCart: document.getElementById("nav-cart"),
  cartCount: document.getElementById("cart-count"),
  favCount: document.getElementById("fav-count"),
  categoryBar: document.getElementById("category-bar"),
};

export function formatMoney(n) {
  return `${Number(n).toFixed(2)} €`;
}

export async function refreshFavoritesCount() {
  try {
    const favIds = await getFavoritesProductByUserID(state.userId);
    els.favCount.textContent = String(favIds.length);
    state.favIds = favIds;
  } catch (err) {
    console.error("Failed to refresh favorites count:", err);
    els.favCount.textContent = els.favCount.textContent || "0";
  }
}


export function updateHeaderCounts() {
  els.cartCount.textContent = String(state.cart.totalItems);
  els.favCount.textContent = String(state.customer.favorites.length);
  refreshFavoritesCount();
}

export function initApp() {
  els.main.innerHTML = "";
  els.container.innerHTML = "";
  navigate("allProducts", "all");
  updateHeaderCounts();
  setActiveCategoryButton("all");
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

function setActiveCategoryButton(category) {
  if (!els.categoryBar) return;

  const btns = els.categoryBar.querySelectorAll("button[data-category]");
  btns.forEach((b) => {
    b.classList.toggle("active", b.dataset.category === category);
  });
}

function buildCategoryBar() {
  if (!els.categoryBar) return;

  const categories = Array.from(new Set(state.products.map((p) => p.category))).sort();

  
  els.categoryBar.innerHTML = "";

  const makeBtn = (label, categoryValue) => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = label;

    // dataset õigesti
    btn.dataset.category = categoryValue;

    btn.addEventListener("click", () => {
      navigate("allProducts", categoryValue);
      setActiveCategoryButton(categoryValue);
    });

    return btn;
  };

  // "All"
  els.categoryBar.appendChild(makeBtn("All", "all"));

  // kategooriad
  categories.forEach((c) => {
    els.categoryBar.appendChild(makeBtn(c, c));
  });

  setActiveCategoryButton("all");
}


(async function boot() {
  wireHeader();
  await loadProducts();
  buildCategoryBar();
  initApp();
})();









