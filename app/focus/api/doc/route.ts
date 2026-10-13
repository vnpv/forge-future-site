import { BOOKS, NOINDEX, ingestAuthorized } from "../../auth";
import { storageReady, writeText } from "../../store";

/**
 * Завантаження HTML воркбука в приватне сховище скриптом: PUT /focus/api/doc?n=1
 * з заголовком Authorization: Bearer <MIDGARD_INGEST_KEY>. Без входу на сайт, лише за ключем конвеєра.
 */
export const dynamic = "force-dynamic";
const MAX = 3_000_000;

export async function PUT(request: Request) {
  if (!ingestAuthorized(request)) return Response.json({ error: "Немає доступу" }, { status: 401, headers: NOINDEX });
  const n = new URL(request.url).searchParams.get("n") ?? "";
  const book = BOOKS[n];
  if (!book) return Response.json({ error: "Невідомий воркбук" }, { status: 404, headers: NOINDEX });
  if (!storageReady()) return Response.json({ error: "Сховище не підключене" }, { status: 503, headers: NOINDEX });
  const html = await request.text();
  if (html.length > MAX || !/<html[\s>]/i.test(html)) return Response.json({ error: "Очікується HTML до 3 МБ" }, { status: 400, headers: NOINDEX });
  await writeText(book.file, html, "text/html; charset=utf-8");
  return Response.json({ ok: true, file: book.file, bytes: html.length }, { headers: NOINDEX });
}
