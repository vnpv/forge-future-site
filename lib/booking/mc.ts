/** Спільне для ендпойнтів ManyChat (Instagram Direct): підписи слотів і парсинг тіла. */
const WD = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];

/** "2026-11-16" + "10:00" → "пн 16.11 · 10:00" (≤ 20 знаків: ліміт кнопки швидкої відповіді Instagram). */
export function slotLabel(date: string, time: string): string {
  const d = new Date(`${date}T12:00:00Z`);
  const [, m, dd] = date.split("-");
  return `${WD[d.getUTCDay()]} ${dd}.${m} · ${time}`;
}

/** 3 варіанти з різних днів: найближчий, наступний день, вечірній (від 16:00), якщо є. */
export function pickThree(days: Record<string, string[]>): { date: string; time: string }[] {
  const dates = Object.keys(days).sort();
  const out: { date: string; time: string }[] = [];
  const used = new Set<string>();
  const add = (date: string, time: string | undefined) => {
    if (!time || out.some((o) => o.date === date && o.time === time)) return;
    out.push({ date, time });
    used.add(date);
  };
  // 1) найближчий слот
  if (dates[0]) add(dates[0], days[dates[0]][0]);
  // 2) вечір (≥ 16:00) на іншому дні: батьки після роботи
  for (const d of dates) {
    if (out.length >= 2) break;
    if (used.has(d)) continue;
    const ev = days[d].find((t) => t >= "16:00");
    if (ev) add(d, ev);
  }
  // 3) ранок ще одного дня
  for (const d of dates) {
    if (out.length >= 3) break;
    if (used.has(d)) continue;
    add(d, days[d][0]);
  }
  // добити будь-якими, якщо днів мало
  for (const d of dates) for (const t of days[d]) if (out.length < 3) add(d, t);
  return out.slice(0, 3).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

export async function readBody(req: Request): Promise<Record<string, string>> {
  try {
    const j = (await req.json()) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(j ?? {}).map(([k, v]) => [k, v == null ? "" : String(v)]));
  } catch {
    return {};
  }
}

export const clean = (s: string, n: number) => s.replace(/[<>&]/g, "").trim().slice(0, n);
