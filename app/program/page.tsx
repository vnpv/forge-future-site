import TelegramCta from "../components/TelegramCta";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "../components/Section";
import Eyebrow from "../components/Eyebrow";
import HeroPhoto from "../components/HeroPhoto";
import MiniCourseStrip from "../components/MiniCourseStrip";
import AuthorBlock from "../components/AuthorBlock";
import Container from "../components/Container";
import JsonLd from "@/components/JsonLd";
import InstagramShowcase from "../components/InstagramShowcase";
import { reelVideoSchema } from "@/lib/instagram";
import {
  PROGRAM_START_DATE,
  programPackages,
} from "@/lib/content";
import {
  programFaqsV2,
  programFinal,
  programFor,
  programHackathons,
  programGuarantees,
  programHero,
  programPricing,
  programRhythm,
  programShift,
  programSkills,
  programVisibility,
  programVs,
  programWeeksV2,
} from "@/lib/program-page";
import { programCourseSchema } from "@/lib/course-schema";
import { pageSeo } from "@/lib/page-seo";
import { pageAlternates } from "@/lib/seo";
import { APPLY_PROGRAM_URL } from "@/lib/telegram";

export const metadata: Metadata = {
  title: pageSeo.program.title,
  description: pageSeo.program.description,
  alternates: pageAlternates("/program"),
};

function Cta({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <TelegramCta flow="program" location="program" className={className}>
      {children}
    </TelegramCta>
  );
}

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

