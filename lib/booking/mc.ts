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

/**
 * Тіло запиту з ManyChat. Підтримуємо і пласкі поля ({"sid":..,"email":..}), і «Add Full Contact Data»
 * (усі дані контакту: id, name, first_name, ig_username, email, last_input_text, custom_fields{...}),
 * у т. ч. загорнуті в будь-який ключ ({"contact": {...}}). На виході — плаский словник рядків.
 */
export async function readBody(req: Request): Promise<Record<string, string>> {
  let j: Record<string, unknown> = {};
  try {
    j = ((await req.json()) as Record<string, unknown>) ?? {};
  } catch {
    return {};
  }
  const out: Record<string, string> = {};
  const put = (k: string, v: unknown) => {
    if (v == null || typeof v === "object") return;
    if (out[k] === undefined || out[k] === "") out[k] = String(v);
  };
  const walk = (o: Record<string, unknown>, depth: number) => {
    for (const [k, v] of Object.entries(o)) {
      if (v && typeof v === "object" && !Array.isArray(v) && depth < 3) walk(v as Record<string, unknown>, depth + 1);
      else put(k, v);
    }
  };
  walk(j, 0);
  // синоніми з повних даних контакту ManyChat
  put("sid", out.id ?? out.subscriber_id ?? out.contact_id);
  put("name", out.name ?? out.first_name);
  put("ig", out.ig_username ?? out.instagram_username ?? out.username);
  put("text", out.last_input_text ?? out.last_text_input);
  put("slot", out.chosen_slot);
  put("email", out.lead_email);
  put("age", out.child_age);
  return out;
}

export const clean = (s: string, n: number) => s.replace(/[<>&]/g, "").trim().slice(0, n);
