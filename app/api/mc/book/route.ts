import { NextRequest, NextResponse } from "next/server";
import { createEvent, googleConfigured } from "@/lib/booking/google";
import { freeSlots, notePlanAgeHours, SLOT_MIN } from "@/lib/booking/slots";
import { notifyIvan } from "@/lib/booking/telegram";
import { kyivToUtc } from "@/lib/booking/time";
import { clean, readBody, slotLabel } from "@/lib/booking/mc";

export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * ManyChat (External Request, POST): запис на розбір прямо з Direct.
 * Тіло: slot ("YYYY-MM-DDTHH:MM" з /api/mc/slots), email, name, ig, sid, age.
 * Відповідь пласка для мапінгу: ok = yes | taken | error, label (людський час), meet (посилання Google Meet).
 */
export async function POST(req: NextRequest) {
  if (!googleConfigured()) return NextResponse.json({ ok: "error", label: "" });
  const b = await readBody(req);
  const m = String(b.slot ?? "").match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})$/);
  const email = String(b.email ?? "").trim().toLowerCase().slice(0, 120);
  const name = clean(b.name ?? "", 60) || "Instagram";
  const ig = clean((b.ig ?? "").replace(/^@/, ""), 40).replace(/[^A-Za-z0-9._]/g, "");
  const sid = String(b.sid ?? "").replace(/\D/g, "").slice(0, 20);
  const age = clean(b.age ?? "", 8);
  if (!m) return NextResponse.json({ ok: "error", label: "" });
  // email необов'язковий (з 15.11: запис одним натиском кнопки-слота, посилання на Meet іде в чат)
  const mail = EMAIL.test(email) ? email : "";
  const [, date, time] = m;
  const label = slotLabel(date, time);

  try {
    const free = await freeSlots();
    if (!free[date]?.includes(time)) return NextResponse.json({ ok: "taken", label });
  } catch (e) {
    console.error("mc book slots", e);
    return NextResponse.json({ ok: "error", label });
  }

  const start = kyivToUtc(date, time);
  const end = new Date(start.getTime() + SLOT_MIN * 60_000);
  const description = [
    `Розбір 20 хвилин вашого підлітка з Іваном Первой (Forge Future). Посилання на відеодзвінок у цьому запрошенні.`,
    `Я питатиму про ситуацію, ви розповідаєте. Наприкінці скажу, що бачу, і запропоную наступний крок. Безкоштовно.`,
    `Якщо час треба змінити, напишіть мені в Instagram: @ivanpervoy.`,
  ].join("\n\n");
  let ev;
  try {
    ev = await createEvent({
      start,
      end,
      summary: `Розбір з Іваном (Forge Future): ${name}`,
      description,
      email: mail,
      privateProps: { child: `${name}, ${age || "?"}`, quiz: "-", source: "igdm", telegram: "-", contact: ig ? `@${ig}` : sid ? `mc ${sid}` : "-" },
    });
  } catch (e) {
    console.error("mc book create", e);
    return NextResponse.json({ ok: "error", label });
  }
  const npAge = await notePlanAgeHours();
  const stale = npAge === null || npAge > 3 ? `⚠️ Дані NotePlan на сайті ${npAge === null ? "відсутні" : `не оновлювались ${Math.round(npAge)} год`} (Mac спить?). Перевір, чи немає накладки.` : "";
  await notifyIvan(
    [
      `📅 <b>Розбір заброньовано з Direct</b>: ${label} (Київ)`,
      stale,
      `${name}${ig ? ` · @${ig}` : ""}${age ? ` · дитина ${age}` : ""}`,
      mail ? `Email: ${mail}` : "Email: — (запис кнопкою в Direct, Meet надіслано в чат)",
      `Канал: <code>igdm</code> (реклама → Direct → бот)`,
      sid ? `Чат: https://app.manychat.com/fb5954109/chat/${sid}` : "",
      ev.meet ? `Meet: ${ev.meet}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return NextResponse.json({ ok: "yes", label, meet: ev.meet ?? "" });
}
