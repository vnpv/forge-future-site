import { NOINDEX, currentUser, userKey } from "../../auth";
import { BOOK_ID, LEGACY_N } from "../../books";
import { readText, storageReady, writeText } from "../../store";

/**
 * Персональний стан воркбука: об'єкт {ключ: значення}. Шлях: focus/users/<хеш пошти>/<воркбук>-<main|example>.json.
 * GET ?as=<email> дозволено лише admin (перегляд робіт учня); PUT — тільки у власний стан.
 */
export const dynamic = "force-dynamic";
const MAX = 1_000_000;
const err = (m: string, status: number) => Response.json({ error: m }, { status, headers: NOINDEX });
const statePath = (email: string, b: string, v: string) => `focus/users/${userKey(email)}/${b}-${v}.json`;

function parse(url: URL) {
  const b = url.searchParams.get("b") ?? "";
  const v = url.searchParams.get("v") === "example" ? "example" : "main";
  return { b, v, as: (url.searchParams.get("as") ?? "").toLowerCase() };
}

export async function GET(request: Request) {
  const { b, v, as } = parse(new URL(request.url));
  const me = await currentUser(request);
  if (!me) return err("Потрібен вхід", 401);
  if (!BOOK_ID.test(b)) return err("Невідомий воркбук", 404);
  if (as && me.role !== "admin") return err("Немає доступу", 403);
  if (!storageReady()) return new Response("{}", { headers: { ...NOINDEX, "Content-Type": "application/json" } });
  const target = as || me.email;
  let text = await readText(statePath(target, b, v), true);
  // Перенесення зі старої схеми (до акаунтів): стан власника лежав у focus/state/<n>.json
  if (text === null && me.role === "admin" && !as && v === "main" && LEGACY_N[b]) text = await readText(`focus/state/${LEGACY_N[b]}.json`, true);
  return new Response(text ?? "{}", { headers: { ...NOINDEX, "Content-Type": "application/json" } });
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
  await writeText(statePath(me.email, b, v), JSON.stringify(clean), "application/json");
  return Response.json({ ok: true }, { headers: NOINDEX });
}
