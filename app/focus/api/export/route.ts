import { NOINDEX, adminUsers, ingestAuthorized, statePath } from "../../auth";
import { LEGACY_N, loadBooks } from "../../books";
import { readText, storageReady } from "../../store";

/**
 * Експорт стану воркбуків власника для резервної копії в git (скрипт CEO OS, раз на день).
 * GET /focus/api/export з Authorization: Bearer <MIDGARD_INGEST_KEY>.
 * Повертає лише власні відповіді власника (admin), не учнів.
 */
export const dynamic = "force-dynamic";
const err = (m: string, status: number) => Response.json({ error: m }, { status, headers: NOINDEX });

type Stored = { rev: number; data: Record<string, string> };
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

export async function GET(request: Request) {
  if (!ingestAuthorized(request)) return err("Немає доступу", 401);
  if (!storageReady()) return err("Сховище не підключене", 503);
  const owner = adminUsers()[0]?.email;
  if (!owner) return err("Власника не знайдено", 404);
  const books = await loadBooks(true);
  const out: { id: string; title: string; rev: number; data: Record<string, string> }[] = [];
  for (const b of books) {
    let text = await readText(statePath(owner, b.id, "main"), true);
    if (text === null && LEGACY_N[b.id]) text = await readText(`focus/state/${LEGACY_N[b.id]}.json`, true);
    const st = unpack(text);
    out.push({ id: b.id, title: b.title, rev: st.rev, data: st.data });
  }
  return Response.json({ exportedAt: new Date().toISOString(), books: out }, { headers: NOINDEX });
}
