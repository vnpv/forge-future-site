import { del, issueSignedToken, presignUrl } from "@vercel/blob";
import { LESSON_ID, NOINDEX, ingestAuthorized } from "../../auth";
import { getLesson, listLessons } from "../../lessons";
import { storageReady } from "../../storage";

/**
 * Черга для обробника на Mac (лише за ключем конвеєра):
 * GET — уроки зі статусом queued + тимчасове посилання на вихідне відео.
 * DELETE ?id= — прибрати вихідне відео після обробки (стиснений запис уже в midgard/video).
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!ingestAuthorized(request)) return Response.json({ error: "Лише для конвеєра" }, { status: 401, headers: NOINDEX });
  if (!storageReady()) return Response.json({ queue: [] }, { headers: NOINDEX });
  const queued = (await listLessons(true)).filter((l) => l.status === "queued");
  const validUntil = Date.now() + 6 * 60 * 60 * 1000;
  const queue = await Promise.all(
    queued.map(async (lesson) => {
      const pathname = (lesson.source as { pathname?: string } | undefined)?.pathname;
      if (!pathname) return { lesson, sourceUrl: null };
      const token = await issueSignedToken({ pathname, operations: ["get"], validUntil });
      const { presignedUrl } = await presignUrl(token, { operation: "get", pathname, access: "private", validUntil });
      return { lesson, sourceUrl: presignedUrl };
    }),
  );
  return Response.json({ queue }, { headers: NOINDEX });
}

export async function DELETE(request: Request) {
  if (!ingestAuthorized(request)) return Response.json({ error: "Лише для конвеєра" }, { status: 401, headers: NOINDEX });
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!LESSON_ID.test(id)) return Response.json({ error: "Невірний id" }, { status: 400, headers: NOINDEX });
  const pathname = ((await getLesson(id))?.source as { pathname?: string } | undefined)?.pathname;
  if (pathname?.startsWith("midgard/uploads/")) await del(pathname).catch(() => {});
  return Response.json({ ok: true }, { headers: NOINDEX });
}
