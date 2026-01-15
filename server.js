// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

const app = express();
const PORT = process.env.PORT || 5173;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_DIR = path.join(__dirname, "project");

app.use(express.static(PROJECT_DIR));


app.use("/constructors", express.static(path.join(__dirname, "constructors")));
app.use("/views", express.static(path.join(__dirname, "views")));


app.get("/api/products", async (req, res) => {
  try {
    const filePath = path.join(PROJECT_DIR, "products.json");
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) {
      return res.status(500).json({ error: "products.json peab olema massiiv []" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Ei saanud tooteid laadida",
      details: err.message
    });
  }
});

// Avab alati project/index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(PROJECT_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server töötab: http://localhost:${PORT}`);
});
