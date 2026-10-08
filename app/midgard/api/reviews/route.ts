import { LESSON_ID, NOINDEX, canReview, currentUser } from "../../auth";
import { type Supervision, getLesson, saveReview } from "../../lessons";
import { storageReady } from "../../storage";

/**
 * Перевірка AI-аналізу супервізором (пілот): по кожному пункту «що вплинуло на оцінку» —
 * підтвердити, змінити рівень критерію або відхилити сильну сторону/рекомендацію, коментар за бажанням.
 * Статус: «на перевірці», коли опрацьовано не все, «перевірено» — коли все. Лише ролі supervisor і admin.
 */
export const dynamic = "force-dynamic";

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: NOINDEX });
const DECISIONS = new Set(["confirm", "change", "reject"]);
const LEVELS = new Set(["strong", "partial", "none", "na"]);

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
  for (const [k, v] of Object.entries((b.items as Record<string, { decision?: string; level?: string; comment?: string }>) ?? {})) {
    if (!/^(str:|rec:)?[a-z0-9]{1,6}$/.test(k) || !v) continue;
    const decision = DECISIONS.has(String(v.decision)) ? (v.decision as "confirm" | "change" | "reject") : undefined;
    const level = decision === "change" && LEVELS.has(String(v.level)) ? (v.level as "strong" | "partial" | "none" | "na") : undefined;
    const comment = typeof v.comment === "string" ? v.comment.trim().slice(0, 1000) : "";
    if (decision === "change" && !level) continue;
    if (decision || comment) items[k] = { ...(decision ? { decision } : {}), ...(level ? { level } : {}), ...(comment ? { comment } : {}) };
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
