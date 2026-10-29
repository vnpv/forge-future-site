import { NextRequest, NextResponse } from "next/server";
import { saveNotePlanBusy } from "@/lib/booking/slots";

/** Мак Івана пушить сюди блоки зі NotePlan (час із записів на кшталт «15:00 зустріч»). Захист: спільний секрет. */
export async function POST(req: NextRequest) {
  const secret = process.env.BUSY_PUSH_SECRET;
  if (!secret || req.headers.get("x-busy-secret") !== secret) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = (await req.json().catch(() => null)) as { busy?: { s: string; e: string }[] } | null;
  const busy = (body?.busy ?? []).filter((b) => Date.parse(b.s) && Date.parse(b.e)).slice(0, 500);
  const written = await saveNotePlanBusy(busy);
  return NextResponse.json({ ok: true, count: busy.length, written });
}
