import { NextRequest, NextResponse } from "next/server";
import { notifyIvan } from "@/lib/booking/telegram";
import { clean, readBody } from "@/lib/booking/mc";

export const dynamic = "force-dynamic";

// той самий контакт не частіше разу на 30 хв (повторне «Хочу розбір»), і не більше 40 сповіщень на годину загалом
const seen = new Map<string, number>();
let windowStart = Date.now();
let windowCount = 0;

/** ManyChat (External Request, POST) на старті потоку «Хочу розбір»: миттєве сповіщення Івану в Telegram. */
export async function POST(req: NextRequest) {
  const b = await readBody(req);
  const sid = String(b.sid ?? "").replace(/\D/g, "").slice(0, 20);
  const name = clean(b.name ?? "", 60);
  const ig = clean((b.ig ?? "").replace(/^@/, ""), 40).replace(/[^A-Za-z0-9._]/g, "");
  const text = clean(b.text ?? "", 120);
  if (!sid) return NextResponse.json({ ok: "no" });
  const now = Date.now();
  if (now - windowStart > 3_600_000) {
    windowStart = now;
    windowCount = 0;
  }
  if ((seen.get(sid) ?? 0) > now - 30 * 60_000 || windowCount >= 40) return NextResponse.json({ ok: "skip" });
  seen.set(sid, now);
  windowCount++;
  await notifyIvan(
    [
      `🔥 <b>Новий лід з реклами (Direct)</b>`,
      `${name || "Без імені"}${ig ? ` · @${ig}` : ""}`,
      text ? `Написав(ла): «${text}»` : "",
      `Бот уже пропонує час. Відповісти: https://app.manychat.com/fb5954109/chat/${sid}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return NextResponse.json({ ok: "yes" });
}
