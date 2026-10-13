import { NOINDEX, currentUser, loadStudents, makeStudent, newPassword, saveStudents } from "../../auth";
import { storageReady } from "../../store";

/** Керування учнями (лише admin): список, додати/скинути пароль, видалити. */
export const dynamic = "force-dynamic";
const err = (m: string, status: number) => Response.json({ error: m }, { status, headers: NOINDEX });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function admin(request: Request) {
  const me = await currentUser(request);
  return me && me.role === "admin" ? me : null;
}

export async function GET(request: Request) {
  if (!(await admin(request))) return err("Немає доступу", 403);
  const list = (await loadStudents(true)).map((s) => ({ email: s.email, name: s.name, createdAt: s.createdAt }));
  return Response.json({ students: list }, { headers: NOINDEX });
}

/** { email, name?, password? } — новий учень або скидання пароля існуючого. Пароль повертається один раз. */
export async function POST(request: Request) {
  if (!(await admin(request))) return err("Немає доступу", 403);
  if (!storageReady()) return err("Сховище не підключене", 503);
  const body = (await request.json().catch(() => ({}))) as { email?: string; name?: string; password?: string };
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) return err("Невірна пошта", 400);
  const password = String(body.password ?? "").trim() || newPassword();
  if (password.length < 8) return err("Пароль має бути не коротший за 8 символів", 400);
  const students = await loadStudents(true);
  const old = students.find((s) => s.email === email);
  const name = String(body.name ?? "").trim() || old?.name || email.split("@")[0];
  const next = makeStudent(email, name, password);
  await saveStudents([...students.filter((s) => s.email !== email), old ? { ...next, createdAt: old.createdAt } : next]);
  return Response.json({ ok: true, email, name, password }, { headers: NOINDEX });
}

export async function DELETE(request: Request) {
  if (!(await admin(request))) return err("Немає доступу", 403);
  const email = (new URL(request.url).searchParams.get("email") ?? "").toLowerCase();
  const students = await loadStudents(true);
  if (!students.some((s) => s.email === email)) return err("Учня не знайдено", 404);
  await saveStudents(students.filter((s) => s.email !== email));
  return Response.json({ ok: true }, { headers: NOINDEX });
}
