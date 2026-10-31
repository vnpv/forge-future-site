import type { Metadata } from "next";
import { readText } from "@/app/focus/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Міні-курс: панель", robots: { index: false, follow: false } };

type Msg = { who: "p" | "i"; text: string; ts: string };
type U = {
  id: number;
  name: string;
  username: string;
  channel: string;
  status: string;
  day: number;
  paid: boolean;
  done: number[];
  first_seen: string;
  last_activity: string;
  wants_to_pay: boolean;
  answers: { n: number; text: string }[];
  prep_note: string;
  feedback: { day: number; text: string }[];
  thread: Msg[];
  attention: string;
};
type Snap = { ts: string; users: U[] };

const fmt = (iso: string) =>
  iso ? new Date(iso).toLocaleString("uk-UA", { timeZone: "Europe/Kyiv", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";

export default async function McAdmin({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  const { k } = await searchParams;
  const secret = process.env.BUSY_PUSH_SECRET;
  if (!secret || k !== secret) return <main style={{ padding: 24 }}>Немає доступу</main>;

  const raw = await readText("mcadmin/snapshot.json", true).catch(() => null);
  if (!raw) return <main style={{ padding: 24, fontFamily: "system-ui", color: "#eee", background: "#111214", minHeight: "100vh" }}>Даних ще немає: бот надішле знімок протягом хвилини після запуску.</main>;
  const snap = JSON.parse(raw) as Snap;
  const users = [...snap.users].sort((a, b) => (b.last_activity || "").localeCompare(a.last_activity || ""));
  const total = users.length;
  const paid = users.filter((u) => u.paid);
  const funnel = [
    ["Усього лідів", total],
    ["Відкрили оплату", users.filter((u) => u.wants_to_pay || u.paid).length],
    ["Оплатили", paid.length],
    ["День 1 і далі", paid.filter((u) => u.day >= 1).length],
    ["Дійшли до 5-го дня", paid.filter((u) => u.day >= 5).length],
  ] as const;
  const attention = users.filter((u) => u.attention);

  const card = { background: "#1a1b1e", border: "1px solid #2a2a2a", borderRadius: 8, padding: 12, marginBottom: 12 } as const;
  const muted = { color: "#9aa0a6", fontSize: 13 } as const;

  return (
    <main style={{ padding: 16, fontFamily: "system-ui", color: "#eee", background: "#111214", minHeight: "100vh", fontSize: 14, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 20, marginBottom: 2 }}>Міні-курс: панель</h1>
      <p style={{ ...muted, marginBottom: 16 }}>Оновлено {fmt(snap.ts)} (Київ). Відповідати батькам: реплаєм у Telegram на їхнє повідомлення.</p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {funnel.map(([label, n]) => (
          <div key={label} style={{ ...card, marginBottom: 0, flex: "1 1 130px", textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{n}</div>
            <div style={muted}>{label}</div>
          </div>
        ))}
      </div>

      {attention.length > 0 && (
        <section style={{ ...card, borderColor: "#b45309" }}>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Потрібна увага ({attention.length})</h2>
          {attention.map((u) => (
            <div key={u.id} style={{ marginBottom: 6 }}>
              <b>{u.name || "—"}</b> {u.username && <span style={muted}>@{u.username}</span>}: {u.attention}
            </div>
          ))}
        </section>
      )}

      <h2 style={{ fontSize: 16, margin: "8px 0" }}>Усі люди ({total})</h2>
      {users.map((u) => (
        <details key={u.id} style={card}>
          <summary style={{ cursor: "pointer", listStyle: "none" }}>
            <b>{u.name || "—"}</b> {u.username && <span style={muted}>@{u.username}</span>}
            <span style={{ ...muted, marginLeft: 8 }}>{u.status}</span>
            {u.attention && <span style={{ color: "#f59e0b", marginLeft: 8 }}>⚠ {u.attention}</span>}
            <div style={muted}>канал {u.channel || "—"} · остання активність {fmt(u.last_activity)}</div>
          </summary>
          <div style={{ marginTop: 10 }}>
            <div style={muted}>id {u.id} · перший захід {fmt(u.first_seen)}{u.paid ? ` · зроблено днів: ${u.done.filter((d) => d >= 1).length}` : ""}</div>
            {u.answers.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <b>Відповіді на 5 питань</b>
                <ol style={{ margin: "4px 0 0 18px" }}>{u.answers.map((a) => <li key={a.n}>{a.text}</li>)}</ol>
              </div>
            )}
            {u.prep_note && <p style={{ marginTop: 8 }}><b>Підготовка:</b> {u.prep_note}</p>}
            {u.feedback.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <b>Відгуки по днях</b>
                {u.feedback.map((f, i) => <div key={i}>день {f.day}: {f.text}</div>)}
              </div>
            )}
            {u.thread.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <b>Переписка</b>
                {u.thread.map((m, i) => (
                  <div key={i} style={{ margin: "4px 0", padding: "6px 8px", borderRadius: 6, background: m.who === "p" ? "#23262b" : "#1c3b2a" }}>
                    <span style={muted}>{m.who === "p" ? "Батько/мама" : "Іван"} · {fmt(m.ts)}</span>
                    <div>{m.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </details>
      ))}
    </main>
  );
}
