// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5173;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_DIR = path.join(__dirname, "project");

// 1) project kaust = veebijuur (index.html, main.js, styles.css, products.json)
app.use(express.static(PROJECT_DIR));

// 2) serveeri ka constructors ja views, sest need on projectist väljaspool
app.use("/constructors", express.static(path.join(__dirname, "constructors")));
app.use("/views", express.static(path.join(__dirname, "views")));

// Avab alati project/index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(PROJECT_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server töötab: http://localhost:${PORT}`);
});
