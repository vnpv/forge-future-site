import { NOINDEX, currentUser, statePath } from "../../auth";
import { BOOK_ID, LEGACY_N } from "../../books";
import { StoreError, ownCached, readText, storageReady, writeText } from "../../store";

/**
 * Персональний стан воркбука: об'єкт {ключ: значення}. Шлях: focus/users/<хеш пошти>/<воркбук>-<main|example>.json.
 * GET ?as=<email> дозволено лише admin (перегляд робіт учня); PUT — тільки у власний стан.
 */
export const dynamic = "force-dynamic";
const MAX = 1_000_000;
const err = (m: string, status: number) => Response.json({ error: m }, { status, headers: NOINDEX });

function parse(url: URL) {
  const b = url.searchParams.get("b") ?? "";
  const v = url.searchParams.get("v") === "example" ? "example" : "main";
  return { b, v, as: (url.searchParams.get("as") ?? "").toLowerCase() };
}

type Stored = { rev: number; data: Record<string, string> };
/** Файл стану: {rev, data}; старий формат (проста карта) вважаємо rev=0. */
function unpack(text: string | null): Stored {
  if (!text) return { rev: 0, data: {} };
  try {
    const o = JSON.parse(text) as Record<string, unknown>;
    if (o && typeof o.rev === "number" && o.data && typeof o.data === "object") return { rev: o.rev, data: o.data as Record<string, string> };
    return { rev: 0, data: o as Record<string, string> };
  } catch {
    return { rev: 0, data: {} };
  }
}
const withRev = (body: unknown, rev: number, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...NOINDEX, "Content-Type": "application/json", "X-Rev": String(rev) } });

const unavailable = () => err("Сховище тимчасово недоступне. Дані не втрачено, зміни зараз не зберігаються.", 503);

export async function GET(request: Request) {
  const { b, v, as } = parse(new URL(request.url));
  const me = await currentUser(request);
  if (!me) return err("Потрібен вхід", 401);
  if (!BOOK_ID.test(b)) return err("Невідомий воркбук", 404);
  if (as && me.role !== "admin") return err("Немає доступу", 403);
  if (!storageReady()) return withRev({}, 0);
  const target = as || me.email;
  try {
    let text = await readText(statePath(target, b, v), true);
    // Перенесення зі старої схеми (до акаунтів): стан власника лежав у focus/state/<n>.json
    if (text === null && me.role === "admin" && !as && v === "main" && LEGACY_N[b]) text = await readText(`focus/state/${LEGACY_N[b]}.json`, true);
    const st = unpack(text);
    return withRev(st.data, st.rev);
  } catch (e) {
    if (e instanceof StoreError) return unavailable();
    throw e;
  }
}

export async function PUT(request: Request) {
  const { b, v, as } = parse(new URL(request.url));
  const me = await currentUser(request);
  if (!me) return err("Потрібен вхід", 401);
  if (as) return err("Перегляд лише для читання", 403);
  if (!BOOK_ID.test(b)) return err("Невідомий воркбук", 404);
  if (!storageReady()) return err("Сховище не підключене", 503);
  const body = await request.text();
  if (body.length > MAX) return err("Завелика відповідь", 413);
  let obj: unknown;
  try { obj = JSON.parse(body); } catch { return err("Невірний JSON", 400); }
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return err("Очікується об'єкт", 400);
  const clean: Record<string, string> = {};
  for (const [k, val] of Object.entries(obj as Record<string, unknown>)) if (typeof val === "string" && k.length < 120) clean[k] = val;
  // Оптимістична версія: якщо стан змінили деінде (інша вкладка/пристрій), не перезаписуємо мовчки
  const path = statePath(me.email, b, v);
  try {
    // власний недавній запис цього інстансу береться з пам'яті (без читання з Blob)
    const cached = ownCached(path);
    const cur = unpack(cached !== undefined ? cached : await readText(path, true));
    const base = request.headers.get("if-match");
    if (base !== null && Number(base) !== cur.rev) return withRev({ error: "Стан змінено на іншому пристрої", rev: cur.rev }, cur.rev, 409);
    // нічого не змінилось: не витрачаємо запис у сховищі
    if (cur.rev > 0 && JSON.stringify(cur.data) === JSON.stringify(clean)) return withRev({ ok: true, rev: cur.rev, unchanged: true }, cur.rev);
    const rev = cur.rev + 1;
    await writeText(path, JSON.stringify({ rev, data: clean }), "application/json");
    return withRev({ ok: true, rev }, rev);
  } catch (e) {
    if (e instanceof StoreError) return unavailable();
    throw e;
  }
}
