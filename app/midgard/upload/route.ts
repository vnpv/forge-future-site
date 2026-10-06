import { issueSignedToken } from "@vercel/blob";
import { handleUploadPresigned, type HandleUploadPresignedBody } from "@vercel/blob/client";
import { LESSON_ID, NOINDEX, ingestAuthorized, posterPath, validSession, videoPath } from "../auth";
import { storageReady } from "../storage";

/**
 * Видає браузеру тимчасове підписане посилання на завантаження запису уроку в приватний Blob.
 * Сам файл іде з браузера напряму в сховище, минаючи сервер.
 */
export const dynamic = "force-dynamic";

const MAX_SIZE = 5 * 1024 * 1024 * 1024;
const VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/x-m4v", "video/webm", "video/x-matroska", "video/x-msvideo", "application/octet-stream"];

export async function POST(request: Request) {
  if (!storageReady()) return Response.json({ error: "Сховище записів не підключене" }, { status: 503, headers: NOINDEX });
  const body = (await request.json()) as HandleUploadPresignedBody;
  // Посилання видаємо після входу або за ключем конвеєра (скрипт scripts/midgard-upload-video.mjs)
  if (body.type === "blob.generate-presigned-url" && !ingestAuthorized(request) && !(await validSession(request)))
    return Response.json({ error: "Потрібен вхід" }, { status: 401, headers: NOINDEX });
  try {
    const result = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname) => {
        // Готовий запис (конвеєр): midgard/video/<id>.mp4; вихідне відео з форми: midgard/uploads/<id>.<ext>
        const ready = /^midgard\/video\/([a-z0-9-]+)\.mp4$/.exec(pathname);
        const source = /^midgard\/uploads\/([a-z0-9-]+)\.(mp4|mov|m4v|webm|mkv|avi)$/.exec(pathname);
        const poster = /^midgard\/posters\/([a-z0-9-]+)\.jpg$/.exec(pathname);
        if ((ready || poster) && !ingestAuthorized(request)) throw new Error("Лише для конвеєра");
        const id = (ready ?? source ?? poster)?.[1];
        if (!id || !LESSON_ID.test(id) || (ready && pathname !== videoPath(id)) || (poster && pathname !== posterPath(id))) throw new Error("Невірна назва файлу");
        const types = ready ? ["video/mp4"] : poster ? ["image/jpeg"] : VIDEO_TYPES;
        const token = await issueSignedToken({
          pathname,
          operations: ["put"],
          validUntil: Date.now() + 3 * 60 * 60 * 1000,
          allowedContentTypes: types,
          maximumSizeInBytes: MAX_SIZE,
        });
        return { token, urlOptions: { allowedContentTypes: types, maximumSizeInBytes: MAX_SIZE, allowOverwrite: true, addRandomSuffix: false } };
      },
    });
    return Response.json(result, { headers: NOINDEX });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Помилка завантаження" }, { status: 400, headers: NOINDEX });
  }
}
