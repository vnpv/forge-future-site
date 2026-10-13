import { BOOKS, NOINDEX, statePath, validSession } from "../../auth";
import { readText, storageReady, writeText } from "../../store";

/** Стан відповідей воркбука n: об'єкт {ключ localStorage: значення}. Лише для користувачів із входом. */
export const dynamic = "force-dynamic";
const MAX = 1_000_000;

export async function GET(request: Request) {
  const n = new URL(request.url).searchParams.get("n") ?? "";
  if (!(await validSession(request))) return Response.json({ error: "Потрібен вхід" }, { status: 401, headers: NOINDEX });
  if (!BOOKS[n] || !storageReady()) return Response.json({}, { headers: NOINDEX });
  const text = await readText(statePath(n), true);
  return new Response(text ?? "{}", { headers: { ...NOINDEX, "Content-Type": "application/json" } });
}

export async function PUT(request: Request) {
  const n = new URL(request.url).searchParams.get("n") ?? "";
  if (!(await validSession(request))) return Response.json({ error: "Потрібен вхід" }, { status: 401, headers: NOINDEX });
  if (!BOOKS[n]) return Response.json({ error: "Невідомий воркбук" }, { status: 404, headers: NOINDEX });
  if (!storageReady()) return Response.json({ error: "Сховище не підключене" }, { status: 503, headers: NOINDEX });
  const body = await request.text();
  if (body.length > MAX) return Response.json({ error: "Завелика відповідь" }, { status: 413, headers: NOINDEX });
  let obj: unknown;
  try { obj = JSON.parse(body); } catch { return Response.json({ error: "Невірний JSON" }, { status: 400, headers: NOINDEX }); }
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return Response.json({ error: "Очікується об'єкт" }, { status: 400, headers: NOINDEX });
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) if (typeof v === "string" && k.length < 120) clean[k] = v;
  await writeText(statePath(n), JSON.stringify(clean), "application/json");
  return Response.json({ ok: true }, { headers: NOINDEX });
}
