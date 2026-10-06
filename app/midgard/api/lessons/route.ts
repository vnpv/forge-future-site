import { del } from "@vercel/blob";
import { LESSON_ID, NOINDEX, ingestAuthorized, posterPath, validSession, videoPath } from "../../auth";
import { type Lesson, getLesson, lessonPath, listLessons, saveLesson } from "../../lessons";
import { storageReady } from "../../storage";

/**
 * Уроки MIDGARD.
 * GET  — усі уроки (після входу або за ключем конвеєра)
 * POST — новий урок із форми «Додати урок» (після входу): створює запис зі статусом queued
 * PUT  — оновлення запису обробником на Mac (лише за ключем конвеєра)
 * DELETE ?id= — видалити урок разом із записом і обкладинкою (лише за ключем конвеєра)
 */
export const dynamic = "force-dynamic";

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: NOINDEX });
const SOURCE = /^midgard\/uploads\/([a-z0-9-]+)\.(mp4|mov|m4v|webm|mkv|avi)$/;
const PAIR = new Set(["none", "first", "second"]);

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

function teacherIdFor(name: string, lessons: Lesson[]) {
  const same = lessons.find((l) => typeof l.teacher === "string" && norm(l.teacher) === norm(name) && typeof l.teacherId === "string");
  if (same) return same.teacherId as string;
  let h = 2166136261;
  for (const ch of norm(name)) h = Math.imul(h ^ ch.codePointAt(0)!, 16777619) >>> 0;
  return "t-" + h.toString(36);
}

export async function GET(request: Request) {
  if (!ingestAuthorized(request) && !(await validSession(request))) return json({ error: "Потрібен вхід" }, 401);
  if (!storageReady()) return json({ lessons: [] });
  return json({ lessons: await listLessons(true) });
}

export async function POST(request: Request) {
  if (!(await validSession(request))) return json({ error: "Потрібен вхід" }, 401);
  if (!storageReady()) return json({ error: "Сховище записів не підключене" }, 503);
  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return json({ error: "Невірні дані форми" }, 400);
  }
  const id = str(b.id, 40);
  const source = str(b.source, 120);
  const teacher = str(b.teacher, 60);
  const subject = str(b.subject, 60);
  const isoDate = str(b.isoDate, 10);
  const lessonMin = Number(b.lessonMin) || 45;
  const pair = PAIR.has(str(b.pair, 10)) ? str(b.pair, 10) : "none";
  const m = SOURCE.exec(source);
  if (!LESSON_ID.test(id) || !m || m[1] !== id) return json({ error: "Спочатку завантажте відеозапис" }, 400);
  if (!teacher) return json({ error: "Вкажіть вчителя" }, 400);
  if (!subject) return json({ error: "Вкажіть предмет" }, 400);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return json({ error: "Вкажіть дату уроку" }, 400);
  if (lessonMin < 10 || lessonMin > 180) return json({ error: "Тривалість уроку — від 10 до 180 хвилин" }, 400);
  if (await getLesson(id)) return json({ error: "Такий урок уже є" }, 409);

  const lessons = await listLessons(true);
  const [y, mo, d] = isoDate.split("-");
  const lesson: Lesson = {
    id,
    status: "queued",
    teacher,
    teacherId: teacherIdFor(teacher, lessons),
    subject,
    grade: str(b.grade, 20) || "не вказано",
    isoDate,
    date: `${d}.${mo}.${y}`,
    topic: str(b.topic, 200),
    lessonMin,
    pair,
    notes: str(b.notes, 1500),
    source: { pathname: source, name: str(b.fileName, 200), size: Number(b.fileSize) || null },
    createdAt: new Date().toISOString(),
  };
  await saveLesson(lesson);
  return json({ lesson }, 201);
}

export async function PUT(request: Request) {
  if (!ingestAuthorized(request)) return json({ error: "Лише для конвеєра" }, 401);
  if (!storageReady()) return json({ error: "Сховище записів не підключене" }, 503);
  let lesson: Lesson;
  try {
    lesson = await request.json();
  } catch {
    return json({ error: "Невірний JSON" }, 400);
  }
  if (!lesson || !LESSON_ID.test(String(lesson.id))) return json({ error: "Невірний id" }, 400);
  await saveLesson(lesson);
  return json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!ingestAuthorized(request)) return json({ error: "Лише для конвеєра" }, 401);
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!LESSON_ID.test(id)) return json({ error: "Невірний id" }, 400);
  const source = ((await getLesson(id))?.source as { pathname?: string } | undefined)?.pathname;
  const paths = [lessonPath(id), videoPath(id), posterPath(id), ...(source?.startsWith("midgard/uploads/") ? [source] : [])];
  await Promise.all(paths.map((p) => del(p).catch(() => {})));
  await listLessons(true);
  return json({ ok: true });
}
