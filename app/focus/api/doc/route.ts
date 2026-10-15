import { NOINDEX, ingestAuthorized } from "../../auth";
import { BOOK_ID, LEGACY_N, loadBooks, saveBooks, type Book } from "../../books";
import { storageReady, writeText } from "../../store";

/**
 * Завантаження/оновлення воркбука скриптом (без деплою):
 *   PUT /focus/api/doc?b=<id>&v=admin|student|example|student-career|example-career[&title=…][&order=N]
 * з заголовком Authorization: Bearer <MIDGARD_INGEST_KEY>, тіло — HTML.
 * Новий b додає воркбук у список. Старий формат ?n=1|2|3 теж працює (= admin-версія).
 */
export const dynamic = "force-dynamic";
const MAX = 3_000_000;
const VARIANTS = ["admin", "student", "example", "student-career", "example-career"] as const;
const err = (m: string, status: number) => Response.json({ error: m }, { status, headers: NOINDEX });

/** Прибрати воркбук зі списку (файли й чужі стани лишаються): DELETE ?b=<id> */
export async function DELETE(request: Request) {
  if (!ingestAuthorized(request)) return err("Немає доступу", 401);
  if (!storageReady()) return err("Сховище не підключене", 503);
  const b = new URL(request.url).searchParams.get("b") ?? "";
  if (!BOOK_ID.test(b)) return err("Невірний id воркбука", 400);
  const books = await loadBooks(true);
  if (!books.some((x) => x.id === b)) return err("Немає такого воркбука", 404);
  await saveBooks(books.filter((x) => x.id !== b));
  return Response.json({ ok: true, removed: b }, { headers: NOINDEX });
}

export async function PUT(request: Request) {
  if (!ingestAuthorized(request)) return err("Немає доступу", 401);
  if (!storageReady()) return err("Сховище не підключене", 503);
  const q = new URL(request.url).searchParams;
  const n = q.get("n");
  const b = q.get("b") ?? Object.entries(LEGACY_N).find(([, v]) => v === n)?.[0] ?? "";
  const v = (q.get("v") ?? "admin") as (typeof VARIANTS)[number];
  if (!BOOK_ID.test(b)) return err("Невірний id воркбука (a-z, 0-9, дефіс)", 400);
  if (!VARIANTS.includes(v)) return err("v = admin | student | example | student-career | example-career", 400);
  const html = await request.text();
  if (html.length > MAX || !/<html[\s>]/i.test(html)) return err("Очікується HTML до 3 МБ", 400);

  const books = await loadBooks(true);
  let book = books.find((x) => x.id === b);
  if (!book) {
    book = { id: b, title: q.get("title") || b, order: Number(q.get("order")) || books.length + 1, files: {} } as Book;
    books.push(book);
  }
  if (q.get("title")) book.title = q.get("title")!;
  if (q.get("order")) book.order = Number(q.get("order")) || book.order;
  const path = book.files[v] ?? `focus/books/${b}-${v}.html`;
  book.files[v] = path;
  await writeText(path, html, "text/html; charset=utf-8");
  await saveBooks(books);
  return Response.json({ ok: true, id: b, variant: v, file: path, title: book.title }, { headers: NOINDEX });
}
