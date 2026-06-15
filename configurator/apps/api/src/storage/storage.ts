import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { env } from "../env.js";

/**
 * Storage abstraction. The MVP writes files to local disk (served by Express
 * at /uploads). Swap this for an S3/Supabase implementation later without
 * touching the render pipeline — just return a public URL from `save`.
 */
export interface Storage {
  save(relativePath: string, data: Buffer | string, contentType: string): Promise<string>;
}

class LocalStorage implements Storage {
  constructor(private readonly baseDir: string) {}

  async save(relativePath: string, data: Buffer | string): Promise<string> {
    const fullPath = path.join(this.baseDir, relativePath);
    await mkdir(path.dirname(fullPath), { recursive: true });
    await writeFile(fullPath, data);
    // Public URL: served at /uploads/<relativePath> (see index.ts static mount).
    return `${env.publicBaseUrl}/uploads/${relativePath}`;
  }
}

export const storage: Storage = new LocalStorage(path.resolve(env.storageDir));
