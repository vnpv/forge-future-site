import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "../components/Section";
import Container from "../components/Container";
import Eyebrow from "../components/Eyebrow";
import {
  lviv,
  lvivAuthor,
  lvivFacts,
  lvivFaq,
  lvivForWhom,
  lvivHero,
  lvivNext,
  lvivOutcome,
  lvivSafety,
  lvivSchedule,
  lvivTeam,
} from "@/lib/lviv";
import { founder } from "@/lib/content";

export const metadata: Metadata = {
  title: "Хакатон «Перша справа за 2 дні» у Львові, 28–29 листопада",
  description:
    "Два дні для підлітків 14–19: ідея, перевірка на живих людях, перший реальний крок і фінал для батьків. Львів, 28–29 листопада, до 10 місць.",
  alternates: { canonical: "/lviv" },
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

const cta =
  "inline-flex items-center justify-center rounded-full bg-[#22c55e] px-6 py-3 text-base font-semibold text-[#06200f] transition-colors hover:bg-[#4ade80]";
const ctaGhost =
  "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/5";

export default function LvivPage() {
  const e = lviv.endorsement;
  return (
    <div>
      <Section spacing="hero">
        <Container>
          <Eyebrow product={lvivHero.eyebrow} />
          <h1 className="ff-display mb-5 max-w-3xl text-[clamp(2rem,6vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight">
            {lvivHero.h1}
          </h1>
          <p className="mb-7 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{lvivHero.sub}</p>
          <dl className="mb-8 grid max-w-2xl grid-cols-2 gap-4 border-y border-white/12 py-4 sm:grid-cols-4">
            <div><dt className="text-xs uppercase tracking-wider text-[var(--color-muted-2)]">Коли</dt><dd className="mt-1 font-semibold">{lviv.daysShort}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-[var(--color-muted-2)]">Де</dt><dd className="mt-1 font-semibold">{lviv.city}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-[var(--color-muted-2)]">Місць</dt><dd className="mt-1 font-semibold">до {lviv.seats}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-[var(--color-muted-2)]">Вартість</dt><dd className="mt-1 font-semibold">{lviv.priceUah.toLocaleString("uk-UA")} грн</dd></div>
          </dl>
          <div className="flex flex-wrap gap-3">
            <a className={cta} href={lviv.signupUrl} target="_blank" rel="noopener noreferrer">Записати дитину</a>
            <a className={ctaGhost} href={lviv.questionUrl} target="_blank" rel="noopener noreferrer">Є питання</a>
          </div>
          <p className="mt-3 text-sm text-[var(--color-muted-2)]">Запис до {lviv.signupDeadline}. Сума зараховується в оплату програми, якщо ви вирішите продовжити.</p>
        </Container>
      </Section>

      {e.text ? (
        <Section spacing="tight" className="border-t border-white/10">
          <Container>
            <blockquote className="max-w-3xl border-l-2 border-[var(--color-accent)] pl-5">
              <p className="mb-3 text-lg leading-relaxed">{e.text}</p>
              <footer className="text-sm text-[var(--color-muted)]">{e.name}, {e.role}</footer>
            </blockquote>
          </Container>
        </Section>
      ) : null}

      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{lvivForWhom.h2}</H2>
          <Bullets items={lvivForWhom.items} />
        </Container>
      </Section>

      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>Програма двох днів</H2>
          <div className="grid max-w-4xl gap-8 sm:grid-cols-2">
            {lvivSchedule.map((d) => (
              <div key={d.day}>
                <p className="ff-display mb-3 text-lg font-bold text-[var(--color-accent)]">{d.day}</p>
                <ul className="flex flex-col gap-3">
                  {d.slots.map(([t, text]) => (
                    <li key={t + text} className="flex gap-3 text-base leading-relaxed">
                      <span className="w-12 shrink-0 font-semibold">{t}</span>
                      <span className="text-[var(--color-muted)]">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--color-muted-2)]">{lviv.venue}. Програма може трохи змінитися після пілоту в Білій Церкві 14.11, ключові блоки лишаються.</p>
        </Container>
      </Section>

      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{lvivOutcome.h2}</H2>
          <Bullets items={lvivOutcome.items} />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-2)]">{lvivOutcome.note}</p>
        </Container>
      </Section>

      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{lvivAuthor.h2}</H2>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Image src={founder.photoUrl} alt={founder.photoAlt} width={160} height={160} unoptimized className="h-36 w-36 shrink-0 rounded-full object-cover" />
            <div className="max-w-2xl">
              <p className="ff-display text-xl font-bold">{lvivAuthor.name}</p>
              <p className="mb-4 text-sm text-[var(--color-muted)]">{lvivAuthor.role}</p>
              <dl className="mb-5 grid grid-cols-3 gap-4 border-y border-white/12 py-4">
                {lvivFacts.map((f) => (
                  <div key={f.k}>
                    <dt className="ff-display text-lg font-extrabold text-[var(--color-accent)]">{f.k}</dt>
                    <dd className="mt-1 text-sm text-[var(--color-muted)]">{f.v}</dd>
                  </div>
                ))}
              </dl>
              {[lvivAuthor.intro, lvivAuthor.career, lvivAuthor.ai, lvivAuthor.now].map((p) => (
                <p key={p} className="mb-3 text-base leading-relaxed text-[var(--color-muted)]">{p}</p>
              ))}
              <p className="mt-5 text-sm font-semibold">Перевірити можна тут:</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {lvivAuthor.links.map((l) => (
                  <li key={l.href}>
                    <a className="underline decoration-white/30 underline-offset-4 hover:text-[var(--color-accent)]" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{lvivTeam.h2}</H2>
          <div className="grid max-w-4xl gap-8 sm:grid-cols-2">
            {lvivTeam.people.map((p) => (
              <div key={p.name}>
                <p className="ff-display text-lg font-bold">{p.name}</p>
                <p className="mb-2 text-sm text-[var(--color-accent)]">{p.role}</p>
                <p className="mb-3 text-base leading-relaxed text-[var(--color-muted)]">{p.text}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <a className="underline decoration-white/30 underline-offset-4 hover:text-[var(--color-accent)]" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{lvivSafety.h2}</H2>
          <Bullets items={lvivSafety.items} />
        </Container>
      </Section>

      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{lvivNext.h2}</H2>
          <p className="mb-5 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">{lvivNext.text}</p>
          <Link className={ctaGhost} href={lvivNext.linkHref}>{lvivNext.linkLabel}</Link>
        </Container>
      </Section>

      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>Питання й відповіді</H2>
          <div className="max-w-3xl border-t border-white/20">
            {lvivFaq.map((f) => (
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

      <Section spacing="end" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <h2 className="ff-display mb-6 max-w-3xl text-[clamp(1.5rem,4.6vw,2.4rem)] font-extrabold leading-[1.1] tracking-tight">
            Місць до {lviv.seats}. Запис до {lviv.signupDeadline}.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a className={cta} href={lviv.signupUrl} target="_blank" rel="noopener noreferrer">Записати дитину</a>
            <a className={ctaGhost} href={lviv.questionUrl} target="_blank" rel="noopener noreferrer">Є питання</a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
