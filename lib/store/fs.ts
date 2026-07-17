import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readJsonArray<T>(filename: string): Promise<T[]> {
  await ensureDataDir();
  const file = path.join(DATA_DIR, filename);
  try {
    await fs.access(file);
  } catch {
    await fs.writeFile(file, "[]", "utf8");
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
