#!/usr/bin/env node
// Завантажує запис уроку в приватне сховище дашборду MIDGARD (без входу на сайт).
// Використання: MIDGARD_INGEST_KEY=... node scripts/midgard-upload-video.mjs <lessonId> <file.mp4> [https://forge-future.com]
// MIDGARD_AS_SOURCE=1 — покласти як вихідне відео для черги (midgard/uploads/<id>.<ext>)
// MIDGARD_AS_POSTER=1 — кадр-обкладинка уроку (midgard/posters/<id>.jpg)
import { openAsBlob } from "node:fs";
import { uploadPresigned } from "@vercel/blob/client";

const [id, file, base = "https://forge-future.com"] = process.argv.slice(2);
const key = process.env.MIDGARD_INGEST_KEY;
if (!id || !file || !key) {
  console.error("Потрібно: MIDGARD_INGEST_KEY у змінних, <lessonId> <file.mp4>");
  process.exit(1);
}
const asPoster = !!process.env.MIDGARD_AS_POSTER;
const type = asPoster ? "image/jpeg" : "video/mp4";
const body = await openAsBlob(file, { type });
let last = -1;
const ext = file.split(".").pop().toLowerCase();
const pathname = asPoster ? `midgard/posters/${id}.jpg` : process.env.MIDGARD_AS_SOURCE ? `midgard/uploads/${id}.${ext}` : `midgard/video/${id}.mp4`;
const res = await uploadPresigned(pathname, body, {
  access: "private",
  handleUploadUrl: `${base}/midgard/upload`,
  headers: { Authorization: `Bearer ${key}` },
  contentType: type,
  multipart: body.size > 50 * 1024 * 1024,
  onUploadProgress: ({ percentage }) => {
    const p = Math.floor(percentage / 10) * 10;
    if (p !== last) { last = p; console.log(`${id}: ${p}%`); }
  },
});
console.log(`${id}: готово → ${res.pathname} (${(body.size / 1048576).toFixed(1)} МБ)`);
