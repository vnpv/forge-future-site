import { issueSignedToken, presignUrl } from "@vercel/blob";
import { NOINDEX, ingestAuthorized } from "../../auth";
import { listLessons } from "../../lessons";
import { storageReady } from "../../storage";

/**
 * Черга для обробника на Mac (лише за ключем конвеєра):
 * уроки зі статусом queued + тимчасове посилання на вихідне відео.
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
