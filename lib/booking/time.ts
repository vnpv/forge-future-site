/** Київський час без бібліотек: Intl дає зсув (літній/зимовий) для будь-якого моменту. */
export const TZ = "Europe/Kyiv";

function offsetMs(at: Date): number {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const p = Object.fromEntries(f.formatToParts(at).map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - at.getTime();
}

/** Дата й час за Києвом → момент UTC. */
export function kyivToUtc(date: string, time: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let t = guess - offsetMs(new Date(guess));
  const off2 = offsetMs(new Date(t));
  t = guess - off2;
  return new Date(t);
}

/** Сьогоднішня дата за Києвом (YYYY-MM-DD) + n днів. */
export function kyivDate(plusDays = 0, now = new Date()): string {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(now);
  const [y, m, d] = today.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + plusDays)).toISOString().slice(0, 10);
}
