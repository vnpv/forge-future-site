import { NextRequest, NextResponse } from "next/server";
import { saveStage } from "@/lib/track";
import { storageReady } from "@/app/focus/store";

/** Події воронки з Mini App. Не критично: помилки ковтаємо, застосунок від цього не залежить. */
export async function POST(req: NextRequest) {
  const b = (await req.json().catch(() => null)) as { uid?: string; ref?: string; tg?: boolean; stage?: number } | null;
  const uid = String(b?.uid ?? "");
  const ref = String(b?.ref ?? "");
  const stage = Number(b?.stage);
  if (!/^[a-z0-9]{3,24}$/.test(uid) || !Number.isInteger(stage) || stage < 0 || stage > 7 || (ref && !/^[a-z0-9]{1,16}$/.test(ref)))
    return NextResponse.json({ ok: false }, { status: 400 });
  if (!storageReady()) return NextResponse.json({ ok: true, skipped: true });
  try {
    const written = await saveStage({ uid, ref, tg: Boolean(b?.tg), stage });
    return NextResponse.json({ ok: true, written });
  } catch {
    return NextResponse.json({ ok: true, skipped: true });
  }
}
