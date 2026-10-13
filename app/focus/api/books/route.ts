import { NOINDEX, currentUser, loadStudents } from "../../auth";
import { fileFor, loadBooks } from "../../books";

/** Список воркбуків для поточного користувача (+ учні для admin). */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const me = await currentUser(request);
  if (!me) return Response.json({ error: "Потрібен вхід" }, { status: 401, headers: NOINDEX });
  const books = (await loadBooks()).map((b) => ({
    id: b.id,
    title: b.title,
    main: Boolean(fileFor(b, me.role, "main")),
    example: Boolean(b.files.example),
  }));
  const students = me.role === "admin" ? (await loadStudents()).map((s) => ({ email: s.email, name: s.name })) : [];
  return Response.json({ me, books, students }, { headers: NOINDEX });
}
