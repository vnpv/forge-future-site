import { listPaths, readText, writeText } from "@/app/focus/store";

/**
 * Воронка Mini App: один файл на людину (track/u/<id>.json), пишемо лише коли етап зріс.
 * Етапи: 0 відкрив, 1-4 дійшов до питання, 5 побачив результат, 6 відкрив «Детальніше про програму», 7 записався.
 * Без перезапису одного спільного файлу: немає гонок і економимо ліміт записів Blob.
 */
export const STAGES = ["Відкрили", "Питання 1", "Питання 2", "Питання 3", "Питання 4", "Результат", "Відкрили програму", "Записались"];

export type TrackRec = { uid: string; ref: string; tg: boolean; first: string; last: string; stage: number };

/** Ключ: людина + реф. Та сама людина через інший лінк (інший партнер) рахується окремо; повторні кроки по тому ж лінку лише підвищують етап. */
const path = (uid: string, ref: string) => `track/u/${uid}_${ref || "x"}.json`;

export async function saveStage(p: { uid: string; ref: string; tg: boolean; stage: number }) {
  const now = new Date().toISOString();
  const raw = await readText(path(p.uid, p.ref), true).catch(() => null);
  let rec: TrackRec = { uid: p.uid, ref: p.ref, tg: p.tg, first: now, last: now, stage: -1 };
  if (raw) {
    try {
      rec = JSON.parse(raw) as TrackRec;
    } catch {}
  }
  if (rec.stage >= p.stage) return false;
  rec.stage = p.stage;
  rec.last = now;
  if (!rec.ref && p.ref) rec.ref = p.ref;
  rec.tg = rec.tg || p.tg;
  await writeText(path(p.uid, p.ref), JSON.stringify(rec), "application/json");
  return true;
}

export async function allRecords(): Promise<TrackRec[]> {
  const paths = await listPaths("track/u/");
  const recs = await Promise.all(
    paths.map(async (p) => {
      try {
        return JSON.parse((await readText(p, false, 60_000)) ?? "") as TrackRec;
      } catch {
        return null;
      }
    }),
  );
  return recs.filter((r): r is TrackRec => !!r);
}

export type StatRow = { ref: string; counts: number[]; last: string; new24: number };

/** Зведення по ref: скільки людей дійшло до кожного етапу, остання активність, нових за 24 год. */
export function summarize(recs: TrackRec[], now = Date.now()): StatRow[] {
  const g = new Map<string, TrackRec[]>();
  // партнер, що відкрив власний лінк, це тест: окремий кошик, не в підсумку
  for (const r of recs) {
    const key = r.uid === r.ref ? "(тест)" : r.ref || "";
    g.set(key, [...(g.get(key) ?? []), r]);
  }
  return [...g.entries()].map(([ref, rs]) => ({
    ref,
    counts: STAGES.map((_, i) => rs.filter((r) => r.stage >= i).length),
    last: rs.reduce((m, r) => (r.last > m ? r.last : m), ""),
    new24: rs.filter((r) => now - Date.parse(r.first) < 86_400_000).length,
  }));
}

/** Натискання на партнерський лінк forge-future.com/s/<ref>: один файл на реф, лічильник за добами (Kyiv не критично, UTC). */
export type ClickRec = { total: number; days: Record<string, number>; last: string };
const clickPath = (ref: string) => `track/c/${ref}.json`;

export async function countClick(ref: string) {
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  let rec: ClickRec = { total: 0, days: {}, last: "" };
  const raw = await readText(clickPath(ref), true).catch(() => null);
  if (raw) {
    try {
      rec = JSON.parse(raw) as ClickRec;
    } catch {}
  }
  rec.total += 1;
  rec.days[day] = (rec.days[day] ?? 0) + 1;
  rec.last = now.toISOString();
  await writeText(clickPath(ref), JSON.stringify(rec), "application/json");
}

export async function allClicks(): Promise<Record<string, { total: number; today: number; last: string }>> {
  const paths = await listPaths("track/c/");
  const day = new Date().toISOString().slice(0, 10);
  const out: Record<string, { total: number; today: number; last: string }> = {};
  await Promise.all(
    paths.map(async (p) => {
      try {
        const r = JSON.parse((await readText(p, false, 60_000)) ?? "") as ClickRec;
        const ref = p.split("/").pop()!.replace(".json", "");
        out[ref] = { total: r.total, today: r.days[day] ?? 0, last: r.last };
      } catch {}
    }),
  );
  return out;
}
