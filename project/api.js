
export async function getAllProducts() {
  const res = await fetch("/api/products", { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`API /api/products failed: ${res.status}`);
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("API peab tagastama massiivi []");
  }

  // "väljastab need" -> logime konsooli
  console.log("Tooted backendist:", data);

  return data;
}
