import { NextRequest, NextResponse } from "next/server";
import { readText, storageReady, writeText } from "@/app/focus/store";

/**
 * Ретранслятор лідів бота школи (Railway) на Mac: бот шле кожен новий рядок сюди, Mac раз на 10 хв забирає
 * й дописує у свої файли registrations/partners/minicourse-waitlist. Доступ за секретом.
 */
const KINDS = ["registrations", "partners", "waitlist"] as const;
type Kind = (typeof KINDS)[number];
const path = (k: Kind) => `forge-sync/${k}.jsonl`;
const authed = (req: NextRequest) => {
  const s = process.env.BUSY_PUSH_SECRET;
  return Boolean(s) && req.headers.get("x-key") === s;
};

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!storageReady()) return NextResponse.json({ ok: false, error: "no storage" }, { status: 503 });
  const body = (await req.json().catch(() => null)) as { kind?: string; line?: string } | null;
  const kind = KINDS.find((k) => k === body?.kind);
  const line = (body?.line ?? "").trim();
  if (!kind || !line || line.length > 5000) return NextResponse.json({ ok: false }, { status: 400 });
  const cur = (await readText(path(kind), true)) ?? "";
  const lines = cur ? cur.split("\n") : [];
  if (!lines.includes(line)) lines.push(line);
  await writeText(path(kind), lines.slice(-5000).join("\n"), "text/plain");
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const out: Record<string, string[]> = {};
  for (const k of KINDS) {
    const t = (await readText(path(k), true)) ?? "";
    out[k] = t ? t.split("\n").filter(Boolean) : [];
  }
  return NextResponse.json({ ok: true, ...out });
}
