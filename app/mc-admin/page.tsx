import type { Metadata } from "next";
import { readText } from "@/app/focus/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Міні-курс: панель", robots: { index: false, follow: false } };

type Msg = { who: "p" | "i"; text: string; ts: string };
type Line = { d: "in" | "out"; t: string; ts: string };
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
  started: boolean;
  free_done: boolean;
  answers: { n: number; text: string }[];
  prep_note: string;
  feedback: { day: number; text: string }[];
  thread: Msg[];
  attention: string;
  chat: Line[];
};
type Snap = { ts: string; users: U[] };

const fmt = (iso: string) =>
  iso ? new Date(iso).toLocaleString("uk-UA", { timeZone: "Europe/Kyiv", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";

/** Етапи воронки: кожен клікабельний, веде до списку людей на цьому етапі. */
const STAGES: { id: string; label: string; test: (u: U) => boolean }[] = [
  { id: "all", label: "Усі ліди", test: () => true },
  { id: "started", label: "Почали питання", test: (u) => u.started },
  { id: "qdone", label: "Пройшли питання", test: (u) => u.free_done },
  { id: "pay", label: "Відкрили оплату", test: (u) => u.wants_to_pay || u.paid },
  { id: "paid", label: "Оплатили", test: (u) => u.paid },
  { id: "d1", label: "День 1", test: (u) => u.paid && u.day >= 1 },
  { id: "d2", label: "День 2", test: (u) => u.paid && u.day >= 2 },
  { id: "d3", label: "День 3", test: (u) => u.paid && u.day >= 3 },
  { id: "d4", label: "День 4", test: (u) => u.paid && u.day >= 4 },
  { id: "d5", label: "День 5", test: (u) => u.paid && u.day >= 5 },
  { id: "attn", label: "Потрібна увага", test: (u) => Boolean(u.attention) },
];

const box = { background: "#1a1b1e", border: "1px solid #2a2a2a", borderRadius: 8, padding: 12 } as const;
const muted = { color: "#9aa0a6", fontSize: 13 } as const;
const link = { color: "#6bc85b", textDecoration: "none" } as const;

export default async function McAdmin({ searchParams }: { searchParams: Promise<{ k?: string; stage?: string; u?: string; ch?: string }> }) {
  const { k, stage = "all", u: uid, ch } = await searchParams;
  const secret = process.env.BUSY_PUSH_SECRET;
  if (!secret || k !== secret) return <main style={{ padding: 24 }}>Немає доступу</main>;

  const shell = (children: React.ReactNode) => (
    <main style={{ padding: 16, fontFamily: "system-ui", color: "#eee", background: "#111214", minHeight: "100vh", fontSize: 14, maxWidth: 900, margin: "0 auto" }}>{children}</main>
  );
  const raw = await readText("mcadmin/snapshot.json", true).catch(() => null);
  if (!raw) return shell("Даних ще немає: бот надішле знімок протягом хвилини після запуску.");
  const snap = JSON.parse(raw) as Snap;
  const base = `/mc-admin?k=${encodeURIComponent(k)}`;

  // ── Сторінка людини: повний чат ──
  if (uid) {
    const u = snap.users.find((x) => String(x.id) === uid);
    if (!u) return shell(<a href={base} style={link}>← назад</a>);
    // Єдина лента: чат бота + переписка з куратором (відповіді Івана)
    const chat = [
      ...u.chat.map((m) => ({ who: m.d === "in" ? "p" : "bot", text: m.t, ts: m.ts })),
      ...u.thread.filter((m) => m.who === "i").map((m) => ({ who: "i", text: m.text, ts: m.ts })),
    ].sort((a, b) => a.ts.localeCompare(b.ts));
    const col = { p: "#23262b", bot: "#1a1b1e", i: "#1c3b2a" } as const;
    const name = { p: "Батько/мама", bot: "Бот", i: "Іван" } as const;
    return shell(
      <>
        <a href={`${base}&stage=${stage}`} style={link}>← до списку</a>
        <h1 style={{ fontSize: 20, margin: "8px 0 2px" }}>{u.name || "—"} {u.username && <span style={muted}>@{u.username}</span>}</h1>
        <p style={muted}>{u.status} · канал {u.channel || "—"} · id {u.id}</p>
        {u.attention && <p style={{ color: "#f59e0b" }}>⚠ {u.attention}</p>}
        <div style={{ ...box, margin: "12px 0" }}>
          {u.answers.length > 0 && (
            <>
              <b>Відповіді на 5 питань</b>
              <ol style={{ margin: "4px 0 8px 18px" }}>{u.answers.map((a) => <li key={a.n}>{a.text}</li>)}</ol>
            </>
          )}
          {u.prep_note && <p><b>Підготовка:</b> {u.prep_note}</p>}
          {u.feedback.map((f, i) => <div key={i}><b>День {f.day}:</b> {f.text}</div>)}
          {u.answers.length === 0 && !u.prep_note && u.feedback.length === 0 && <span style={muted}>Поки нічого не відповідав(ла).</span>}
        </div>
        <h2 style={{ fontSize: 16, margin: "12px 0 8px" }}>Чат ({chat.length})</h2>
        {chat.length === 0 && <p style={muted}>Журнал чату почав вестись пізно ввечері 31.10, для старих заходів повідомлень немає.</p>}
        {chat.map((m, i) => {
          const w = m.who as "p" | "bot" | "i";
          return (
            <div key={i} style={{ margin: "4px 0", padding: "6px 10px", borderRadius: 8, background: col[w], marginLeft: w === "p" ? 40 : 0, marginRight: w === "p" ? 0 : 40 }}>
              <span style={muted}>{name[w]} · {fmt(m.ts)}</span>
              <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
            </div>
          );
        })}
        <p style={{ ...muted, marginTop: 16 }}>Відповісти: реплаєм у Telegram на повідомлення від цієї людини.</p>
      </>,
    );
  }

  // ── Список за етапом ──
  const cur = STAGES.find((s) => s.id === stage) ?? STAGES[0];
  const channels = [...new Set(snap.users.map((x) => x.channel || "—"))];
  const inStage = snap.users.filter((x) => cur.test(x) && (!ch || (x.channel || "—") === ch));
  inStage.sort((a, b) => (b.last_activity || "").localeCompare(a.last_activity || ""));
  const count = (s: (typeof STAGES)[number]) => snap.users.filter((x) => s.test(x) && (!ch || (x.channel || "—") === ch)).length;
  const q = (extra: string) => `${base}${extra}`;

  return shell(
    <>
      <h1 style={{ fontSize: 20, marginBottom: 2 }}>Міні-курс: панель</h1>
      <p style={{ ...muted, marginBottom: 12 }}>Оновлено {fmt(snap.ts)} (Київ). Натисни етап, щоб побачити людей, потім людину, щоб відкрити її чат.</p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        <a href={q(`&stage=${stage}`)} style={{ ...link, padding: "4px 10px", border: `1px solid ${!ch ? "#6bc85b" : "#333"}`, borderRadius: 14 }}>Усі канали</a>
        {channels.map((c) => (
          <a key={c} href={q(`&stage=${stage}&ch=${encodeURIComponent(c)}`)} style={{ ...link, padding: "4px 10px", border: `1px solid ${ch === c ? "#6bc85b" : "#333"}`, borderRadius: 14 }}>{c}</a>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 8, marginBottom: 16 }}>
        {STAGES.map((s) => {
          const on = s.id === cur.id;
          const n = count(s);
          return (
            <a key={s.id} href={q(`&stage=${s.id}${ch ? `&ch=${encodeURIComponent(ch)}` : ""}`)} style={{ ...box, textAlign: "center", textDecoration: "none", color: "#eee", borderColor: on ? "#6bc85b" : s.id === "attn" && n > 0 ? "#b45309" : "#2a2a2a" }}>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{n}</div>
              <div style={muted}>{s.label}</div>
            </a>
          );
        })}
      </div>

      <h2 style={{ fontSize: 16, margin: "8px 0" }}>{cur.label}{ch ? ` · ${ch}` : ""}: {inStage.length}</h2>
      {inStage.length === 0 && <p style={muted}>Нікого на цьому етапі.</p>}
      {inStage.map((x) => (
        <a key={x.id} href={q(`&u=${x.id}&stage=${stage}${ch ? `&ch=${encodeURIComponent(ch)}` : ""}`)} style={{ ...box, display: "block", marginBottom: 8, textDecoration: "none", color: "#eee" }}>
          <b>{x.name || "—"}</b> {x.username && <span style={muted}>@{x.username}</span>}
          {x.attention && <span style={{ color: "#f59e0b", marginLeft: 8 }}>⚠ {x.attention}</span>}
          <div style={muted}>{x.status}</div>
          <div style={muted}>канал {x.channel || "—"} · остання активність {fmt(x.last_activity)} · повідомлень {x.chat.length}</div>
        </a>
      ))}
    </>,
  );
}
