import { NextRequest, NextResponse } from "next/server";
import { readText, storageReady, writeText } from "@/app/focus/store";

/**
 * Клік з реклами на лендинг міні-курсу: зберігаємо ідентифікатори Meta (fbp, fbc) під коротким ключем.
 * Ключ іде в start-параметр бота; після оплати бот бере ці дані й надсилає Purchase у Conversions API,
 * щоб Meta пов'язала покупку в Telegram із кліком по рекламі. Без IP і без особистих даних.
 */
const KEY_RE = /^[a-z0-9]{8,16}$/;
const path = (key: string) => `mcclick/${key}.json`;

export async function POST(req: NextRequest) {
  const b = (await req.json().catch(() => null)) as { key?: string; fbp?: string; fbc?: string; url?: string } | null;
  const key = String(b?.key ?? "");
  if (!KEY_RE.test(key)) return NextResponse.json({ ok: false }, { status: 400 });
  if (!storageReady()) return NextResponse.json({ ok: true, skipped: true });
  const rec = {
    key,
    fbp: String(b?.fbp ?? "").slice(0, 120),
    fbc: String(b?.fbc ?? "").slice(0, 200),
    url: String(b?.url ?? "").slice(0, 300),
    ua: (req.headers.get("user-agent") ?? "").slice(0, 300),
    ts: Math.floor(Date.now() / 1000),
  };
  try {
    await writeText(path(key), JSON.stringify(rec), "application/json");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true, skipped: true });
  }
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key") ?? "";
  if (!KEY_RE.test(key)) return NextResponse.json({ ok: false }, { status: 400 });
  const raw = await readText(path(key), true).catch(() => null);
  if (!raw) return NextResponse.json({ ok: false }, { status: 404 });
  return NextResponse.json({ ok: true, ...JSON.parse(raw) });
}
