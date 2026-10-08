import { get, list, put } from "@vercel/blob";

/**
 * Уроки дашборду MIDGARD у приватному Vercel Blob: midgard/lessons/<id>.json.
 * Статус: queued (чекає обробки) → processing → ready | error.
 * Готовий урок має повний аналіз (blocks, strengths, …) — схема як у CEO OS results/*.json.
 */
export type LessonStatus = "queued" | "processing" | "ready" | "error";
export type Lesson = Record<string, unknown> & { id: string; status?: LessonStatus };

export const lessonPath = (id: string) => `midgard/lessons/${id}.json`;
const PREFIX = "midgard/lessons/";

let cache: { at: number; lessons: Lesson[] } | null = null;
const CACHE_MS = 15_000;

async function readJson(pathname: string): Promise<Lesson | null> {
  const res = await get(pathname, { access: "private", useCache: false }).catch(() => null);
  if (!res || res.statusCode !== 200) return null;
  try {
    return JSON.parse(await new Response(res.stream).text()) as Lesson;
  } catch {
    return null;
  }
}

export async function listLessons(fresh = false): Promise<Lesson[]> {
  if (!fresh && cache && Date.now() - cache.at < CACHE_MS) return cache.lessons;
  const paths: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    paths.push(...page.blobs.map((b) => b.pathname).filter((p) => p.endsWith(".json")));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  const lessons = (await Promise.all(paths.map(readJson))).filter((l): l is Lesson => !!l && typeof l.id === "string");
  cache = { at: Date.now(), lessons };
  return lessons;
}

export async function getLesson(id: string) {
  return readJson(lessonPath(id));
}

export async function saveLesson(lesson: Lesson) {
  await put(lessonPath(lesson.id), JSON.stringify(lesson), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  cache = null;
}

/** Перевірка супервізора: midgard/reviews/<id>.json (окремо від уроку, щоб обробник її не перезаписав). */
export type Supervision = {
  status: "in_review" | "reviewed";
  comment?: string;
  // ключ: id критерію (m1, k3…) або "str:s1" / "rec:r2"; decision: підтвердити, змінити рівень (критерій) чи відхилити (сильна сторона/рекомендація)
  items?: Record<string, { decision?: "confirm" | "change" | "reject"; level?: "strong" | "partial" | "none" | "na"; comment?: string }>;
  by?: string;
  at?: string;
};
export const reviewPath = (id: string) => `midgard/reviews/${id}.json`;

export async function listReviews(): Promise<Record<string, Supervision>> {
  const out: Record<string, Supervision> = {};
  let cursor: string | undefined;
  const paths: string[] = [];
  do {
    const page = await list({ prefix: "midgard/reviews/", cursor, limit: 1000 });
    paths.push(...page.blobs.map((b) => b.pathname).filter((p) => p.endsWith(".json")));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  await Promise.all(paths.map(async (p) => {
    const r = (await readJson(p)) as unknown as Supervision | null;
    if (r) out[p.slice("midgard/reviews/".length, -5)] = r;
  }));
  return out;
}

export async function saveReview(id: string, review: Supervision) {
  await put(reviewPath(id), JSON.stringify(review), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true });
  cache = null;
}

/** Уроки разом із перевірками супервізора (поле supervision). */
export async function lessonsWithReviews(fresh = false) {
  const [lessons, reviews] = await Promise.all([listLessons(fresh), listReviews().catch(() => ({} as Record<string, Supervision>))]);
  return lessons.map((l) => (reviews[l.id] ? { ...l, supervision: reviews[l.id] } : l));
}
