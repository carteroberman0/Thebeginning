import path from "node:path";
import cors from "cors";
import express from "express";
import { env } from "./env.js";
import { renderQueue } from "./jobs/queue.js";
import { configurationsRouter } from "./routes/configurations.js";
import { configureRouter } from "./routes/configure.js";
import { optionsRouter } from "./routes/options.js";
import { propertiesRouter } from "./routes/properties.js";

const app = express();
app.use(cors());
app.use(express.json());

// Serve generated renders + base images from local storage.
app.use("/uploads", express.static(path.resolve(env.storageDir)));

app.get("/api/health", (_req, res) => res.json({ ok: true, provider: env.renderProvider }));
app.use("/api/options", optionsRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/configure", configureRouter);
app.use("/api/configurations", configurationsRouter);

// Pick up any jobs left unfinished from a previous run, then start serving.
renderQueue.resume().catch((err) => console.error("Failed to resume render queue:", err));

app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port} (render provider: ${env.renderProvider})`);
});
