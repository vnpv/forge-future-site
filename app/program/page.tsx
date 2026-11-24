import TelegramCta from "../components/TelegramCta";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "../components/Section";
import MiniCourseStrip from "../components/MiniCourseStrip";
import AuthorBlock from "../components/AuthorBlock";
import RoadmapWeeks from "./RoadmapWeeks";
import PricingSwipe from "./PricingSwipe";
import SkillIcon, { IconTile } from "../components/SkillIcon";
import Container from "../components/Container";
import JsonLd from "@/components/JsonLd";
import { reelVideoSchema } from "@/lib/instagram";
import { programCourseSchema } from "@/lib/course-schema";
import { programMetadata } from "@/lib/program-meta";
import InstagramShowcase from "../components/InstagramShowcase";
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
} from "@/lib/program-page";
import { APPLY_PROGRAM_URL } from "@/lib/telegram";

/** З ?ref=<код> canonical і og:url ведуть на той самий лінк із кодом (картка превʼю в Telegram веде за canonical), сторінка не індексується. */
export async function generateMetadata({ searchParams }: { searchParams?: Promise<{ ref?: string | string[] }> }): Promise<Metadata> {
  const raw = (await searchParams)?.ref;
  const ref = Array.isArray(raw) ? raw[0] : raw;
  if (!ref || !/^[a-z0-9]{1,16}$/i.test(ref)) return programMetadata;
  const url = `/program?ref=${ref.toLowerCase()}`;
  return {
    ...programMetadata,
    alternates: { canonical: url },
    robots: { index: false, follow: false },
    openGraph: { ...(programMetadata.openGraph ?? {}), url } as Metadata["openGraph"],
  };
}


