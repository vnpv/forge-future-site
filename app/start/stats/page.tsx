import type { Metadata } from "next";
import { allRecords, STAGES } from "@/lib/track";
import { partnerLabel } from "@/lib/booking/telegram";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Статистика", robots: { index: false, follow: false } };

const CHANNELS = /^(ig|rl|yt|tg|web)/;

/** Приватна сторінка Івана: воронка по партнерах і каналах. Доступ за секретом в адресі (?k=). */
export default async function Stats({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  const { k } = await searchParams;
  const secret = process.env.BUSY_PUSH_SECRET;
  if (!secret || k !== secret) return <main style={{ padding: 24 }}>Немає доступу</main>;

  const recs = await allRecords();
  const groups = new Map<string, number[]>();
  for (const r of recs) {
    const key = r.ref || "(без реф)";
    const arr = groups.get(key) ?? [];
    arr.push(r.stage);
    groups.set(key, arr);
  }
  const rows = await Promise.all(
    [...groups.entries()].map(async ([ref, stages]) => ({
      ref,
      label: /^\d{5,12}$/.test(ref) ? await partnerLabel(ref) : CHANNELS.test(ref) ? `Канал ${ref}` : ref,
      counts: STAGES.map((_, i) => stages.filter((s) => s >= i).length),
    })),
  );
  rows.sort((a, b) => b.counts[0] - a.counts[0]);
  const total = STAGES.map((_, i) => recs.filter((r) => r.stage >= i).length);

  const th = { padding: "6px 8px", textAlign: "right" as const, borderBottom: "1px solid #444", fontWeight: 600, whiteSpace: "nowrap" as const };
  const td = { padding: "6px 8px", textAlign: "right" as const, borderBottom: "1px solid #2a2a2a" };
  const pct = (n: number, base: number) => (base ? ` (${Math.round((n / base) * 100)}%)` : "");

  return (
    <main style={{ padding: 16, fontFamily: "system-ui", color: "#eee", background: "#111214", minHeight: "100vh", fontSize: 14 }}>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Воронка Mini App</h1>
      <p style={{ color: "#999", marginBottom: 16 }}>
        Унікальні люди, які дійшли щонайменше до кроку. У дужках частка від відкривших. «Повідомлень відправлено» Telegram не повідомляє.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", minWidth: 640 }}>
          <thead>
            <tr>
              <th style={{ ...th, textAlign: "left" }}>Хто / канал</th>
              {STAGES.map((s) => (
                <th key={s} style={th}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.ref}>
                <td style={{ ...td, textAlign: "left" }}>{r.label}</td>
                {r.counts.map((c, i) => (
                  <td key={i} style={td}>{c}{i ? pct(c, r.counts[0]) : ""}</td>
                ))}
              </tr>
            ))}
            <tr style={{ fontWeight: 700 }}>
              <td style={{ ...td, textAlign: "left" }}>Усього</td>
              {total.map((c, i) => (
                <td key={i} style={td}>{c}{i ? pct(c, total[0]) : ""}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
