"use client";

import { useRef, useState, type ReactNode } from "react";

export type JourneyStep = { label: string; time?: string; title: string; body: ReactNode; media: ReactNode };

/** Інтерактивне проходження шляху команди: вкладки-кроки, прогрес, «Далі / Назад». */
export default function Journey({ id, steps, team }: { id: string; steps: JourneyStep[]; team: string }) {
  const [i, setI] = useState(0);
  const top = useRef<HTMLDivElement>(null);
  const go = (n: number, scroll = false) => {
    const k = Math.max(0, Math.min(steps.length - 1, n));
    setI(k);
    if (scroll) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const s = steps[i];
  return (
    <div ref={top} className="scroll-mt-20">
      {/* Прогрес */}
      <div className="mb-3 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">
        <span>Шлях команди {team}</span>
        <span className="ff-display text-[var(--color-accent)]">{i + 1} / {steps.length}</span>
      </div>
      <div className="mb-4 h-1 w-full bg-white/10">
        <div className="h-full bg-[var(--color-accent)] transition-[width] duration-300" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
      </div>
      {/* Вкладки */}
      <div role="tablist" aria-label={`Кроки команди ${team}`} className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {steps.map((st, k) => (
          <button
            key={st.label}
            id={`${id}-tab-${k}`}
            role="tab"
            type="button"
            aria-selected={k === i}
            aria-controls={`${id}-panel`}
            onClick={() => go(k)}
            className={`flex shrink-0 items-center gap-2 border px-3 py-2 text-left text-sm font-semibold transition-colors ${
              k === i
                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-black"
                : k < i
                  ? "border-[var(--color-accent)]/40 text-[var(--color-foreground)] hover:border-[var(--color-accent)]"
                  : "border-white/15 text-[var(--color-muted)] hover:border-white/40"
            }`}
          >
            <span className="ff-display text-base font-extrabold">{k + 1}</span>
            <span className="whitespace-nowrap">{st.label}</span>
          </button>
        ))}
      </div>
      {/* Панель */}
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${i}`} key={i} className="ff-journey-in grid items-start gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-12">
        <div className="min-w-0">{s.media}</div>
        <div className="min-w-0">
          {s.time ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">{s.time}</p> : null}
          <h3 className="ff-display mb-5 text-[clamp(1.4rem,3.6vw,2rem)] font-extrabold leading-[1.1] tracking-tight">{s.title}</h3>
          <div className="space-y-4 text-base leading-relaxed text-[var(--color-muted)] [&_b]:text-[var(--color-foreground)]">{s.body}</div>
          <div className="mt-8 flex items-center gap-3">
            <button type="button" onClick={() => go(i - 1, true)} disabled={i === 0} className="border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:border-white/50 disabled:opacity-30">
              ← Назад
            </button>
            {i < steps.length - 1 ? (
              <button type="button" onClick={() => go(i + 1, true)} className="ff-cta !min-h-0 !py-3">
                Далі: {steps[i + 1].label} →
              </button>
            ) : (
              <span className="text-sm font-semibold text-[var(--color-accent)]">Ви пройшли весь шлях команди ✓</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
