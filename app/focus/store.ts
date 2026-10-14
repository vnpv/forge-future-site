import { get, put } from "@vercel/blob";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

/**
 * Приватне сховище воркбуків: HTML, список книжок, користувачі, стан відповідей.
 * Vercel Blob (Hobby) має малі ліміти, тому: читання кешуємо, записи економимо, а збій сховища
 * відрізняємо від «файлу немає» (StoreError), щоб не прийняти помилку за порожній стан.
 */
export class StoreError extends Error {}

const CACHE_MS = 30_000;
const cache = new Map<string, { at: number; text: string | null; own: boolean }>();

/** FOCUS_LOCAL_DIR — лише для локальної розробки/тестів: файли замість Blob. */
const LOCAL = process.env.FOCUS_LOCAL_DIR;
export const storageReady = () => Boolean(LOCAL || process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));
const isNotFound = (e: unknown) => /not.?found/i.test(msg(e)) || /NotFound/i.test((e as { name?: string })?.name ?? "");

/** null = файлу немає; кидає StoreError, якщо сховище не відповіло (403/5xx/мережа). */
export async function readText(pathname: string, fresh = false, ttl = CACHE_MS): Promise<string | null> {
  const hit = cache.get(pathname);
  if (!fresh && hit && Date.now() - hit.at < ttl) return hit.text;
  let text: string | null = null;
  if (LOCAL) {
    text = await readFile(join(LOCAL, pathname), "utf8").catch(() => null);
  } else {
    try {
      const res = await get(pathname, { access: "private", useCache: false });
      const code = (res as { statusCode?: number } | null)?.statusCode;
      if (!res || code === 404) text = null;
      else if (code === 200) text = await new Response(res.stream).text();
      else throw new StoreError(`Blob status ${code}`);
    } catch (e) {
      if (e instanceof StoreError) throw e;
      if (isNotFound(e)) text = null;
      else throw new StoreError(msg(e));
    }
  }
  cache.set(pathname, { at: Date.now(), text, own: false });
  return text;
}

/** Останній запис цього інстансу (не старший за maxAge), без звернення до Blob; інакше undefined. */
export function ownCached(pathname: string, maxAge = 120_000): string | null | undefined {
  const hit = cache.get(pathname);
  return hit && hit.own && Date.now() - hit.at < maxAge ? hit.text : undefined;
}

export async function writeText(pathname: string, body: string, contentType: string) {
  if (LOCAL) {
    const f = join(LOCAL, pathname);
    await mkdir(dirname(f), { recursive: true });
    await writeFile(f, body, "utf8");
  } else {
    try {
      await put(pathname, body, { access: "private", contentType, addRandomSuffix: false, allowOverwrite: true });
    } catch (e) {
      throw new StoreError(msg(e));
    }
  }
  cache.set(pathname, { at: Date.now(), text: body, own: true });
}
