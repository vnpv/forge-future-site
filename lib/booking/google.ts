/** Google Calendar REST без SDK: refresh-токен Івана → зайнятість і створення події з запрошенням. */
import { TZ } from "./time";

const ENV = () => ({
  id: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_CLIENT_SECRET,
  refresh: process.env.GOOGLE_REFRESH_TOKEN,
});

/** У dev можна вмикати BOOKING_FAKE=1: слоти без Google (тільки не в production). */
export const fakeMode = () => process.env.NODE_ENV !== "production" && process.env.BOOKING_FAKE === "1";

export function googleConfigured(): boolean {
  const e = ENV();
  return fakeMode() || Boolean(e.id && e.secret && e.refresh);
}

let tokenCache: { token: string; exp: number } | null = null;

async function accessToken(): Promise<string> {
  if (tokenCache && tokenCache.exp > Date.now() + 60_000) return tokenCache.token;
  const e = ENV();
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: e.id ?? "",
      client_secret: e.secret ?? "",
      refresh_token: e.refresh ?? "",
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`google token ${res.status}`);
  const j = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache = { token: j.access_token, exp: Date.now() + j.expires_in * 1000 };
  return j.access_token;
}

async function api(path: string, init?: RequestInit) {
  const res = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`google ${path.split("?")[0]} ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

let calCache: { ids: string[]; at: number } | null = null;

/** Календарі, які Іван показує у себе (selected). Кеш 10 хв. */
async function calendarIds(): Promise<string[]> {
  if (calCache && Date.now() - calCache.at < 600_000) return calCache.ids;
  let ids = ["primary"];
  try {
    const j = (await api("/users/me/calendarList?minAccessRole=reader")) as { items?: { id: string; selected?: boolean }[] };
    const sel = (j.items ?? []).filter((c) => c.selected).map((c) => c.id);
    if (sel.length) ids = sel;
  } catch {}
  calCache = { ids, at: Date.now() };
  return ids;
}

export type Interval = { s: number; e: number };

/** Зайняті інтервали в Google Calendar (прозорі події, як-от свята, Google не повертає). */
export async function googleBusy(from: Date, to: Date): Promise<Interval[]> {
  if (fakeMode()) return [];
  const ids = await calendarIds();
  const j = (await api("/freeBusy", {
    method: "POST",
    body: JSON.stringify({ timeMin: from.toISOString(), timeMax: to.toISOString(), timeZone: TZ, items: ids.map((id) => ({ id })) }),
  })) as { calendars?: Record<string, { busy?: { start: string; end: string }[] }> };
  const out: Interval[] = [];
  for (const c of Object.values(j.calendars ?? {}))
    for (const b of c.busy ?? []) out.push({ s: Date.parse(b.start), e: Date.parse(b.end) });
  return out;
}

export type CreatedEvent = { link: string; meet: string };

export async function createEvent(p: {
  start: Date;
  end: Date;
  summary: string;
  description: string;
  email: string;
}): Promise<CreatedEvent> {
  if (fakeMode()) return { link: "https://calendar.google.com/", meet: "https://meet.google.com/fake-dev" };
  const j = (await api("/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all", {
    method: "POST",
    body: JSON.stringify({
      summary: p.summary,
      description: p.description,
      start: { dateTime: p.start.toISOString(), timeZone: TZ },
      end: { dateTime: p.end.toISOString(), timeZone: TZ },
      attendees: [{ email: p.email }],
      conferenceData: { createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: "hangoutsMeet" } } },
      reminders: { useDefault: true },
    }),
  })) as { htmlLink?: string; hangoutLink?: string };
  return { link: j.htmlLink ?? "", meet: j.hangoutLink ?? "" };
}
