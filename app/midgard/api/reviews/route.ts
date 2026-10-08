import { LESSON_ID, NOINDEX, canReview, currentUser } from "../../auth";
import { type Supervision, getLesson, saveReview } from "../../lessons";
import { storageReady } from "../../storage";

/**
 * Перевірка AI-аналізу супервізором (пілот): статус «на перевірці» / «перевірено»,
 * загальний коментар і коментарі до окремих критеріїв. Лише ролі supervisor і admin.
 */
export const dynamic = "force-dynamic";

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: NOINDEX });
const VERDICTS = new Set(["agree", "partly", "disagree"]);

export async function POST(request: Request) {
  const me = await currentUser(request);
  if (!me) return json({ error: "Потрібен вхід" }, 401);
  if (!canReview(me.role)) return json({ error: "Перевіряти аналіз можуть лише супервізори" }, 403);
  if (!storageReady()) return json({ error: "Сховище не підключене" }, 503);
  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return json({ error: "Невірні дані" }, 400);
  }
  const id = String(b.lessonId ?? "");
  if (!LESSON_ID.test(id) || !(await getLesson(id))) return json({ error: "Урок не знайдено" }, 404);
  const status = b.status === "reviewed" ? "reviewed" : "in_review";
  const items: Supervision["items"] = {};
  for (const [k, v] of Object.entries((b.items as Record<string, { verdict?: string; comment?: string }>) ?? {})) {
    if (!/^[a-z0-9]{1,6}$/.test(k) || !v) continue;
    const verdict = VERDICTS.has(String(v.verdict)) ? (v.verdict as "agree" | "partly" | "disagree") : undefined;
    const comment = typeof v.comment === "string" ? v.comment.trim().slice(0, 1000) : "";
    if (verdict || comment) items[k] = { ...(verdict ? { verdict } : {}), ...(comment ? { comment } : {}) };
  }
  const review: Supervision = {
    status,
    comment: typeof b.comment === "string" ? b.comment.trim().slice(0, 3000) : "",
    items,
    by: me.email,
    at: new Date().toISOString(),
  };
  await saveReview(id, review);
  return json({ review });
}
