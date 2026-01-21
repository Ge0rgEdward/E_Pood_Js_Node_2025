export async function getAllProducts() {
  const res = await fetch("/api/products", { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`API /api/products failed: ${res.status}`);
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("API peab tagastama massiivi []");
  }

  console.log("Tooted backendist:", data);

  return data;
}

export async function getFavoritesProductByUserID(userID) {
  const res = await fetch(`/api/favorites/${encodeURIComponent(userID)}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`GET favorites failed: ${res.status}`);
  const data = await res.json();


  if (!Array.isArray(data))
    throw new Error("Favorites API peab tagastama massiivi []");


  return data;
}


export async function addFavoriteProductById(userID, productId) {
  const res = await fetch(
    `/api/favorites/${encodeURIComponent(userID)}/${encodeURIComponent(String(productId))}`,
    { method: "POST" }
  );

  if (!res.ok) throw new Error(`POST favorite failed: ${res.status}`);


  return await res.json(); 
}

export async function deleteFavoriteProductById(userID, productId) {
  const res = await fetch(
    `/api/favorites/${encodeURIComponent(userID)}/${encodeURIComponent(String(productId))}`,
    { method: "DELETE" }
  );

  if (!res.ok) throw new Error(`DELETE favorite failed: ${res.status}`);

  return await res.json(); 
}


