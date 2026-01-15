// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { readFile, writeFile, mkdir } from "fs/promises";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5173;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minu projekt
const PROJECT_DIR = path.join(__dirname, "project");


const DATA_DIR = path.join(__dirname, "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");

// Staatilised failid 
app.use(express.static(PROJECT_DIR));
app.use("/views", express.static(path.join(__dirname, "views")));
app.use("/constructors", express.static(path.join(__dirname, "constructors")));

// kontrollib kas fail on tühi või puudu 
async function isFileEmpty(filePath) {
  try {
    const raw = await readFile(filePath, "utf-8");
    return !raw.trim();
  } catch {
    return true; 
  }
}

// tõmbab FakeStore API-st ja salvestab faili 
async function fetchAndSaveProducts() {
  const response = await axios.get("https://fakestoreapi.com/products");
  const products = response.data;

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");

  return products;
}

// API: tagastab kõik tooted 
app.get("/api/products", async (req, res) => {
  try {
    const empty = await isFileEmpty(PRODUCTS_FILE);

    let products;
    if (empty) {
      console.log("📦 products.json tühi/puudub → laen FakeStore API-st...");
      products = await fetchAndSaveProducts();
    } else {
      const raw = await readFile(PRODUCTS_FILE, "utf-8");
      products = JSON.parse(raw);
    }

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Andmete lugemine ebaõnnestus", details: err.message });
  }
});

// API: Uuendab  
app.get("/api/fetch-products", async (req, res) => {
  try {
    const products = await fetchAndSaveProducts();
    res.status(200).json({ message: "Andmed uuendatud ja salvestatud", count: products.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Andmete laadimine ebaõnnestus", details: err.message });
  }
});

// Fallback ainult lehe route’idele 
app.get("*", (req, res) => {
  if (req.path.includes(".")) return res.status(404).end();
  res.sendFile(path.join(PROJECT_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server töötab: http://localhost:${PORT}`);
});
