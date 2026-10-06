import { issueSignedToken } from "@vercel/blob";
import { handleUploadPresigned, type HandleUploadPresignedBody } from "@vercel/blob/client";
import { LESSON_ID, NOINDEX, ingestAuthorized, validSession, videoPath } from "../auth";
import { storageReady } from "../storage";

/**
 * Видає браузеру тимчасове підписане посилання на завантаження запису уроку в приватний Blob.
 * Сам файл іде з браузера напряму в сховище, минаючи сервер.
 */
export const dynamic = "force-dynamic";

const MAX_SIZE = 2 * 1024 * 1024 * 1024;

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
        const id = /^midgard\/video\/([a-z0-9-]+)\.mp4$/.exec(pathname)?.[1];
        if (!id || !LESSON_ID.test(id) || pathname !== videoPath(id)) throw new Error("Невірна назва файлу");
        const token = await issueSignedToken({
          pathname,
          operations: ["put"],
          validUntil: Date.now() + 60 * 60 * 1000,
          allowedContentTypes: ["video/mp4"],
          maximumSizeInBytes: MAX_SIZE,
        });
        return { token, urlOptions: { allowedContentTypes: ["video/mp4"], maximumSizeInBytes: MAX_SIZE, allowOverwrite: true, addRandomSuffix: false } };
      },
    });
    return Response.json(result, { headers: NOINDEX });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Помилка завантаження" }, { status: 400, headers: NOINDEX });
  }
}
