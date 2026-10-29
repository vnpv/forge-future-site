import { NextRequest, NextResponse } from "next/server";
import { createEvent, googleConfigured } from "@/lib/booking/google";
import { freeSlots, SLOT_MIN } from "@/lib/booking/slots";
import { notifyIvan, partnerLabel, sendTelegram, verifyInitData } from "@/lib/booking/telegram";
import { kyivToUtc } from "@/lib/booking/time";
import { storageReady, writeText } from "@/app/focus/store";

export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const esc = (s: string) => s.replace(/[<>&]/g, "");

export async function POST(req: NextRequest) {
  if (!googleConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const b = (await req.json().catch(() => null)) as Record<string, string> | null;
  const date = String(b?.date ?? "");
  const time = String(b?.time ?? "");
  const name = esc(String(b?.name ?? "").trim()).slice(0, 40);
  const email = String(b?.email ?? "").trim().toLowerCase().slice(0, 120);
  const contact = esc(String(b?.contact ?? "").trim()).slice(0, 60);
  const age = esc(String(b?.age ?? "")).slice(0, 8);
  const ref = String(b?.ref ?? "").replace(/[^a-z0-9]/g, "").slice(0, 16);
  const code = String(b?.code ?? "").replace(/[^a-z0-9]/g, "").slice(0, 8);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time) || name.length < 2 || !EMAIL.test(email))
    return NextResponse.json({ error: "bad_request" }, { status: 400 });

  // слот має бути вільним саме зараз (перерахунок із Google і NotePlan)
  let free: Record<string, string[]>;
  try {
    free = await freeSlots();
  } catch (e) {
    console.error("book slots", e);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
  if (!free[date]?.includes(time)) return NextResponse.json({ error: "taken" }, { status: 409 });

  const tg = verifyInitData(String(b?.initData ?? ""));
  if (!tg && contact.length < 5) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const start = kyivToUtc(date, time);
  const end = new Date(start.getTime() + SLOT_MIN * 60_000);
  const who = tg ? `Telegram: ${tg.username ? "@" + tg.username : "id " + tg.id}` : "Telegram: не підтверджено (браузер)";
  // Опис бачить сам батько в запрошенні: лише людські слова. Службове (квіз, джерело) йде Івану в Telegram і в приховане поле події.
  const description = [
    `Розбір 20 хвилин вашого підлітка з Іваном Первой (Forge Future). Посилання на відеодзвінок у цьому запрошенні.`,
    `Я питатиму про ситуацію, ви розповідаєте. Наприкінці скажу, що бачу, і запропоную наступний крок. Безкоштовно.`,
    `Якщо час треба змінити, напишіть мені в Telegram: @IvanPervoy.`,
  ].join("\n\n");

  let ev;
  try {
    ev = await createEvent({
      start,
      end,
      summary: `Розбір з Іваном (Forge Future): ${name}`,
      description,
      email,
      privateProps: { child: `${name}, ${age}`, quiz: code || "-", source: ref || "-", telegram: tg ? String(tg.id) : "-", contact: contact || "-" },
    });
  } catch (e) {
    console.error("book create", e);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const label = `${date.split("-").reverse().join(".")} о ${time}`;
  const channel =
    ref && /^(ig|rl|yt|tg|web)/.test(ref)
      ? `Канал: <code>${ref}</code>`
      : ref
        ? `Партнер: ${esc(await partnerLabel(ref))} (10%), id <code>${ref}</code>`
        : "";
  await notifyIvan(
    [`📅 <b>Розбір заброньовано</b>: ${label} (Київ)`, `Дитина: ${name}, ${age}`, `Email: ${email}`, tg ? "" : `Контакт: ${contact}`, who, `Квіз: ${code || "-"}`, channel, ev.meet ? `Meet: ${ev.meet}` : ""]
      .filter(Boolean)
      .join("\n"),
  );
  if (tg) await sendTelegram(tg.id, `Записав ✅ Розбір ${label} за київським часом. Запрошення з Google прийшло на ${email}${ev.meet ? `\nПосилання: ${ev.meet}` : ""}`);

  // Запис із сайту (без Telegram): код, за яким бот підключить людину і надішле підтвердження в Telegram
  let bid = "";
  if (!tg && storageReady()) {
    bid = Math.random().toString(36).slice(2, 10);
    try {
      await writeText(`booking/b/${bid}.json`, JSON.stringify({ label, email, name, meet: ev.meet, ref, contact }), "application/json");
    } catch {
      bid = "";
    }
  }
  return NextResponse.json({ ok: true, label, meet: ev.meet, bid });
}
