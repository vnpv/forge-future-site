import TelegramCta from "../components/TelegramCta";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "../components/Section";
import Eyebrow from "../components/Eyebrow";
import HeroPhoto from "../components/HeroPhoto";
import MiniCourseStrip from "../components/MiniCourseStrip";
import AuthorBlock from "../components/AuthorBlock";
import Roadmap from "../components/Roadmap";
import SkillIcon, { IconTile } from "../components/SkillIcon";
import { hackathonStrip } from "@/lib/hackathons";
import Container from "../components/Container";
import InstagramShowcase from "../components/InstagramShowcase";
import {
  PROGRAM_START_DATE,
  programPackages,
} from "@/lib/content";
import {
  programFaqsV2,
  programFinal,
  programGuarantees,
  programPricing,
  programRhythm,
  programSkills,
  programVisibility,
} from "@/lib/program-page";
import { draftBeforeAfter, draftChanges, draftFaqExtra, draftFor, draftGuaranteeNote, draftHero, draftMirror, draftOffer } from "@/lib/program-draft-16";
import { APPLY_PROGRAM_URL } from "@/lib/telegram";

/** Чернетка під гіпотезу 16+: не індексується, не в sitemap. */
export const metadata: Metadata = {
  title: "Чернетка: Менторська програма 16–18",
  robots: { index: false, follow: false },
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

export default function ProgramDraftPage() {
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="sticky top-0 z-50 border-b border-amber-400/40 bg-amber-300 px-4 py-2 text-center text-sm font-semibold text-black">
        Чернетка для перевірки (гіпотеза 16+, 24.11). Жива сторінка: <Link href="/program" className="underline">/program</Link>
      </div>

      {/* 1. HERO: підліток, який бере життя у свої руки, запис, група, хакатони */}
      <Section spacing="hero" className="relative isolate overflow-hidden border-t border-white/10">
        <HeroPhoto src="/images/ivan-program-b-900.webp" desktopPos="object-[center_10%]" />
        <Container className="relative">
          <Eyebrow product={draftHero.eyebrow} />
          <h1 className="ff-display ff-reveal mb-6 max-w-3xl text-[clamp(2rem,6vw,3.4rem)] font-extrabold leading-[1.04] tracking-tight">
            {draftHero.h1}
          </h1>
          <p className="mb-3 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">{draftHero.sub}</p>
          <p className="mb-8 max-w-xl text-base font-semibold text-[var(--color-foreground)]">{draftHero.subNote}</p>
          <div className="ff-cta-stack gap-3">
            <Cta>{draftHero.cta}</Cta>
            <p className="max-w-md text-sm text-[var(--color-muted-2)]">{draftHero.ctaNote}</p>
          </div>
          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-px border border-white/12 bg-white/12 sm:grid-cols-3">
            {draftHero.facts.map((f) => (
              <div key={f.k} className={`px-4 py-4 ${f.k === "Навичка" ? "bg-[var(--color-accent)]/[0.08]" : "bg-[var(--color-background)]"}`}>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{f.k}</dt>
                <dd className={`ff-display mt-1.5 text-xl font-extrabold leading-tight ${f.k === "Навичка" ? "text-[var(--color-accent)]" : ""}`}>{f.v}</dd>
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

      {/* D1. ЗНАЙОМА СИТУАЦІЯ: біль 16+ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{draftMirror.h2}</H2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Батьки кажуть</p>
              <ul className="border-t border-white/15">
                {draftMirror.parents.map((t) => (
                  <li key={t} className="border-b border-white/15 py-2.5 text-sm leading-snug sm:text-base">{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Підлітки кажуть</p>
              <ul className="border-t border-white/15">
                {draftMirror.teens.map((t) => (
                  <li key={t} className="border-b border-white/15 py-2.5 text-sm leading-snug sm:text-base">{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {draftMirror.quotes.map((q) => (
              <figure key={q.q} className="border-l-2 border-[var(--color-accent)] pl-4">
                <blockquote className="ff-display text-lg font-bold leading-snug">«{q.q}»</blockquote>
                <figcaption className="mt-2 text-xs uppercase tracking-wide text-[var(--color-muted-2)]">{q.who}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">{draftMirror.lead}</p>
        </Container>
      </Section>

      {/* D2. ОФЕР: Перші гроші в кайф */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{draftOffer.h2}</H2>
          <Lead>{draftOffer.lead}</Lead>
          <div className="grid gap-px border border-white/12 bg-white/12 md:grid-cols-2">
            {[draftOffer.teen, draftOffer.parent].map((b) => (
              <div key={b.label} className="bg-[var(--color-background)] p-6">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-accent)]">{b.label}</p>
                <p className="ff-display text-lg font-bold leading-snug">{b.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{b.text}</p>
              </div>
            ))}
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {draftOffer.steps.map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="ff-display text-2xl font-extrabold text-[var(--color-accent)]">0{i + 1}</span>
                <span className="text-sm leading-snug sm:text-base">{t}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* D3. 5 ЗМІН */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{draftChanges.h2}</H2>
          <Lead>{draftChanges.lead}</Lead>
          <ul className="grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-5">
            {draftChanges.items.map((c, i) => (
              <li key={c.t} className="bg-[var(--color-surface)] p-5">
                <span className="ff-display text-sm font-extrabold text-[var(--color-accent)]">0{i + 1}</span>
                <p className="ff-display mt-2 text-base font-bold leading-snug">{c.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{c.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* D4. ДО → ПІСЛЯ */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{draftBeforeAfter.h2}</H2>
          <Lead>{draftBeforeAfter.lead}</Lead>
          <div className="border-t border-white/20">
            <div className="hidden grid-cols-[170px_1fr_1fr] gap-4 border-b border-white/20 py-3 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)] sm:grid">
              <span />
              <span>До</span>
              <span className="text-[var(--color-accent)]">Після</span>
            </div>
            {draftBeforeAfter.rows.map((r) => (
              <div key={r.area} className="grid gap-1.5 border-b border-white/10 py-4 text-sm sm:grid-cols-[170px_1fr_1fr] sm:gap-4 sm:py-3 sm:text-base">
                <p className="font-bold">{r.area}</p>
                <p className="text-[var(--color-muted)]"><span className="mr-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)] sm:hidden">До:</span>{r.before}</p>
                <p><span className="mr-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-accent)] sm:hidden">Після:</span>{r.after}</p>
              </div>
            ))}
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
          <InstagramShowcase ctaHref={APPLY_PROGRAM_URL} ctaLabel={draftHero.cta} />
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
              <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted-2)]">{draftGuaranteeNote}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. ДЛЯ КОГО */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>{draftFor.h2}</H2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                Підійде, якщо
              </p>
              <ul className="border-t border-white/15">
                {draftFor.forYou.map((t) => (
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
                {draftFor.notForYou.map((t) => (
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
            {[...draftFaqExtra, ...programFaqsV2.filter((f) => !FAQ_DROP.includes(f.q))].map((f) => (
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
