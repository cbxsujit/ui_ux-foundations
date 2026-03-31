import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("progress.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS progress (
    lesson_id TEXT PRIMARY KEY,
    completed BOOLEAN DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/progress", (req, res) => {
    try {
      const rows = db.prepare("SELECT * FROM progress").all();
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress", (req, res) => {
    const { lessonId, completed } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO progress (lesson_id, completed, last_accessed)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(lesson_id) DO UPDATE SET
          completed = excluded.completed,
          last_accessed = CURRENT_TIMESTAMP
      `);
      stmt.run(lessonId, completed ? 1 : 0);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save progress" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
