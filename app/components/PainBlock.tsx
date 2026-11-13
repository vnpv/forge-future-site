import Section from "./Section";
import Container from "./Container";
import { programPain as P } from "@/lib/program-page";

/** Біль батьків відкриває сторінку: переписка і чек поруч, коротко тези, перехід до власної справи. */
export default function PainBlock({ className = "" }: { className?: string }) {
  return (
    <Section spacing="hero" className={`relative isolate overflow-hidden ${className}`} id="pain">
      <div className="pointer-events-none absolute -left-40 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-[var(--color-accent)]/[0.07] blur-3xl" aria-hidden />
      <Container>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Для батьків підлітків 14–19</p>
        <h2 className="ff-display mb-2 max-w-3xl text-[clamp(2rem,6vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight">{P.h2}</h2>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)] sm:text-xl">{P.lead}</p>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          {/* переписка */}
          <div>
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{P.chatTitle}</p>
            <div className="rounded-[1.4rem] border border-white/15 bg-[#0b0b0c] p-4 shadow-[0_30px_70px_-35px_rgba(94,224,208,0.35)]">
              <ul className="flex flex-col gap-2">
                {P.chat.map((m, i) => (
                  <li key={i} className={`flex ${m.who === "teen" ? "justify-end" : "justify-start"}`}>
                    <span
                      className={`max-w-[84%] px-3.5 py-1.5 text-[15px] leading-snug ${
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
            <p className="mt-2.5 text-xs leading-relaxed text-[var(--color-muted-2)]">{P.chatNote}</p>
          </div>

          {/* чек */}
          <div>
            <div className="border border-white/20 bg-[#101113] px-5 py-5 font-mono shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
              <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">{P.receipt.title}</p>
              <p className="mt-1 text-center text-[11px] text-[var(--color-muted-2)]">{P.receipt.sub}</p>
              <ul className="mt-4 border-t border-dashed border-white/25 pt-2">
                {P.receipt.rows.map(([a, f, s]) => (
                  <li key={a} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 py-[5px] text-[13px]">
                    <span>
                      {a}
                      <span className="block text-[11px] leading-tight text-[var(--color-muted-2)]">{f}</span>
                    </span>
                    <span className="tabular-nums">{s}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 flex items-baseline justify-between border-t-2 border-white/40 pt-3 text-lg font-extrabold">
                <span>{P.receipt.total[0]}</span>
                <span className="tabular-nums text-[var(--color-accent)]">{P.receipt.total[1]}</span>
              </p>
              <div className="mt-3 flex items-center justify-between gap-4 border border-[#ff6f6f]/50 bg-[#ff6f6f]/10 px-3.5 py-3">
                <span className="text-sm font-semibold leading-snug">{P.receipt.zero}</span>
                <span className="flex items-baseline gap-1.5 text-[#ff7d7d]"><span className="font-mono text-5xl font-extrabold leading-none [font-variant-numeric:slashed-zero]">0</span><span className="text-sm font-bold uppercase tracking-wide">справ</span></span>
              </div>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-[var(--color-muted-2)]">{P.receipt.note}</p>
          </div>
        </div>

        {/* тези і висновок */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {P.points.map((t) => (
              <li key={t} className="flex gap-3 text-sm leading-snug sm:text-[15px]">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-[var(--color-accent)]" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          <p className="ff-display border-l-2 border-[var(--color-accent)] pl-4 text-base font-bold leading-snug sm:text-lg">{P.verdict}</p>
        </div>
      </Container>
    </Section>
  );
}
