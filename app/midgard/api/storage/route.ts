import { del, get, list } from "@vercel/blob";
import { NOINDEX, ingestAuthorized } from "../../auth";

/**
 * Службове керування сховищем (лише за ключем конвеєра):
 * GET — усі файли midgard/* з розміром і сумою + перевірка читання (для діагностики лімітів Vercel Blob)
 * DELETE ?pathname=midgard/video/<id>.mp4 — видалити файл
 */
export const dynamic = "force-dynamic";

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: NOINDEX });

export async function GET(request: Request) {
  if (!ingestAuthorized(request)) return json({ error: "Лише для конвеєра" }, 401);
  const blobs: { pathname: string; size: number }[] = [];
  let listError: string | null = null, readError: string | null = null;
  try {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: "midgard/", cursor, limit: 1000 });
      blobs.push(...page.blobs.map((b) => ({ pathname: b.pathname, size: b.size })));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } catch (e) {
    listError = e instanceof Error ? e.message : String(e);
  }
  const probe = blobs.find((b) => b.pathname.startsWith("midgard/lessons/"));
  if (probe) {
    try {
      const r = await get(probe.pathname, { access: "private", useCache: false });
      if (!r || r.statusCode !== 200) readError = "порожня відповідь";
    } catch (e) {
      readError = e instanceof Error ? e.message : String(e);
    }
  }
  let cachedReadError: string | null = null;
  if (probe) {
    try {
      const r = await get(probe.pathname, { access: "private", useCache: true });
      if (!r || r.statusCode !== 200) cachedReadError = "порожня відповідь";
    } catch (e) {
      cachedReadError = e instanceof Error ? e.message : String(e);
    }
  }
  const total = blobs.reduce((a, b) => a + b.size, 0);
  return json({ totalMB: Math.round(total / 1048576), count: blobs.length, listError, readError, cachedReadError, blobs: blobs.sort((a, b) => b.size - a.size) });
}

export async function DELETE(request: Request) {
  if (!ingestAuthorized(request)) return json({ error: "Лише для конвеєра" }, 401);
  const pathname = new URL(request.url).searchParams.get("pathname") ?? "";
  if (!/^midgard\/(video|posters|uploads|lessons|reviews)\/[a-z0-9.-]+$/.test(pathname)) return json({ error: "Невірний шлях" }, 400);
  try {
    await del(pathname);
    return json({ ok: true });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
}
