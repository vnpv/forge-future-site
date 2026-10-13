import { get, put } from "@vercel/blob";

/** Приватне сховище воркбуків: HTML-файли й стан відповідей. Читання кешуємо (ліміти Blob на Hobby). */
const CACHE_MS = 60_000;
const cache = new Map<string, { at: number; text: string | null }>();

export const storageReady = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

export async function readText(pathname: string, fresh = false): Promise<string | null> {
  const hit = cache.get(pathname);
  if (!fresh && hit && Date.now() - hit.at < CACHE_MS) return hit.text;
  const res = await get(pathname, { access: "private", useCache: false }).catch(() => null);
  const text = res && res.statusCode === 200 ? await new Response(res.stream).text() : null;
  cache.set(pathname, { at: Date.now(), text });
  return text;
}

export async function writeText(pathname: string, body: string, contentType: string) {
  await put(pathname, body, { access: "private", contentType, addRandomSuffix: false, allowOverwrite: true });
  cache.set(pathname, { at: Date.now(), text: body });
}
