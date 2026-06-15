import "dotenv/config";

/** Central place for environment config so the rest of the app stays clean. */
export const env = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? "",
  // Base URL prefixed onto stored-file paths. Empty => relative URLs (dev proxy).
  publicBaseUrl: process.env.PUBLIC_BASE_URL ?? "",
  storageDir: process.env.STORAGE_DIR ?? "./uploads",
  renderProvider: process.env.RENDER_PROVIDER ?? "mock",
};
