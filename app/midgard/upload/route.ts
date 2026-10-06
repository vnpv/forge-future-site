import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { LESSON_ID, NOINDEX, validSession, videoPath } from "../auth";

/**
 * Видає браузеру одноразовий токен на завантаження запису уроку в приватний Blob.
 * Сам файл іде з браузера напряму в сховище, минаючи сервер.
 */
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ error: "Сховище записів не підключене" }, { status: 503, headers: NOINDEX });
  const body = (await request.json()) as HandleUploadBody;
  // Токен видаємо лише після входу; callback про завершення підписує сам Vercel (перевіряє handleUpload)
  if (body.type === "blob.generate-client-token" && !(await validSession(request)))
    return Response.json({ error: "Потрібен вхід" }, { status: 401, headers: NOINDEX });
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const id = /^midgard\/video\/([a-z0-9-]+)\.mp4$/.exec(pathname)?.[1];
        if (!id || !LESSON_ID.test(id) || pathname !== videoPath(id)) throw new Error("Невірна назва файлу");
        return {
          allowedContentTypes: ["video/mp4"],
          maximumSizeInBytes: 2 * 1024 * 1024 * 1024,
          addRandomSuffix: false,
          allowOverwrite: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return Response.json(result, { headers: NOINDEX });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Помилка завантаження" }, { status: 400, headers: NOINDEX });
  }
}