export default function ProgramPage() {
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <JsonLd data={programCourseSchema} />
      <JsonLd data={reelVideoSchema} />

      {/* 1. HERO */}
      <Section spacing="hero" className="relative isolate overflow-hidden">
        <HeroPhoto src="/images/ivan-program-b-900.webp" desktopPos="object-[center_10%]" />
        <Container className="relative">
          <Eyebrow product={programHero.eyebrow} />
          <h1 className="ff-display ff-reveal mb-6 max-w-3xl text-[clamp(2rem,6vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight">
            {programHero.h1}
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">{programHero.sub}</p>
          <div className="ff-cta-stack gap-3">
            <Cta>{programHero.cta}</Cta>
            <p className="max-w-md text-sm text-[var(--color-muted-2)]">{programHero.ctaNote}</p>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/12 pt-6 sm:grid-cols-4">
            {programHero.facts.map((f) => (
              <div key={f.k}>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">
                  {f.k}
                </dt>
                <dd className="mt-1 text-sm font-medium">{f.k === "Старт" ? PROGRAM_START_DATE : f.v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 3b. 10 НАВИЧОК */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]" id="skills">
        <Container>
          <H2>{programSkills.h2}</H2>
          <Lead>{programSkills.lead}</Lead>
          <div className="grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
            {programSkills.groups.map((g) => (
              <div key={g.title} className="flex flex-col gap-4 bg-[var(--color-surface)] p-6">
                <h3 className="ff-display text-lg font-bold text-[var(--color-accent)]">{g.title}</h3>
                <ul className="flex flex-col gap-3">
                  {g.skills.map((sk) => (
                    <li key={sk.name}>
                      <p className="text-base font-bold">{sk.name}</p>
                      <p className="text-sm leading-relaxed text-[var(--color-muted)]">{sk.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. ВІСІМ ТИЖНІВ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{programRhythm.h2}</H2>
          <Lead>{programRhythm.lead}</Lead>
          <div className="border-t border-white/20">
            {programWeeksV2.map((w, i) => (
              <div
                key={w.title}
                className="grid grid-cols-[52px_1fr] gap-4 border-b border-white/20 py-6 sm:grid-cols-[96px_1fr] sm:gap-6"
              >
                <span className="ff-display text-3xl font-extrabold leading-none text-[var(--color-accent)] sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="ff-display text-lg font-bold sm:text-xl">{w.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)] sm:text-sm">
                    Навички: {w.skills}
                  </p>
                  <ul className="mt-3 flex flex-col gap-1.5 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                    {w.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="text-[var(--color-accent)]" aria-hidden>→</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Instagram: рілс і пости прямо на сторінці */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]" id="instagram">
        <Container>
          <InstagramShowcase ctaHref={APPLY_PROGRAM_URL} ctaLabel={programHero.cta} />
        </Container>
      </Section>

      {/* 8. ПАКЕТИ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{programPricing.h2}</H2>
          <Lead>{programPricing.lead}</Lead>
          <div className="grid gap-4 md:grid-cols-3">
            {programPackages.map((p) => {
              const hot = p.note?.startsWith("Рекомендуємо");
              return (
                <div
                  key={p.name}
                  className={`flex flex-col border-2 p-6 ${hot ? "border-[var(--color-accent)]" : "border-white/25"}`}
                >
                  <p className="ff-display text-lg font-bold">{p.name}</p>
                  <p className="ff-display mt-1 text-3xl font-extrabold">{p.price}</p>
                  {p.note && (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]">
                      {p.note}
                    </p>
                  )}
                  <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-[var(--color-accent)]" aria-hidden>
                          →
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="mt-8 border border-white/15 p-6">
            <p className="ff-display mb-3 text-base font-bold">{programPricing.bonuses.title}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {programPricing.bonuses.items.map((b) => (
                <li key={b} className="flex gap-2 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                  <span className="text-[var(--color-accent)]" aria-hidden>
                    +
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="ff-cta-stack ff-cta-stack--center mt-8">
            <Cta>{programFinal.cta}</Cta>
          </div>
        </Container>
      </Section>

      {/* 3. ІНШИЙ ПІДХІД */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{programShift.h2}</H2>
          <Lead>{programShift.lead}</Lead>
          <div className="grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
            {programShift.steps.map((s) => (
              <div key={s.n} className="flex flex-col gap-3 bg-[var(--color-surface)] p-6">
                <span className="ff-display text-3xl font-extrabold text-[var(--color-accent)]">{s.n}</span>
                <h3 className="ff-display text-lg font-bold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">{programShift.note}</p>
        </Container>
      </Section>

      {/* 5. ВИ БАЧИТЕ, ЩО ВІДБУВАЄТЬСЯ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{programVisibility.h2}</H2>
          <Lead>{programVisibility.lead}</Lead>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-white/15 p-6">
              <h3 className="ff-display mb-4 text-lg font-bold">{programVisibility.weekly.title}</h3>
              <ul className="mb-5 flex flex-col gap-2.5">
                {programVisibility.weekly.items.map((it) => (
                  <li key={it} className="flex gap-3 text-base">
                    <span className="text-[var(--color-accent)]" aria-hidden>
                      →
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">{programVisibility.weekly.note}</p>
              <a
                href={programVisibility.weekly.sampleHref}
                className="mt-5 inline-block text-sm font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline"
              >
                {programVisibility.weekly.sampleLabel}
              </a>
            </div>
            <div className="border border-[var(--color-accent)]/50 p-6">
              <h3 className="ff-display mb-4 text-lg font-bold">{programVisibility.demoDay.title}</h3>
              <p className="text-base leading-relaxed text-[var(--color-muted)]">{programVisibility.demoDay.text}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. КУРС VS МЕНТОРСЬКА ПРОГРАМА */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{programVs.h2}</H2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b border-white/25">
                  {programVs.head.map((h, i) => (
                    <th
                      key={h + i}
                      className={`py-3 pr-4 text-xs font-semibold uppercase tracking-widest ${
                        i === 2 ? "text-[var(--color-accent)]" : "text-[var(--color-muted-2)]"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {programVs.rows.map((r) => (
                  <tr key={r[0]} className="border-b border-white/12 align-top">
                    <td className="py-4 pr-4 font-medium">{r[0]}</td>
                    <td className="py-4 pr-4 text-[var(--color-muted)]">{r[1]}</td>
                    <td className="py-4 pr-4">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* 7. ГАРАНТІЇ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{programGuarantees.h2}</H2>
          <div className="mt-8 grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
            {programGuarantees.items.map((g) => (
              <div key={g.title} className="flex flex-col gap-3 bg-[var(--color-surface)] p-6">
                <h3 className="ff-display text-base font-bold leading-snug">{g.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{g.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-muted-2)]">{programGuarantees.note}</p>
        </Container>
      </Section>

      {/* 9. ДЛЯ КОГО */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{programFor.h2}</H2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                Підійде, якщо
              </p>
              <ul className="border-t border-white/15">
                {programFor.forYou.map((t) => (
                  <li key={t} className="border-b border-white/15 py-3.5 text-base leading-relaxed">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">
                Не підійде, якщо
              </p>
              <ul className="border-t border-white/15">
                {programFor.notForYou.map((t) => (
                  <li
                    key={t}
                    className="border-b border-white/15 py-3.5 text-base leading-relaxed text-[var(--color-muted)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 10a. ХАКАТОНИ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{programHackathons.h2}</H2>
          <Lead>{programHackathons.lead}</Lead>
          <div className="border-t border-white/20">
            {programHackathons.rows.map((r) => (
              <div key={r.when} className="grid gap-2 border-b border-white/20 py-5 sm:grid-cols-[200px_1fr_auto] sm:items-center sm:gap-6">
                <p className="ff-display text-lg font-extrabold text-[var(--color-accent)]">{r.when}</p>
                <div>
                  <p className="text-base font-bold">{r.where}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">{r.text}</p>
                </div>
                {r.href ? (
                  r.href.startsWith("/") ? (
                    <Link className="ff-cta-secondary" href={r.href}>{r.cta}</Link>
                  ) : (
                    <a className="ff-cta-secondary" href={r.href} target="_blank" rel="noopener noreferrer">{r.cta}</a>
                  )
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. ХТО ВЕДЕ */}
      <AuthorBlock className="border-t border-white/10 bg-[var(--color-surface)]" />

      {/* 11. FAQ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>Питання та відповіді</H2>
          <div className="mt-6 max-w-2xl">
            {programFaqsV2.map((f) => (
              <details key={f.q} className="group border-b border-white/20 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-medium">
                  {f.q}
                  <span className="ff-display shrink-0 text-xl text-[var(--color-accent)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <MiniCourseStrip
            channel="siteprog2"
            title="Якщо зараз це дорого або ви не впевнені: почніть з практикуму"
            lead="Практикум за 399 грн: 5 днів по 15 хвилин, щоб зрозуміти свою дитину. Далі вирішите про програму. Повернення за 7 днів."
          />
        </Container>
      </Section>

      {/* 12. ФІНАЛЬНИЙ CTA */}
      <Section spacing="end" id="zayavka" className="scroll-mt-24 border-t border-white/10">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="ff-display mb-4 text-[clamp(1.8rem,5vw,2.8rem)] font-extrabold leading-tight">
              {programFinal.h2}
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-[var(--color-muted)]">{programFinal.lead}</p>
            <ul className="mx-auto mb-8 inline-flex flex-col items-start gap-2 text-left">
              {programFinal.points.map((p) => (
                <li key={p} className="flex gap-3 text-base">
                  <span className="text-[var(--color-accent)]" aria-hidden>
                    →
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="ff-cta-stack ff-cta-stack--center">
              <Cta>{programFinal.cta}</Cta>
              <Link href="/events" className="ff-cta-link">
                Або прийти на відкритий вечір →
              </Link>
            </div>
            <p className="mt-5 text-sm text-[var(--color-muted-2)]">{programFinal.note}</p>
            <p className="mt-8 text-sm text-[var(--color-muted-2)]">
              Дитині 10-13? Для цього віку окремий продукт,{" "}
              <Link href="/junior" className="font-medium text-[var(--color-foreground)] underline-offset-2 hover:underline">
                Інтенсив
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

    </div>
  );
}
