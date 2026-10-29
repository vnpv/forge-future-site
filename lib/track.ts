import { listPaths, readText, writeText } from "@/app/focus/store";

/**
 * Воронка Mini App: один файл на людину (track/u/<id>.json), пишемо лише коли етап зріс.
 * Етапи: 0 відкрив, 1-4 дійшов до питання, 5 побачив результат, 6 відкрив «Детальніше про програму», 7 записався.
 * Без перезапису одного спільного файлу: немає гонок і економимо ліміт записів Blob.
 */
export const STAGES = ["Відкрили", "Питання 1", "Питання 2", "Питання 3", "Питання 4", "Результат", "Відкрили програму", "Записались"];

export type TrackRec = { uid: string; ref: string; tg: boolean; first: string; last: string; stage: number };

const path = (uid: string) => `track/u/${uid}.json`;

export async function saveStage(p: { uid: string; ref: string; tg: boolean; stage: number }) {
  const now = new Date().toISOString();
  const raw = await readText(path(p.uid), true).catch(() => null);
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
  await writeText(path(p.uid), JSON.stringify(rec), "application/json");
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
