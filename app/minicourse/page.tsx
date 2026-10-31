import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import MiniCta from "./MiniCta";
import StickyCta from "./StickyCta";
import MetaPixel from "./MetaPixel";
import LpMode from "./LpMode";
import {
  minicourseAuthor,
  minicourseCost,
  minicourseDisclaimer,
  minicourseFaq,
  minicourseFinal,
  minicourseFor,
  minicourseHero,
  minicourseHow,
  minicourseNotFor,
  minicourseOffer,
  minicourseProgram,
  minicourseResult,
  minicourseSample,
  minicourseWhy,
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

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mb-7 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{children}</p>;
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
  const { cta, ctaWaitlist, ctaFree } = minicourseHero;
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] pb-20 text-[var(--color-foreground)] sm:pb-0">
      <MetaPixel />
      <LpMode />
      <StickyCta label={cta} waitlistLabel={ctaWaitlist} />

      {/* 1. ШАПКА = ОФЕР */}
      <Section spacing="hero">
        <Container>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {minicourseHero.eyebrow}
          </p>
          <h1 className="ff-display mb-5 max-w-3xl text-[clamp(2rem,7vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight">
            {minicourseHero.h1}
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">{minicourseHero.sub}</p>
          <div className="ff-cta-stack gap-3">
            <MiniCta label={cta} waitlistLabel={ctaWaitlist} />
            <MiniCta label={ctaFree} waitlistLabel={ctaFree} free />
            <p className="max-w-md text-sm text-[var(--color-muted-2)]">{minicourseHero.note}</p>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/12 pt-6 sm:grid-cols-4">
            {minicourseHero.facts.map((f) => (
              <div key={f.k}>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{f.k}</dt>
                <dd className="mt-1 text-sm font-medium">{f.v}</dd>
              </div>
            ))}
          </dl>
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

      {/* 3. ЩО ЗА «НЕ ЗНАЮ» */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{minicourseWhy.h2}</H2>
          <Lead>{minicourseWhy.lead}</Lead>
          <div className="grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
            {minicourseWhy.items.map((it, i) => (
              <div key={it.title} className="flex flex-col gap-3 bg-[var(--color-background)] p-6">
                <span className="ff-display text-3xl font-extrabold text-[var(--color-accent)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ff-display text-lg font-bold">{it.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{it.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. ЦІНА БЕЗДІЯЛЬНОСТІ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{minicourseCost.h2}</H2>
          <Bullets items={minicourseCost.items} />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-2)]">{minicourseCost.note}</p>
        </Container>
      </Section>

      {/* 5. РЕЗУЛЬТАТ + ДО/ПІСЛЯ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{minicourseResult.h2}</H2>
          <Bullets items={minicourseResult.items} />
          <div className="mt-8 grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="border border-white/15 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Зараз</p>
              <ul className="flex flex-col gap-2 text-base text-[var(--color-muted)]">
                {minicourseResult.beforeAfter.before.map((b) => (
                  <li key={b}>— {b}</li>
                ))}
              </ul>
            </div>
            <div className="border border-[var(--color-accent)]/50 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Після 5 днів</p>
              <ul className="flex flex-col gap-2 text-base">
                {minicourseResult.beforeAfter.after.map((a) => (
                  <li key={a}>→ {a}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="ff-cta-stack mt-8">
            <MiniCta label={cta} waitlistLabel={ctaWaitlist} />
          </div>
        </Container>
      </Section>

      {/* 6. ПРОГРАМА */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
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
                  <p className="mt-2 text-sm font-medium text-[var(--color-accent)]">{d.out}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. ЗРАЗОК (безкоштовно: чому варто купити) */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{minicourseSample.h2}</H2>
          <Lead>{minicourseSample.lead}</Lead>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-white/15 p-6">
              <h3 className="ff-display mb-4 text-lg font-bold">{minicourseSample.questionsTitle}</h3>
              <ol className="flex flex-col gap-3">
                {minicourseSample.questions.map((q, i) => (
                  <li key={q} className="flex gap-3 text-base">
                    <span className="ff-display text-[var(--color-accent)]">{i + 1}</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-sm leading-relaxed text-[var(--color-muted)]">{minicourseSample.questionsNote}</p>
            </div>
            <div className="border border-white/15 p-6">
              <h3 className="ff-display mb-4 text-lg font-bold">{minicourseSample.swapTitle}</h3>
              <ul className="flex flex-col gap-4">
                {minicourseSample.swaps.map((s) => (
                  <li key={s.from} className="text-base">
                    <span className="text-[var(--color-muted-2)] line-through">{s.from}</span>
                    <br />
                    <span className="font-medium">→ {s.to}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="ff-cta-stack mt-8">
            <MiniCta label={ctaFree} waitlistLabel={ctaFree} free />
          </div>
        </Container>
      </Section>

      {/* 8. ЯК ЦЕ ПРАЦЮЄ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{minicourseHow.h2}</H2>
          <div className="grid gap-px border border-white/12 bg-white/12 md:grid-cols-4">
            {minicourseHow.steps.map((s) => (
              <div key={s.n} className="flex flex-col gap-2 bg-[var(--color-surface)] p-5">
                <span className="ff-display text-2xl font-extrabold text-[var(--color-accent)]">{s.n}</span>
                <h3 className="ff-display text-base font-bold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. КОМУ НЕ ПІДІЙДЕ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{minicourseNotFor.h2}</H2>
          <Bullets items={minicourseNotFor.items} />
        </Container>
      </Section>

      {/* 10. АВТОР (відгуків поки немає, блок пропущено) */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{minicourseAuthor.h2}</H2>
          <p className="ff-display mb-2 text-xl font-bold">{minicourseAuthor.name}</p>
          <p className="mb-4 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{minicourseAuthor.text}</p>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-muted-2)]">{minicourseAuthor.disclaimer}</p>
        </Container>
      </Section>

      {/* 11. ОФЕР: ЩО ЗА 399 ГРН */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{minicourseOffer.h2}</H2>
          <Bullets items={minicourseOffer.items} />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">{minicourseOffer.note}</p>
          <div className="ff-cta-stack mt-8 gap-3">
            <MiniCta label={cta} waitlistLabel={ctaWaitlist} />
            <p className="max-w-md text-sm text-[var(--color-muted-2)]">{minicourseHero.note}</p>
          </div>
        </Container>
      </Section>

      {/* 12. ПИТАННЯ Й ВІДПОВІДІ (найчитаніший блок) */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
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

      {/* 13. ФІНАЛ */}
      <Section spacing="end" className="border-t border-white/10">
        <Container>
          <h2 className="ff-display mb-6 max-w-3xl text-[clamp(1.5rem,4.6vw,2.4rem)] font-extrabold leading-[1.1] tracking-tight">
            {minicourseFinal.h2}
          </h2>
          <div className="ff-cta-stack gap-3">
            <MiniCta label={cta} waitlistLabel={ctaWaitlist} />
            <MiniCta label={ctaFree} waitlistLabel={ctaFree} free />
          </div>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-[var(--color-muted-2)]">{minicourseDisclaimer}</p>
        </Container>
      </Section>
    </div>
  );
}
