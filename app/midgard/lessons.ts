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

// Ліміти Vercel Blob (Hobby): кожне читання — операція. Тому: список кешуємо 2 хв,
// а вміст файлу перечитуємо, лише якщо змінився (uploadedAt зі списку).
let cache: { at: number; lessons: Lesson[] } | null = null;
const CACHE_MS = 300_000; // 5 хв: list — «advanced operation» (на Hobby їх мало)
const FORCE_MIN_MS = 60_000; // примусове оновлення списку не частіше разу на хвилину на інстанс
const bodies = new Map<string, { stamp: string; data: Lesson }>();

type Meta = { pathname: string; stamp: string };
let metaCache: { at: number; metas: Meta[] } | null = null;
/** Один list(prefix: "midgard/") замість окремих для lessons і reviews. */
async function listMeta(fresh = false): Promise<Meta[]> {
  const age = metaCache ? Date.now() - metaCache.at : Infinity;
  if (metaCache && (age < FORCE_MIN_MS || (!fresh && age < CACHE_MS))) return metaCache.metas;
  const metas: Meta[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: "midgard/", cursor, limit: 1000 });
    for (const b of page.blobs)
      if (b.pathname.endsWith(".json") && (b.pathname.startsWith("midgard/lessons/") || b.pathname.startsWith("midgard/reviews/")))
        metas.push({ pathname: b.pathname, stamp: new Date(b.uploadedAt).toISOString() });
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  metaCache = { at: Date.now(), metas };
  return metas;
}

async function readJson(pathname: string): Promise<Lesson | null> {
  const res = await get(pathname, { access: "private", useCache: false }).catch(() => null);
  if (!res || res.statusCode !== 200) return null;
  try {
    return JSON.parse(await new Response(res.stream).text()) as Lesson;
  } catch {
    return null;
  }
}

/** Список файлів із префіксом + вміст із кешем за uploadedAt: [шлях, вміст]. */
async function readAll(prefix: string, fresh = false): Promise<[string, Lesson][]> {
  const metas = (await listMeta(fresh)).filter((m) => m.pathname.startsWith(prefix));
  const out = await Promise.all(metas.map(async ({ pathname, stamp }) => {
    const hit = bodies.get(pathname);
    if (hit && hit.stamp === stamp) return [pathname, hit.data] as [string, Lesson];
    const data = await readJson(pathname);
    if (data) bodies.set(pathname, { stamp, data });
    return data ? ([pathname, data] as [string, Lesson]) : null;
  }));
  return out.filter((x): x is [string, Lesson] => !!x);
}

export async function listLessons(fresh = false): Promise<Lesson[]> {
  if (!fresh && cache && Date.now() - cache.at < CACHE_MS) return cache.lessons;
  const lessons = (await readAll(PREFIX, fresh)).map(([, l]) => l).filter((l) => typeof l.id === "string");
  cache = { at: Date.now(), lessons };
  return lessons;
}

/**
 * Черга для обробника: один файл midgard/queue.json {ids:[…]}. Читання черги — звичайний get
 * (simple operation), а не list (advanced): обробник на Mac питає чергу кожні 30 хв.
 * Міграція: якщо файлу немає, один раз збираємо чергу зі старих міток midgard/queue/<id>.json.
 */
const QUEUE_PATH = "midgard/queue.json";
async function readQueueFile(): Promise<string[] | null> {
  const res = await get(QUEUE_PATH, { access: "private", useCache: false }).catch(() => null);
  if (!res || res.statusCode !== 200) return null;
  try {
    const ids = (JSON.parse(await new Response(res.stream).text()) as { ids?: unknown }).ids;
    return Array.isArray(ids) ? ids.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return null;
  }
}
async function writeQueueFile(ids: string[]) {
  await put(QUEUE_PATH, JSON.stringify({ ids }), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true });
}
export async function queuedIds(): Promise<string[]> {
  const q = await readQueueFile();
  if (q) return q;
  const ids: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: "midgard/queue/", cursor, limit: 1000 });
    ids.push(...page.blobs.map((b) => b.pathname.slice("midgard/queue/".length, -5)));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  await writeQueueFile(ids).catch(() => {});
  return ids;
}
async function updateQueue(id: string, queued: boolean) {
  const ids = await queuedIds();
  const has = ids.includes(id);
  if (queued && !has) await writeQueueFile([...ids, id]);
  else if (!queued && has) await writeQueueFile(ids.filter((x) => x !== id));
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
  await updateQueue(lesson.id, lesson.status === "queued").catch(() => {});
  cache = null;
  metaCache = null;
  metaCache = null;
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

let reviewsCache: { at: number; data: Record<string, Supervision> } | null = null;
export async function listReviews(fresh = false): Promise<Record<string, Supervision>> {
  if (!fresh && reviewsCache && Date.now() - reviewsCache.at < CACHE_MS) return reviewsCache.data;
  const out: Record<string, Supervision> = {};
  for (const [p, r] of await readAll("midgard/reviews/", fresh)) out[p.slice("midgard/reviews/".length, -5)] = r as unknown as Supervision;
  reviewsCache = { at: Date.now(), data: out };
  return out;
}

export async function saveReview(id: string, review: Supervision) {
  await put(reviewPath(id), JSON.stringify(review), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true });
  cache = null;
  reviewsCache = null;
  metaCache = null;
}

/** Уроки разом із перевірками супервізора (поле supervision). */
export async function lessonsWithReviews(fresh = false) {
  const [lessons, reviews] = await Promise.all([listLessons(fresh), listReviews(fresh).catch(() => ({} as Record<string, Supervision>))]);
  return lessons.map((l) => (reviews[l.id] ? { ...l, supervision: reviews[l.id] } : l));
}
