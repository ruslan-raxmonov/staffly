import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function ensureDataDir() {
  // Skip in Vercel (read-only filesystem)
  if (process.env.VERCEL) return;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Ignore mkdir errors in production
  }
}

export async function readJsonArray<T>(filename: string): Promise<T[]> {
  await ensureDataDir();
  const file = path.join(DATA_DIR, filename);
  try {
    await fs.access(file);
  } catch {
    // File doesn't exist. In Vercel, skip write and return empty.
    if (process.env.VERCEL) return [];
    try {
      await fs.writeFile(file, "[]", "utf8");
    } catch {
      // Write failed (read-only FS), return empty
    }
    return [];
  }
  const raw = await fs.readFile(file, "utf8");
  try {
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeJsonArray<T>(filename: string, data: T[]) {
  // Vercel read-only filesystem: skip writes in production
  if (process.env.VERCEL || process.env.NEXT_PUBLIC_DEMO_MODE) {
    console.warn(`[DEMO MODE] Skipping write to ${filename}`);
    return;
  }
  await ensureDataDir();
  const file = path.join(DATA_DIR, filename);
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export function uid(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function token(bytes = 24) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < bytes; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}
