import { get, put } from "@vercel/blob";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

/** Приватне сховище воркбуків: HTML, список книжок, користувачі, стан відповідей. Читання кешуємо (ліміти Blob). */
const CACHE_MS = 30_000;
const cache = new Map<string, { at: number; text: string | null }>();

/** FOCUS_LOCAL_DIR — лише для локальної розробки/тестів: файли замість Blob. */
const LOCAL = process.env.FOCUS_LOCAL_DIR;
export const storageReady = () => Boolean(LOCAL || process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

export async function readText(pathname: string, fresh = false): Promise<string | null> {
  const hit = cache.get(pathname);
  if (!fresh && hit && Date.now() - hit.at < CACHE_MS) return hit.text;
  let text: string | null = null;
  if (LOCAL) text = await readFile(join(LOCAL, pathname), "utf8").catch(() => null);
  else {
    const res = await get(pathname, { access: "private", useCache: false }).catch(() => null);
    text = res && res.statusCode === 200 ? await new Response(res.stream).text() : null;
  }
  cache.set(pathname, { at: Date.now(), text });
  return text;
}

export async function writeText(pathname: string, body: string, contentType: string) {
  if (LOCAL) {
    const f = join(LOCAL, pathname);
    await mkdir(dirname(f), { recursive: true });
    await writeFile(f, body, "utf8");
  } else await put(pathname, body, { access: "private", contentType, addRandomSuffix: false, allowOverwrite: true });
  cache.set(pathname, { at: Date.now(), text: body });
}
