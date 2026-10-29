import { NextRequest, NextResponse } from "next/server";
import { allRecords, summarize } from "@/lib/track";

/** Зведення воронки для бота Івана (дашборд у Telegram). Захист: той самий секрет, що й /api/busy. */
export async function GET(req: NextRequest) {
  const secret = process.env.BUSY_PUSH_SECRET;
  if (!secret || req.headers.get("x-busy-secret") !== secret) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  try {
    return NextResponse.json({ ok: true, rows: summarize(await allRecords()) });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