const HERO = {
  eyebrow: "Профорієнтація через практику · 16–18 · Менторська програма «Перша справа»",
  h1: "Досі не знає, ким стати?",
  sub: "Зрозуміє через практику. За 8 тижнів.",
};
const FACTS = [
  { k: "Вік", v: "16–18", s: "10–11 клас і 1 курс" },
  { k: "Група", v: "до 10", s: "підлітків" },
  { k: "Тривалість", v: "2 міс", s: "8 тижнів" },
  { k: "Навантаження", v: "7 год", s: "на тиждень" },
  { k: "Навичка", v: "ШІ", s: "робочий інструмент", ai: true },
  { k: "Старт", v: "7.12", s: "грудень 2026" },
];
const QUOTES = [
  { q: "Чесно? Я не знаю, ким я себе бачу", who: "підліток, 17" },
  { q: "Головний страх: не реалізуватися і не бути нікимось", who: "випускник, 20" },
  { q: "Покажи мені, що ти можеш десь працювати в чомусь", who: "батько 17-річного" },
];
const CHIPS = ["розуміє себе", "обирає сам", "заробляє перші гроші", "відповідає за результат", "створює можливості"];
const FOR = {
  forYou: [
    "Підлітку 16–18: досі не знає, ким стати, або знає, але ще не перевіряв це на практиці.",
    "Ви вже вкладаєтесь в освіту й хочете, щоб дитина сама розуміла, як заробляти у своїй сфері.",
    "Ви не хочете тиснути, але хочете бачити реальний результат замість обіцянок.",
  ],
  notForYou: [
    "Шукаєте готову програму з оцінками й розкладом: тут підліток сам веде проєкт.",
    "Хочете, щоб проєкт зробили за дитину: ми допомагаємо, не замінюємо.",
    "Дитині менше 16: для молодших є хакатони.",
  ],
};
const FAQ_EXTRA = [
  { q: "Дитина вже обрала професію. Це для неї?", a: "Так. За 8 тижнів підліток перевіряє свою сферу на реальних людях і або впевнюється, або вчасно розуміє, що це не його." },
  { q: "А як же НМТ і вступ?", a: "Програма не замість навчання: близько 7 годин на тиждень. Вона допомагає обрати напрям вступу усвідомлено." },
  { q: "Навіщо тут ШІ?", a: "ШІ спрощує шлях до результату: підліток без програміста збирає продукт і вчиться використовувати ШІ як робочий інструмент, а не для списування." },
];
/** Довгі тире прибрані на цій сторінці. */
const nd = (t: string) => t.replace(/\s—\s/g, ": ").replace(/—/g, "-");

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

      {/* 1. HERO: відео на тлі, текст угорі */}
      <Section spacing="none" className="relative isolate overflow-hidden">
        <video
          src="/program-media/hero-timelapse.mp4"
          poster="/program-media/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(180deg, rgba(17,18,20,.95) 0%, rgba(17,18,20,.8) 38%, rgba(17,18,20,.25) 66%, rgba(17,18,20,.92) 100%)" }}
          aria-hidden
        />
        <Container className="relative flex min-h-[88svh] flex-col justify-between gap-10 py-10 sm:py-14">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Менторська програма «Перші гроші» · 16–18</p>
            <h1 className="ff-display mb-4 max-w-3xl text-[clamp(2.4rem,8vw,4.6rem)] font-extrabold leading-[1.02] tracking-tight">
              {HERO.h1}
            </h1>
            <p className="mb-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{HERO.sub}</p>
            <div className="ff-cta-stack gap-3">
              <Cta>{programHero.cta}</Cta>
              <p className="max-w-md text-sm text-white/60">{programHero.ctaNote}</p>
            </div>
          </div>
          <dl className="grid max-w-3xl grid-cols-3 gap-px border border-white/15 bg-white/15 backdrop-blur-sm lg:grid-cols-6">
            {FACTS.map((f) => (
              <div key={f.k} className={`px-3 py-3.5 ${f.ai ? "bg-[#12302c]/90" : "bg-[#111214]/85"}`}>
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">{f.k}</dt>
                <dd className={`ff-display mt-1 text-lg font-extrabold leading-tight ${f.ai ? "text-[var(--color-accent)]" : ""}`}>{f.v}</dd>
                <dd className="mt-0.5 text-[11px] leading-tight text-[var(--color-muted)]">{f.s}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ЗНАЙОМО? */}
      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <H2>Знайомо?</H2>
          <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:px-0">
            {QUOTES.map((q) => (
              <figure key={q.q} className="w-[80%] shrink-0 snap-start border-l-[3px] border-[var(--color-accent)] pl-4 md:w-auto">
                <blockquote className="ff-display text-xl font-bold leading-snug">«{q.q}»</blockquote>
                <figcaption className="mt-3 text-[11px] uppercase tracking-widest text-[var(--color-muted-2)]">{q.who}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-[1fr_auto_1fr] items-center gap-3">
            <p className="border border-white/15 p-4 text-sm leading-snug">Тест профорієнтації: список професій</p>
            <span className="ff-display text-xl text-[var(--color-accent)]">→</span>
            <p className="border border-[var(--color-accent)]/50 p-4 text-sm font-semibold leading-snug text-[var(--color-accent)]">Практика: власна відповідь</p>
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
          <div className="mb-8 -mt-2">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">Що змінюється у підлітка</p>
            <ul className="flex flex-wrap gap-2">
              {CHIPS.map((c) => (
                <li key={c} className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.07] px-3 py-1.5 text-sm font-semibold text-[var(--color-accent)]">
                  <span aria-hidden>→</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
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
          <RoadmapWeeks />
        </Container>
      </Section>

      {/* 8. ПАКЕТИ */}
      <Section spacing="block" className="border-t border-white/10 bg-[var(--color-surface)]">
        <Container>
          <H2>{programPricing.h2}</H2>
          <Lead>{programPricing.lead}</Lead>
          <PricingSwipe />
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
              <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted-2)]">{nd(programGuarantees.note)}</p>
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
                {FOR.forYou.map((t) => (
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
                {FOR.notForYou.map((t) => (
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
            {[...FAQ_EXTRA, ...programFaqsV2.filter((f) => !FAQ_DROP.includes(f.q))].map((f) => (
              <details key={f.q} className="group border-b border-white/20 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-medium">
                  {f.q}
                  <span className="ff-display shrink-0 text-xl text-[var(--color-accent)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">{nd(f.a)}</p>
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
            <p className="mt-5 text-sm text-[var(--color-muted-2)]">Онлайн або очно. Після розбору місце за вами 48 годин. Старт 7 грудня.</p>
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
