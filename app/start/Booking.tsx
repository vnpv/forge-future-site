"use client";

import { useEffect, useState } from "react";

const WD = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];

function dayLabel(date: string) {
  const d = new Date(`${date}T12:00:00Z`);
  const [, m, dd] = date.split("-");
  return { wd: WD[d.getUTCDay()], num: `${dd}.${m}` };
}

type Props = {
  days: Record<string, string[]>;
  ageLabel: string;
  ref_: string;
  code: string;
  initData: string;
  onBooked: (label: string, meet: string) => void;
};

/** Вибір дня й часу, ім'я дитини, email. Запис створює подію в Google Calendar Івана з запрошенням на email. */
export default function Booking({ days, ageLabel, ref_, code, initData, onBooked }: Props) {
  const dates = Object.keys(days);
  const [date, setDate] = useState(dates[0] ?? "");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  // слоти оновилися (хтось скасував або зайняв): не тримаємо вибір, якого вже немає
  useEffect(() => {
    if (date && !days[date]) setDate(Object.keys(days)[0] ?? "");
    else if (time && !(days[date] ?? []).includes(time)) setTime("");
  }, [days]); // eslint-disable-line react-hooks/exhaustive-deps

  const valid = date && time && name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  async function submit() {
    if (!valid || busy) return;
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, name, email, age: ageLabel, ref: ref_, code, initData }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) return onBooked(j.label, j.meet ?? "");
      if (res.status === 409) {
        setErr("Цей час щойно зайняли. Оберіть інший.");
        setTime("");
        const s = await fetch("/api/slots").then((r) => r.json()).catch(() => null);
        if (s?.days?.[date]) days[date] = s.days[date];
      } else setErr("Не вдалося записати. Спробуйте ще раз за хвилину.");
    } catch {
      setErr("Немає зв'язку. Спробуйте ще раз.");
    } finally {
      setBusy(false);
    }
  }

  const field =
    "w-full border border-white/20 bg-[var(--color-background)] px-4 py-3 text-base outline-none focus:border-[var(--color-accent)]";

  return (
    <div id="booking">
      <p className="mb-3 text-sm text-[var(--color-muted)]">Оберіть день (час київський):</p>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {dates.map((d) => {
          const l = dayLabel(d);
          return (
            <button
              key={d}
              onClick={() => {
                setDate(d);
                setTime("");
              }}
              className={`shrink-0 border px-3 py-2 text-center text-sm ${d === date ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10" : "border-white/20"}`}
            >
              <div className="font-bold">{l.wd}</div>
              <div className="text-[var(--color-muted)]">{l.num}</div>
            </button>
          );
        })}
      </div>

      <div className="mb-5 grid grid-cols-4 gap-2">
        {(days[date] ?? []).map((t) => (
          <button
            key={t}
            onClick={() => setTime(t)}
            className={`border py-2 text-sm ${t === time ? "border-[var(--color-accent)] bg-[var(--color-accent)] font-bold text-[#06200f]" : "border-white/20"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <label className="mb-1 block text-sm text-[var(--color-muted)]">Ім'я дитини</label>
      <input className={`${field} mb-3`} value={name} onChange={(e) => setName(e.target.value)} maxLength={40} autoComplete="off" />
      <label className="mb-1 block text-sm text-[var(--color-muted)]">Ваш email (надішлю запрошення в календар)</label>
      <input
        className={`${field} mb-4`}
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={120}
      />
      {err && <p className="mb-3 text-sm text-red-400">{err}</p>}
      <button className="ff-cta w-full disabled:opacity-40" disabled={!valid || busy} onClick={submit}>
        {busy ? "Записую…" : time ? `Підтвердити: ${dayLabel(date).num} о ${time}` : "Оберіть час"}
      </button>
    </div>
  );
}
