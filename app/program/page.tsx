import TelegramCta from "../components/TelegramCta";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "../components/Section";
import Eyebrow from "../components/Eyebrow";
import HeroPhoto from "../components/HeroPhoto";
import MiniCourseStrip from "../components/MiniCourseStrip";
import AuthorBlock from "../components/AuthorBlock";
import PainBlock from "../components/PainBlock";
import Roadmap from "../components/Roadmap";
import SkillIcon, { IconTile } from "../components/SkillIcon";
import { hackathonStrip } from "@/lib/hackathons";
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
  programGuarantees,
  programHero,
  programPricing,
  programRhythm,
  programSkills,
  programVisibility,
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

/** Питання, на які вже відповідають блоки ціни, гарантій і кнопка запису. */
const FAQ_DROP: readonly string[] = ["Яка різниця між пакетами?", "Ви гарантуєте гроші чи клієнтів?", "Як записатися?"];

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

      {/* 0. БІЛЬ відкриває сторінку */}
      <PainBlock className="bg-[var(--color-surface)]" />

      {/* 1. HERO: підліток, який бере життя у свої руки, запис, група, хакатони */}
      <Section spacing="hero" className="relative isolate overflow-hidden border-t border-white/10">
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
          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-px border border-white/12 bg-white/12 sm:grid-cols-4">
            {[
              { k: "Група", v: "до 10", s: "підлітків" },
              { k: "Тривалість", v: "8 тижнів", s: "2 місяці" },
              { k: "На тиждень", v: "від 7 год", s: "занять і практики" },
              { k: "Старт", v: PROGRAM_START_DATE.replace(" 2026", ""), s: "2026 рік" },
            ].map((f) => (
              <div key={f.k} className="bg-[var(--color-background)] px-4 py-4">
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{f.k}</dt>
                <dd className="ff-display mt-1.5 text-xl font-extrabold leading-tight">{f.v}</dd>
                <dd className="mt-0.5 text-xs text-[var(--color-muted)]">{f.s}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 max-w-3xl">
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
        </Container>
      </Section>

      {/* 3. ХТО ПРОВОДИТЬ */}
      <AuthorBlock className="border-t border-white/10" />

      {/* 3b. 10 НАВИЧОК */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]" id="skills">
        <Container>
          <H2>{programSkills.h2}</H2>
          <Lead>{programSkills.lead}</Lead>
          <div className="grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
            {programSkills.groups.map((g) => (
              <div key={g.title} className="flex flex-col gap-5 bg-[var(--color-surface)] p-6">
                <h3 className="ff-display flex items-center gap-3 text-lg font-bold text-[var(--color-accent)]">
                  <SkillIcon name={g.title} className="h-6 w-6" />
                  {g.title}
                </h3>
                <ul className="flex flex-col gap-5">
                  {g.skills.map((sk) => (
                    <li key={sk.name} className="flex gap-4">
                      <IconTile name={sk.name} />
                      <div className="min-w-0">
                        <p className="text-base font-bold leading-snug">{sk.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">{sk.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. ДОРОЖНЯ КАРТА: від точки А до точки Б */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{programRhythm.h2}</H2>
          <Lead>{programRhythm.lead}</Lead>
          <Roadmap />
        </Container>
      </Section>

      {/* 8. ПАКЕТИ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
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

      {/* Instagram: рілс і пости прямо на сторінці */}
      <Section spacing="block" className="border-t border-white/10" id="instagram">
        <Container>
          <InstagramShowcase ctaHref={APPLY_PROGRAM_URL} ctaLabel={programHero.cta} />
        </Container>
      </Section>

      {/* ПІСЛЯ ЦІНИ: що я побачу і чим ризикую (один блок замість чотирьох) */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>Ви бачите результат і нічим не ризикуєте</H2>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-accent)]">Що бачите ви</p>
              <p className="ff-display text-lg font-bold">{programVisibility.weekly.title}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {programVisibility.weekly.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm leading-snug">
                    <SkillIcon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                    {it}
                  </li>
                ))}
              </ul>
              <a href={programVisibility.weekly.sampleHref} className="mt-3 inline-block text-sm font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline">
                {programVisibility.weekly.sampleLabel}
              </a>
              <p className="ff-display mt-6 text-lg font-bold">{programVisibility.demoDay.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{programVisibility.demoDay.text}</p>
            </div>
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-accent)]">Що гарантуємо</p>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {programGuarantees.items.map((g, gi) => (
                  <li key={g.title} className="flex gap-3.5 py-3.5">
                    <IconTile name={["refund", "shield", "clock"][gi] ?? "shield"} size="sm" />
                    <span>
                      <span className="block text-sm font-bold leading-snug">{g.title}</span>
                      <span className="mt-1 block text-sm leading-snug text-[var(--color-muted)]">{g.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted-2)]">{programGuarantees.note}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. ДЛЯ КОГО */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{programFor.h2}</H2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                Підійде, якщо
              </p>
              <ul className="border-t border-white/15">
                {programFor.forYou.map((t) => (
                  <li key={t} className="flex gap-3 border-b border-white/15 py-2.5 text-sm leading-snug sm:text-base">
                    <SkillIcon name="check" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[var(--color-accent)]" />
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
                    className="flex gap-3 border-b border-white/15 py-2.5 text-sm leading-snug text-[var(--color-muted)] sm:text-base"
                  >
                    <SkillIcon name="cross" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[var(--color-muted-2)]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 11. FAQ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>Питання та відповіді</H2>
          <div className="mt-6 max-w-2xl">
            {programFaqsV2.filter((f) => !FAQ_DROP.includes(f.q)).map((f) => (
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
              <Link href="/lviv" className="ff-cta-link">
                Або спершу протестувати формат: хакатон у Львові 28–29.11 →
              </Link>
            </div>
            <p className="mt-5 text-sm text-[var(--color-muted-2)]">{programFinal.note}</p>
            <div className="mt-10 text-left">
              <MiniCourseStrip
                channel="siteprog2"
                title="Ще не впевнені? Почніть з практикуму"
                lead="5 днів по 15 хвилин, щоб зрозуміти свою дитину. Далі вирішите про програму. Повернення за 7 днів."
              />
            </div>
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
