import Section from "./Section";
import Container from "./Container";
import { programPain as P } from "@/lib/program-page";

/** Біль батьків: переписка, чек за 13 років, перехід до власної справи. Іде одразу після hero, до розповіді про автора. */
export default function PainBlock({ className = "" }: { className?: string }) {
  return (
    <Section spacing="block" className={`relative isolate overflow-hidden ${className}`} id="pain">
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-[var(--color-accent)]/[0.06] blur-3xl" aria-hidden />
      <Container>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Про що ця програма</p>
        <h2 className="ff-display mb-3 max-w-3xl text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-[1.06] tracking-tight">{P.h2}</h2>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)] sm:text-xl">{P.lead}</p>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
          {/* переписка */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{P.chatTitle}</p>
            <div className="rounded-[1.6rem] border border-white/15 bg-[#0b0b0c] p-4 shadow-[0_30px_70px_-35px_rgba(94,224,208,0.35)] sm:p-5">
              <ul className="flex flex-col gap-2.5">
                {P.chat.map((m, i) => (
                  <li key={i} className={`flex ${m.who === "teen" ? "justify-end" : "justify-start"}`}>
                    <span
                      className={`max-w-[82%] px-3.5 py-2 text-[15px] leading-snug ${
                        m.who === "teen"
                          ? "rounded-2xl rounded-br-md bg-[var(--color-accent)] font-medium text-[#06201c]"
                          : "rounded-2xl rounded-bl-md bg-white/10 text-[var(--color-foreground)]"
                      }`}
                    >
                      {m.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted-2)]">{P.chatNote}</p>
          </div>

          {/* тези + висновок */}
          <div>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {P.points.map((t, i) => (
                <li key={t} className="flex gap-4 py-4">
                  <span className="ff-display w-8 shrink-0 text-2xl font-extrabold leading-none text-[var(--color-accent)]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-base leading-snug sm:text-lg">{t}</p>
                </li>
              ))}
            </ul>
            <p className="ff-display mt-6 border-l-2 border-[var(--color-accent)] pl-5 text-lg font-bold leading-snug sm:text-xl">{P.verdict}</p>
          </div>
        </div>

        {/* чек */}
        <div className="mx-auto mt-14 max-w-2xl">
          <div className="relative border border-white/20 bg-[#101113] px-5 py-6 font-mono shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:px-8 sm:py-8">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-muted)]">{P.receipt.title}</p>
            {P.receipt.groups.map((g) => (
              <div key={g.name} className="mt-6">
                <p className="border-b border-dashed border-white/25 pb-2 text-sm font-bold text-[var(--color-foreground)]">{g.name}</p>
                <ul className="mt-2">
                  {g.rows.map(([a, f, s]) => (
                    <li key={a} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 py-1 text-[13px]">
                      <span>
                        {a}
                        <span className="block text-[11px] text-[var(--color-muted-2)] sm:ml-2 sm:inline">{f}</span>
                      </span>
                      <span className="tabular-nums">{s}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-1 flex items-baseline justify-between border-t border-dashed border-white/25 pt-2 text-sm font-bold">
                  <span>Підсумок</span>
                  <span className="tabular-nums">{g.total}</span>
                </p>
              </div>
            ))}
            <div className="mt-7 border-t-2 border-white/40 pt-4">
              <p className="flex items-baseline justify-between text-lg font-extrabold sm:text-xl">
                <span>{P.receipt.total[0]}</span>
                <span className="tabular-nums text-[var(--color-accent)]">{P.receipt.total[1]}</span>
              </p>
              <p className="mt-2 flex items-baseline justify-between text-sm text-[var(--color-muted)]">
                <span>{P.receipt.zero[0]}</span>
                <span className="ff-display text-3xl font-extrabold leading-none text-[#ff6f6f]">{P.receipt.zero[1]}</span>
              </p>
            </div>
          </div>
          <p className="mt-3 text-center text-xs leading-relaxed text-[var(--color-muted-2)]">{P.receipt.note}</p>
        </div>

        {/* перехід до власної справи */}
        <div className="mt-16">
          <h3 className="ff-display mb-3 max-w-3xl text-[clamp(1.5rem,4.2vw,2.3rem)] font-extrabold leading-[1.1] tracking-tight">{P.bridge.h3}</h3>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{P.bridge.lead}</p>
          <div className="grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2">
            {P.bridge.shifts.map((s) => (
              <div key={s.from} className="bg-[var(--color-background)] p-5">
                <p className="flex flex-wrap items-center gap-x-2 text-sm font-semibold">
                  <span className="text-[var(--color-muted)] line-through decoration-white/30">{s.from}</span>
                  <span className="text-[var(--color-accent)]" aria-hidden>→</span>
                  <span className="text-base font-extrabold text-[var(--color-foreground)]">{s.to}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
