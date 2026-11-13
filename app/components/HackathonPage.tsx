import Link from "next/link";
import Section from "./Section";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import HeroPhoto from "./HeroPhoto";
import AuthorBlock from "./AuthorBlock";
import type { Hackathon } from "@/lib/hackathons";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="ff-display mb-3 max-w-3xl text-[clamp(1.6rem,4.6vw,2.6rem)] font-extrabold leading-[1.08] tracking-tight">
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{children}</p>;
}

function Cta({ h, children, ghost = false }: { h: Hackathon; children: React.ReactNode; ghost?: boolean }) {
  return ghost ? (
    <a className="ff-cta-link" href={h.questionUrl} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <a className="ff-cta" href={h.signupUrl} target="_blank" rel="noopener noreferrer">{children}</a>
  );
}

export default function HackathonPage({ h }: { h: Hackathon }) {
  const e = h.endorsement;
  const price = h.price;
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* 1. HERO */}
      <Section spacing="hero" className="relative isolate overflow-hidden">
        <HeroPhoto src="/images/ivan-events-900.webp" desktopPos="object-[center_15%]" />
        <Container className="relative">
          <Eyebrow product={h.hero.eyebrow} />
          <h1 className="ff-display ff-reveal mb-6 max-w-3xl text-[clamp(2rem,6vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight">
            {h.hero.h1}
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">{h.hero.sub}</p>
          <div className="ff-cta-stack gap-3">
            <Cta h={h}>Записати дитину</Cta>
            <Cta h={h} ghost>Є питання? Напишіть організатору</Cta>
            <p className="max-w-md text-sm text-[var(--color-muted-2)]">
              Запис до {h.signupDeadline}. Сума повністю зараховується в оплату програми, якщо ви вирішите продовжити.
            </p>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/12 pt-6 sm:grid-cols-4">
            {[
              ["Коли", h.dates.replace(" 2026", "")],
              ["Де", h.city],
              ["Група", `до ${h.seats} підлітків`],
              ["Вартість", price],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{k}</dt>
                <dd className="mt-1 text-sm font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {e.text ? (
        <Section spacing="tight" className="border-t border-white/10 bg-[var(--color-surface)]">
          <Container>
            <blockquote className="max-w-3xl border-l-2 border-[var(--color-accent)] pl-5">
              <p className="mb-3 text-lg leading-relaxed">{e.text}</p>
              <footer className="text-sm text-[var(--color-muted)]">{e.name}, {e.role}</footer>
            </blockquote>
          </Container>
        </Section>
      ) : null}

      {/* 2. ДЛЯ КОГО */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{h.forWhom.h2}</H2>
          <div className="mt-8 grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
            {h.forWhom.items.map((t, i) => (
              <div key={t} className="flex flex-col gap-4 bg-[var(--color-surface)] p-6">
                <span className="ff-display text-3xl font-extrabold leading-none text-[var(--color-accent)]">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-base leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. ПРОГРАМА */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>Програма двох днів</H2>
          <Lead>Один формат на два дні: від «що мене бісить» до реального першого кроку і фіналу перед вами.</Lead>
          <div className="grid gap-10 md:grid-cols-2">
            {h.schedule.map((d) => (
              <div key={d.day}>
                <p className="ff-display mb-4 text-xl font-bold text-[var(--color-accent)]">{d.day}</p>
                <div className="border-t border-white/20">
                  {d.slots.map(([t, text]) => (
                    <div key={t + text} className="grid grid-cols-[64px_1fr] gap-4 border-b border-white/20 py-4">
                      <span className="ff-display text-lg font-extrabold leading-tight">{t}</span>
                      <p className="text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-[var(--color-muted-2)]">
            {h.venue}. Після пілоту в Білій Церкві 14.11 деталі можуть трохи змінитися, ключові блоки лишаються.
          </p>
        </Container>
      </Section>

      {/* 4. РЕЗУЛЬТАТ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{h.outcome.h2}</H2>
          <div className="mt-8 border-t border-white/20">
            {h.outcome.items.map((it, i) => (
              <div key={it} className="grid grid-cols-[52px_1fr] gap-4 border-b border-white/20 py-5 sm:grid-cols-[96px_1fr] sm:gap-6">
                <span className="ff-display text-3xl font-extrabold leading-none text-[var(--color-accent)] sm:text-4xl">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-base leading-relaxed sm:text-lg">{it}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-2)]">{h.outcome.note}</p>
        </Container>
      </Section>

      <AuthorBlock className="border-t border-white/10" />

      {/* 7. БЕЗПЕКА */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{h.safety.h2}</H2>
          <div className="mt-8 grid gap-px border border-white/12 bg-white/12 md:grid-cols-2">
            {h.safety.items.map((t) => (
              <div key={t} className="flex gap-3 bg-[var(--color-background)] p-5">
                <span className="text-[var(--color-accent)]" aria-hidden>✓</span>
                <p className="text-base leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. ЩО ДАЛІ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{h.next.h2}</H2>
          <Lead>{h.next.text}</Lead>
          <Link className="ff-cta-secondary" href={h.next.linkHref}>{h.next.linkLabel}</Link>
        </Container>
      </Section>

      {/* 9. FAQ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>Питання й відповіді</H2>
          <div className="mt-8 max-w-3xl border-t border-white/20">
            {h.faq.map((f) => (
              <details key={f.q} className="group border-b border-white/20 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold sm:text-lg">
                  <span>{f.q}</span>
                  <span className="text-[var(--color-accent)] transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. ФІНАЛ */}
      <Section spacing="end" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <h2 className="ff-display mb-6 max-w-3xl text-[clamp(1.6rem,4.6vw,2.6rem)] font-extrabold leading-[1.08] tracking-tight">
            Місць до {h.seats}. Запис до {h.signupDeadline}.
          </h2>
          <div className="ff-cta-stack gap-3">
            <Cta h={h}>Записати дитину</Cta>
            <Cta h={h} ghost>Є питання? Напишіть організатору</Cta>
          </div>
        </Container>
      </Section>
    </div>
  );
}
