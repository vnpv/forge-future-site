import { NOINDEX, currentUser, loadStudents } from "../../auth";
import { fileFor, loadBooks } from "../../books";
import { StoreError } from "../../store";

/** Список воркбуків для поточного користувача (+ учні для admin). */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const me = await currentUser(request);
  if (!me) return Response.json({ error: "Потрібен вхід" }, { status: 401, headers: NOINDEX });
  let all: Awaited<ReturnType<typeof loadBooks>>;
  let students: Awaited<ReturnType<typeof loadStudents>> = [];
  try {
    all = await loadBooks();
    if (me.role === "admin") students = await loadStudents();
  } catch (e) {
    if (e instanceof StoreError) return Response.json({ error: "Сховище тимчасово недоступне. Дані не втрачено." }, { status: 503, headers: NOINDEX });
    throw e;
  }
  const books = all.map((b) => ({
    id: b.id,
    title: b.title,
    main: Boolean(fileFor(b, me.role, "main", me.track)),
    example: Boolean(fileFor(b, me.role, "example", me.track)),
    hasAdmin: Boolean(b.files.admin),
    hasStudent: Boolean(b.files.student || b.files["student-career"]),
  }));
  return Response.json({ me, books, students: students.map((s) => ({ email: s.email, name: s.name, track: s.track ?? "business" })) }, { headers: NOINDEX });
}
