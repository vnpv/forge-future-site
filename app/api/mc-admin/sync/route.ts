import { NextRequest, NextResponse } from "next/server";
import { storageReady, writeText } from "@/app/focus/store";

/** Бот міні-курсу (Mac Івана) шле сюди знімок стану: панель /mc-admin його лише читає. Доступ за секретом. */
export async function POST(req: NextRequest) {
  const secret = process.env.BUSY_PUSH_SECRET;
  if (!secret || req.headers.get("x-key") !== secret) return NextResponse.json({ ok: false }, { status: 401 });
  if (!storageReady()) return NextResponse.json({ ok: false, error: "no storage" }, { status: 503 });
  const body = await req.text();
  if (body.length > 4_000_000) return NextResponse.json({ ok: false, error: "too big" }, { status: 413 });
  try {
    JSON.parse(body);
    await writeText("mcadmin/snapshot.json", body, "application/json");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
