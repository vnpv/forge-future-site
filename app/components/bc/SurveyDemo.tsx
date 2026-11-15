"use client";

import { useState } from "react";

/**
 * Демо опитування «Balenciaga»: людина відповідає сама, потім бачить перші 6 відповідей з форми команди (14.11).
 * Нічого не надсилається: це копія питань для перегляду, справжня форма — за посиланням.
 */
const QS = [
  { q: "Чи кричав учитель на вас під час уроку?", opts: [["Так", 5], ["Ні", 1]] },
  { q: "Чи було тобі цікаво на уроці?", opts: [["Так, дуже!", 3], ["Було нормально", 2], ["Ні, було нудно", 1]] },
  { q: "Чи все було тобі зрозуміло на уроці?", opts: [["Так, усе зрозуміло", 3], ["Дещо було незрозуміло", 3], ["Ні, багато чого не зрозумів / не зрозуміла", 0]] },
] as const;

export default function SurveyDemo({ formUrl }: { formUrl: string }) {
  const [a, setA] = useState<(number | null)[]>([null, null, null]);
  const [show, setShow] = useState(false);
  const done = a.every((x) => x !== null);
  return (
    <div className="border border-white/15 bg-white/[0.03] p-5 sm:p-7">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Опитування «Як пройшов урок»</p>
      <p className="mb-6 text-sm text-[var(--color-muted)]">Згадайте свій останній урок і дайте відповідь. Потім побачите, що відповіли перші 6 учнів.</p>
      <ol className="space-y-6">
        {QS.map((item, qi) => {
          const total = item.opts.reduce((s, [, n]) => s + n, 0) + (show && a[qi] !== null ? 1 : 0);
          return (
            <li key={item.q}>
              <p className="mb-3 font-bold leading-snug">{qi + 1}. {item.q}</p>
              <div className="grid gap-2">
                {item.opts.map(([label, n], oi) => {
                  const mine = a[qi] === oi;
                  const count = n + (show && mine ? 1 : 0);
                  const pct = total ? Math.round((count / total) * 100) : 0;
                  return (
                    <button
                      key={label}
                      type="button"
                      disabled={show}
                      onClick={() => setA((p) => p.map((x, k) => (k === qi ? oi : x)))}
                      aria-pressed={mine}
                      className={`relative overflow-hidden border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                        mine ? "border-[var(--color-accent)]" : "border-white/15 hover:border-white/40"
                      } disabled:cursor-default`}
                    >
                      {show ? <span className="absolute inset-y-0 left-0 bg-[var(--color-accent)]/20 transition-[width] duration-700" style={{ width: `${pct}%` }} aria-hidden /> : null}
                      <span className="relative flex items-center justify-between gap-3">
                        <span>{label}</span>
                        {show ? <span className="ff-display shrink-0 text-base">{n}{mine ? <span className="text-[var(--color-accent)]"> + ви</span> : null} <span className="text-xs text-[var(--color-muted-2)]">· {pct}%</span></span> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        {!show ? (
          <button type="button" disabled={!done} onClick={() => setShow(true)} className="ff-cta !min-h-0 !py-3 disabled:opacity-40">
            {done ? "Порівняти з відповідями учнів" : "Дайте відповідь на 3 питання"}
          </button>
        ) : (
          <button type="button" onClick={() => { setA([null, null, null]); setShow(false); }} className="border border-white/20 px-4 py-3 text-sm font-semibold hover:border-white/50">
            Пройти ще раз
          </button>
        )}
        <a href={formUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline">
          Справжня форма команди ↗
        </a>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-[var(--color-muted-2)]">
        Цифри: перші 6 відповідей у формі команди 14.11. Це перевірка інструмента, статистикою по школах їх не вважаємо. Ваша відповідь тут нікуди не надсилається.
      </p>
    </div>
  );
}
