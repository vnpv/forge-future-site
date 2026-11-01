import { readText, writeText } from "@/app/focus/store";
import { googleBusy, type Interval } from "./google";
import { kyivDate, kyivToUtc } from "./time";

/** Правила Івана: щодня 9:00-18:00 за Києвом, слот 30 хв (розмова 20 + запас), мінімум за 3 години, на 10 днів. */
export const DAY_START = "09:00";
export const DAY_END = "18:00";
export const SLOT_MIN = 30;
export const LEAD_HOURS = 3;
export const HORIZON_DAYS = 10;

const BUSY_FILE = "booking/noteplan-busy.json";

/** Блоки зі NotePlan (Мак пушить їх на сайт). Читання кешує store.ts. */
async function notePlanBusy(): Promise<Interval[]> {
  try {
    const raw = await readText(BUSY_FILE, false, 60_000);
    if (!raw) return [];
    const j = JSON.parse(raw) as { busy?: { s: string; e: string }[] };
    return (j.busy ?? []).map((b) => ({ s: Date.parse(b.s), e: Date.parse(b.e) })).filter((b) => b.s && b.e);
  } catch {
    return [];
  }
}

export async function saveNotePlanBusy(busy: { s: string; e: string }[]) {
  const now = new Date().toISOString();
  const prev = await readText(BUSY_FILE, true).catch(() => null);
  let updated = now;
  if (prev) {
    try {
      const p = JSON.parse(prev) as { busy?: unknown; updated?: string; checked?: string };
      const same = JSON.stringify(p.busy) === JSON.stringify(busy);
      const checked = Date.parse(p.checked ?? p.updated ?? "") || 0;
      // без змін: не палимо ліміт записів Blob, але раз на годину оновлюємо «перевірено», щоб було видно, що Mac живий
      if (same && Date.now() - checked < 60 * 60_000) return false;
      if (same) updated = p.updated ?? now;
    } catch {}
  }
  await writeText(BUSY_FILE, JSON.stringify({ updated, checked: now, busy }), "application/json");
  return true;
}

/** Скільки годин тому Mac востаннє звітував про NotePlan (null: даних немає). Для попередження Івану при бронюванні. */
export async function notePlanAgeHours(): Promise<number | null> {
  try {
    const raw = await readText(BUSY_FILE, true);
    if (!raw) return null;
    const j = JSON.parse(raw) as { updated?: string; checked?: string };
    const t = Date.parse(j.checked ?? j.updated ?? "");
    return t ? (Date.now() - t) / 3_600_000 : null;
  } catch {
    return null;
  }
}

function clash(s: number, e: number, busy: Interval[]) {
  return busy.some((b) => s < b.e && e > b.s);
}

/** Вільні слоти: { "2026-10-30": ["09:00","09:30",...] }. */
export async function freeSlots(now = new Date()): Promise<Record<string, string[]>> {
  const first = kyivDate(0, now);
  const last = kyivDate(HORIZON_DAYS, now);
  const from = kyivToUtc(first, "00:00");
  const to = kyivToUtc(last, "23:59");
  const busy = [...(await googleBusy(from, to)), ...(await notePlanBusy())];
  const minStart = now.getTime() + LEAD_HOURS * 3600_000;
  const [sh, sm] = DAY_START.split(":").map(Number);
  const [eh, em] = DAY_END.split(":").map(Number);
  const out: Record<string, string[]> = {};
  for (let d = 0; d <= HORIZON_DAYS; d++) {
    const date = kyivDate(d, now);
    const times: string[] = [];
    for (let m = sh * 60 + sm; m + SLOT_MIN <= eh * 60 + em; m += SLOT_MIN) {
      const t = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
      const s = kyivToUtc(date, t).getTime();
      const e = s + SLOT_MIN * 60_000;
      if (s < minStart || clash(s, e, busy)) continue;
      times.push(t);
    }
    if (times.length) out[date] = times;
  }
  return out;
}
