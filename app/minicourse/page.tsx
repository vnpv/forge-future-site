import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import MiniCta from "./MiniCta";
import MetaPixel from "./MetaPixel";
import LpMode from "./LpMode";
import {
  minicourseAuthor,
  minicourseDisclaimer,
  minicourseFaq,
  minicourseFinal,
  minicourseFor,
  minicourseHero,
  minicourseInside,
  minicourseProgram,
  minicourseResult,
} from "@/lib/minicourse";

export const metadata: Metadata = {
  title: "Підліток не знає, чого хоче? Курс для батьків за 5 днів",
  description:
    "5 днів по 15 хвилин: карта інтересів підлітка, скрипт розмови без сварки й експеримент на 48 годин. Курс для батьків підлітків 14-19.",
  alternates: { canonical: "/minicourse" },
  // Рекламний лендинг у тесті: не індексуємо, доки Іван не підтвердить факти.
  robots: { index: false, follow: false },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="ff-display mb-5 max-w-3xl text-[clamp(1.5rem,4.4vw,2.3rem)] font-extrabold leading-[1.1] tracking-tight">
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex max-w-2xl flex-col gap-3">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-base leading-relaxed sm:text-lg">
          <span className="text-[var(--color-accent)]" aria-hidden>
            →
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function MinicoursePage() {
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <MetaPixel />
      <LpMode />

      {/* 1. ШАПКА = ОФЕР */}
      <Section spacing="hero">
        <Container>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {minicourseHero.eyebrow}
          </p>
          <h1 className="ff-display mb-5 max-w-3xl text-[clamp(2rem,7vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight">
            {minicourseHero.h1}
          </h1>
          <p className="mb-7 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">{minicourseHero.sub}</p>
          <div className="mb-8">
            <Bullets items={minicourseHero.bullets} />
          </div>
          <div className="ff-cta-stack gap-3">
            <MiniCta label={minicourseHero.cta} waitlistLabel={minicourseHero.ctaWaitlist} />
            <p className="max-w-md text-sm text-[var(--color-muted-2)]">{minicourseHero.note}</p>
          </div>
        </Container>
      </Section>

      {/* 2. ДЛЯ КОГО */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{minicourseFor.h2}</H2>
          <Bullets items={minicourseFor.items} />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">{minicourseFor.note}</p>
        </Container>
      </Section>

      {/* 3. ПРО АВТОРА */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{minicourseAuthor.h2}</H2>
          <p className="ff-display mb-2 text-xl font-bold">{minicourseAuthor.name}</p>
          <p className="mb-4 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            {minicourseAuthor.text}
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-muted-2)]">{minicourseAuthor.disclaimer}</p>
        </Container>
      </Section>

      {/* 4. З ЧОГО СКЛАДАЄТЬСЯ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{minicourseInside.h2}</H2>
          <Bullets items={minicourseInside.items} />
        </Container>
      </Section>

      {/* 5. ПРОГРАМА (відгуків поки немає, блок пропущено) */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{minicourseProgram.h2}</H2>
          <div className="border-t border-white/20">
            {minicourseProgram.days.map((d, i) => (
              <div
                key={d.title}
                className="grid grid-cols-[52px_1fr] gap-4 border-b border-white/20 py-5 sm:grid-cols-[96px_1fr] sm:gap-6"
              >
                <span className="ff-display text-3xl font-extrabold leading-none text-[var(--color-accent)] sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="ff-display text-lg font-bold sm:text-xl">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. РЕЗУЛЬТАТ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{minicourseResult.h2}</H2>
          <Bullets items={minicourseResult.items} />
          <div className="ff-cta-stack mt-8">
            <MiniCta label={minicourseHero.cta} waitlistLabel={minicourseHero.ctaWaitlist} />
          </div>
        </Container>
      </Section>

      {/* 7. ПИТАННЯ Й ВІДПОВІДІ (найчитаніший блок) */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>Питання й відповіді</H2>
          <div className="max-w-3xl border-t border-white/20">
            {minicourseFaq.map((f) => (
              <details key={f.q} className="group border-b border-white/20 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold sm:text-lg">
                  <span>{f.q}</span>
                  <span className="text-[var(--color-accent)] transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. ФІНАЛ */}
      <Section spacing="end" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <h2 className="ff-display mb-6 max-w-3xl text-[clamp(1.5rem,4.6vw,2.4rem)] font-extrabold leading-[1.1] tracking-tight">
            {minicourseFinal.h2}
          </h2>
          <div className="ff-cta-stack gap-3">
            <MiniCta label={minicourseHero.cta} waitlistLabel={minicourseHero.ctaWaitlist} />
            <p className="max-w-md text-sm text-[var(--color-muted-2)]">{minicourseHero.note}</p>
          </div>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-[var(--color-muted-2)]">{minicourseDisclaimer}</p>
        </Container>
      </Section>
    </div>
  );
}
