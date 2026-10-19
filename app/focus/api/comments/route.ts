import { randomBytes } from "node:crypto";
import { NOINDEX, currentUser, loadStudents, userKey } from "../../auth";
import { BOOK_ID } from "../../books";
import { StoreError, readText, storageReady, writeText } from "../../store";

/**
 * Коментарі власника до відповідей учня: focus/comments/<хеш пошти>/<воркбук>.json = {items: {<data-key поля | _general>: Comment[]}}.
 * GET: учень читає свої, admin — будь-якого учня (?as=<пошта>). POST/DELETE: лише admin.
 */
export const dynamic = "force-dynamic";
const err = (m: string, status: number) => Response.json({ error: m }, { status, headers: NOINDEX });
const unavailable = () => err("Сховище тимчасово недоступне. Спробуйте за кілька хвилин.", 503);

const FIELD_KEY = /^(_general|[A-Za-z0-9_.-]{1,119})$/;
const MAX_TEXT = 2000;
const MAX_PER_FIELD = 30;

type Comment = { id: string; text: string; at: string };
type Items = Record<string, Comment[]>;

const pathFor = (email: string, b: string) => `focus/comments/${userKey(email)}/${b}.json`;

function parse(text: string | null): Items {
  try {
    const o = JSON.parse(text ?? "{}") as { items?: Items };
    return o.items && typeof o.items === "object" ? o.items : {};
  } catch {
    return {};
  }
}

async function target(request: Request) {
  const url = new URL(request.url);
  const b = url.searchParams.get("b") ?? "";
  const as = (url.searchParams.get("as") ?? "").trim().toLowerCase();
  const me = await currentUser(request);
  if (!me) return { fail: err("Потрібен вхід", 401) };
  if (!BOOK_ID.test(b)) return { fail: err("Невідомий воркбук", 404) };
  if (as && me.role !== "admin") return { fail: err("Немає доступу", 403) };
  return { me, b, as, url };
}

export async function GET(request: Request) {
  const t = await target(request);
  if ("fail" in t) return t.fail;
  if (!storageReady()) return Response.json({ items: {} }, { headers: NOINDEX });
  const email = t.as || t.me.email;
  try {
    return Response.json({ items: parse(await readText(pathFor(email, t.b))) }, { headers: NOINDEX });
  } catch (e) {
    if (e instanceof StoreError) return unavailable();
    throw e;
  }
}

async function adminTarget(request: Request) {
  const t = await target(request);
  if ("fail" in t) return t;
  if (t.me.role !== "admin") return { fail: err("Немає доступу", 403) };
  if (!t.as) return { fail: err("Не вказано учня", 400) };
  if (!storageReady()) return { fail: err("Сховище не підключене", 503) };
  return t;
}

export async function POST(request: Request) {
  const t = await adminTarget(request);
  if ("fail" in t) return t.fail;
  const body = (await request.json().catch(() => ({}))) as { key?: string; text?: string };
  const key = String(body.key ?? "");
  const text = String(body.text ?? "").trim();
  if (!FIELD_KEY.test(key)) return err("Невірний ключ поля", 400);
  if (!text) return err("Порожній коментар", 400);
  if (text.length > MAX_TEXT) return err("Завеликий коментар", 413);
  try {
    if (!(await loadStudents()).some((s) => s.email === t.as)) return err("Такого учня немає", 404);
    const path = pathFor(t.as, t.b);
    const items = parse(await readText(path, true));
    const list = items[key] ?? [];
    if (list.length >= MAX_PER_FIELD) return err("Забагато коментарів до одного поля", 400);
    const comment: Comment = { id: randomBytes(6).toString("hex"), text, at: new Date().toISOString() };
    items[key] = [...list, comment];
    await writeText(path, JSON.stringify({ items }), "application/json");
    return Response.json({ ok: true, comment }, { headers: NOINDEX });
  } catch (e) {
    if (e instanceof StoreError) return unavailable();
    throw e;
  }
}

export async function DELETE(request: Request) {
  const t = await adminTarget(request);
  if ("fail" in t) return t.fail;
  const key = t.url.searchParams.get("key") ?? "";
  const id = t.url.searchParams.get("id") ?? "";
  if (!FIELD_KEY.test(key) || !/^[a-f0-9]{12}$/.test(id)) return err("Невірні параметри", 400);
  try {
    const path = pathFor(t.as, t.b);
    const items = parse(await readText(path, true));
    const left = (items[key] ?? []).filter((c) => c.id !== id);
    if (left.length === (items[key] ?? []).length) return err("Коментар не знайдено", 404);
    if (left.length) items[key] = left;
    else delete items[key];
    await writeText(path, JSON.stringify({ items }), "application/json");
    return Response.json({ ok: true }, { headers: NOINDEX });
  } catch (e) {
    if (e instanceof StoreError) return unavailable();
    throw e;
  }
}
