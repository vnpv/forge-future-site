import { head, issueSignedToken, presignUrl } from "@vercel/blob";
import { LESSON_ID, NOINDEX, ingestAuthorized, posterPath, validSession, videoPath } from "../auth";
import { storageReady } from "../storage";

/**
 * Запис уроку з приватного Vercel Blob — лише після входу.
 * GET /midgard/video?id=hist0126          → 302 на тимчасове (2 год) підписане посилання;
 *                                           перемотка (Range) іде напряму в CDN Blob
 * GET /midgard/video?id=hist0126&check=1  → {exists} — чи завантажено запис
 * GET /midgard/video?id=hist0126&poster=1 → кадр-обкладинка уроку (jpg)
 */
export const dynamic = "force-dynamic";

const TTL = 2 * 60 * 60 * 1000;

export async function GET(request: Request) {
  // Після входу або за ключем конвеєра (перевірка, що запис доступний)
  if (!ingestAuthorized(request) && !(await validSession(request))) return new Response("Потрібен вхід", { status: 401, headers: NOINDEX });
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "";
  if (!LESSON_ID.test(id)) return new Response("Невірний урок", { status: 400, headers: NOINDEX });
  if (!storageReady()) return Response.json({ exists: false, reason: "storage" }, { headers: NOINDEX });
  const pathname = url.searchParams.has("poster") ? posterPath(id) : videoPath(id);

  if (url.searchParams.has("check")) {
    try {
      await head(pathname);
      return Response.json({ exists: true }, { headers: NOINDEX });
    } catch {
      return Response.json({ exists: false }, { headers: NOINDEX });
    }
  }

  try {
    const validUntil = Date.now() + TTL;
    const token = await issueSignedToken({ pathname, operations: ["get"], validUntil });
    const { presignedUrl } = await presignUrl(token, { operation: "get", pathname, access: "private", validUntil });
    return new Response(null, { status: 302, headers: { ...NOINDEX, Location: presignedUrl } });
  } catch {
    return new Response("Запис не знайдено", { status: 404, headers: NOINDEX });
  }
}
