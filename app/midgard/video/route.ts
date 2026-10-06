import { get, head } from "@vercel/blob";
import { LESSON_ID, NOINDEX, validSession, videoPath } from "../auth";

/**
 * Запис уроку з приватного Vercel Blob — лише після входу.
 * GET /midgard/video?id=hist0126            → відео шматками (Range), щоб працювала перемотка
 * GET /midgard/video?id=hist0126&check=1    → {exists} — чи завантажено запис
 */
export const dynamic = "force-dynamic";

const CHUNK = 6 * 1024 * 1024; // відповідаємо шматками, щоб функція не тримала з'єднання довго

export async function GET(request: Request) {
  if (!(await validSession(request))) return new Response("Потрібен вхід", { status: 401, headers: NOINDEX });
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "";
  if (!LESSON_ID.test(id)) return new Response("Невірний урок", { status: 400, headers: NOINDEX });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ exists: false, reason: "storage" }, { headers: NOINDEX });

  if (url.searchParams.has("check")) {
    try {
      await head(videoPath(id));
      return Response.json({ exists: true }, { headers: NOINDEX });
    } catch {
      return Response.json({ exists: false }, { headers: NOINDEX });
    }
  }

  // Відкритий діапазон "bytes=N-" обмежуємо шматком; браузер сам попросить наступний
  const m = /^bytes=(\d+)-(\d*)$/.exec(request.headers.get("range") ?? "");
  const start = m ? Number(m[1]) : 0;
  const end = m && m[2] ? Math.min(Number(m[2]), start + CHUNK - 1) : start + CHUNK - 1;
  const res = await get(videoPath(id), { access: "private", headers: { Range: `bytes=${start}-${end}` } }).catch(() => null);
  if (!res || res.statusCode !== 200) return new Response("Запис не знайдено", { status: 404, headers: NOINDEX });

  const headers: Record<string, string> = { ...NOINDEX, "Content-Type": "video/mp4", "Accept-Ranges": "bytes" };
  const range = res.headers.get("content-range");
  const length = res.headers.get("content-length");
  if (range) headers["Content-Range"] = range;
  if (length) headers["Content-Length"] = length;
  return new Response(res.stream, { status: range ? 206 : 200, headers });
}
