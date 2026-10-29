import { NextRequest, NextResponse } from "next/server";
import { readText } from "@/app/focus/store";

/** Запис за кодом: бот Івана бере звідси деталі, коли людина з сайту натискає «нагадування в Telegram». Захист: спільний секрет. */
export async function GET(req: NextRequest) {
  const secret = process.env.BUSY_PUSH_SECRET;
  if (!secret || req.headers.get("x-busy-secret") !== secret) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const code = (req.nextUrl.searchParams.get("code") ?? "").replace(/[^a-z0-9]/g, "").slice(0, 12);
  const raw = code ? await readText(`booking/b/${code}.json`, true).catch(() => null) : null;
  if (!raw) return NextResponse.json({ ok: false }, { status: 404 });
  return NextResponse.json({ ok: true, ...JSON.parse(raw) });
}
