import { displayProductsView } from "./views/productsView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoritesView } from "./views/favoritesView.js";

export const navigate = (view, param) => {
  const views = {
    allProducts: () => displayProductsView(param || "all"),
    productDetail: () => displayProductDetailView(param),
    cart: () => displayCartView(),
    favorites: () => displayFavoritesView()
  };

  if (views[view]) views[view]();
};
