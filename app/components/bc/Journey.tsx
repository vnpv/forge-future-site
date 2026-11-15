"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";

export type JourneyStep = { label: string; time: string; thumb: string; title: string; body: ReactNode; media: ReactNode };

/** Інтерактивний шлях команди: розкадровка з мініатюр, велике медіа кроку, «Далі / Назад». */
export default function Journey({ id, steps, team }: { id: string; steps: JourneyStep[]; team: string }) {
  const [i, setI] = useState(0);
  const top = useRef<HTMLDivElement>(null);
  const go = (n: number, scroll = false) => {
    setI(Math.max(0, Math.min(steps.length - 1, n)));
    if (scroll) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const s = steps[i];
  return (
    <div ref={top} className="scroll-mt-24">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-2)]">Пройдіть шлях команди {team}</p>
        <p className="ff-display shrink-0 whitespace-nowrap text-sm text-[var(--color-accent)]">крок {i + 1} з {steps.length}</p>
      </div>
      {/* Розкадровка */}
      <div role="tablist" aria-label={`Кроки команди ${team}`} className="mb-8 grid grid-cols-4 gap-1.5 sm:grid-cols-7 sm:gap-2">
        {steps.map((st, k) => {
          const on = k === i;
          return (
            <button
              key={st.label}
              id={`${id}-tab-${k}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${id}-panel`}
              onClick={() => go(k)}
              className="group text-left"
            >
              <span className={`relative block overflow-hidden border-2 transition-colors ${on ? "border-[var(--color-accent)]" : "border-transparent"} aspect-[4/3]`}>
                <Image src={st.thumb} alt="" fill sizes="(min-width: 640px) 14vw, 25vw" className={`object-cover transition duration-300 ${on ? "" : "opacity-45 grayscale group-hover:opacity-80 group-hover:grayscale-0"}`} />
                <span className={`ff-display absolute left-0 top-0 px-1.5 py-0.5 text-xs font-extrabold ${on ? "bg-[var(--color-accent)] text-black" : "bg-black/70 text-white"}`}>{k + 1}</span>
              </span>
              <span className={`mt-1.5 block truncate text-xs font-semibold leading-tight ${on ? "text-[var(--color-foreground)]" : "text-[var(--color-muted-2)]"}`}>{st.label}</span>
            </button>
          );
        })}
      </div>
      {/* Кадр */}
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${i}`} key={i} className="ff-journey-in grid items-start gap-8 md:grid-cols-[1fr_1fr] md:gap-12">
        <div className="min-w-0">{s.media}</div>
        <div className="min-w-0 md:pt-2">
          <p className="ff-display mb-3 inline-block bg-white/[0.06] px-2.5 py-1 text-sm font-bold text-[var(--color-accent)]">{s.time}</p>
          <h3 className="ff-display mb-5 text-[clamp(1.5rem,3.6vw,2.2rem)] font-extrabold leading-[1.08] tracking-tight">{s.title}</h3>
          <div className="space-y-5 text-base leading-relaxed text-[var(--color-muted)] [&_b]:text-[var(--color-foreground)]">{s.body}</div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {i > 0 ? (
              <button type="button" onClick={() => go(i - 1, true)} className="border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:border-white/50">
                ← Назад
              </button>
            ) : null}
            {i < steps.length - 1 ? (
              <button type="button" onClick={() => go(i + 1, true)} className="ff-cta !py-3">
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
