import Link from "next/link";
import { hackathonStrip } from "@/lib/hackathons";

/** Смуга хакатонів (перенесено з hero /program на головну). */
export default function HackathonStrip() {
  return (
    <div className="max-w-3xl">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              <span className="h-px w-6 bg-[var(--color-accent)]" aria-hidden />
              Хакатони перед стартом: приходьте протестувати формат
            </p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {hackathonStrip.map((h) => {
                const inner = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--color-accent)]/40 text-[var(--color-accent)] sm:mb-4">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="ff-display block text-xl font-extrabold leading-none sm:text-2xl">{h.when}</span>
                      <span className="mt-1.5 block text-sm text-[var(--color-muted)]">
                        {h.city} <span className="text-[11px] uppercase tracking-wide text-[var(--color-muted-2)]">· {h.tag}</span>
                      </span>
                    </span>
                    <span className={`text-sm font-semibold sm:mt-4 sm:block ${h.href ? "text-[var(--color-accent)]" : "text-[var(--color-muted-2)]"}`}>
                      {h.href ? (<><span className="hidden sm:inline">Деталі й запис </span>→</>) : (<span className="hidden sm:inline">Пілотний формат</span>)}
                    </span>
                  </>
                );
                const cls = "flex h-full items-center gap-4 border p-4 transition-colors sm:flex-col sm:items-stretch sm:gap-0";
                return (
                  <li key={h.when}>
                    {h.href ? (
                      <Link href={h.href} className={`${cls} border-white/20 bg-white/[0.03] hover:border-[var(--color-accent)] hover:bg-white/[0.06]`}>{inner}</Link>
                    ) : (
                      <div className={`${cls} border-white/10`}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
  );
}
