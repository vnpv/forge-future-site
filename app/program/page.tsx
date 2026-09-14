import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import JsonLd from "@/components/JsonLd";
import {
  founder,
  PROGRAM_START_DATE,
  programFaqs,
  programFormat,
  programFounderBio,
  programHowItWorks,
  programNotFor,
  programOutcomes,
  programWeeks,
  twoPaths,
} from "@/lib/content";
import { programCourseSchema } from "@/lib/course-schema";
import { pageSeo } from "@/lib/page-seo";
import { pageAlternates } from "@/lib/seo";
import { APPLY_PROGRAM_URL } from "@/lib/telegram";

export const metadata: Metadata = {
  title: pageSeo.program.title,
  description: pageSeo.program.description,
  alternates: pageAlternates("/program"),
};

/** Видимий маркер незаповненого факту - щоб не вигадувати цифру */
function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-dashed border-[var(--color-accent)]/60 bg-[var(--color-accent)]/10 px-1.5 py-0.5 text-[var(--color-accent)]">
      {children}
    </span>
  );
}

export default function ProgramPage() {
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <JsonLd data={programCourseSchema} />

      {/* ============ ШАР 1 - ГОЛОС ПІДЛІТКА (білий, щільний) ============ */}

      <Section spacing="hero">
        <Container>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Forge Future · Практикум · 14-19 років
          </p>
          <h1 className="ff-display ff-reveal mb-6 max-w-3xl text-[clamp(2rem,6.5vw,3.5rem)] font-extrabold leading-[1.02] tracking-tight">
            {pageSeo.program.h1}
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            {pageSeo.program.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#zayavka"
              className="inline-flex items-center justify-center bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Подати заявку
            </a>
            <p className="text-sm text-[var(--color-muted-2)]">
              До 10 місць · старт {PROGRAM_START_DATE}
            </p>
          </div>
          <p className="mt-10 text-sm text-[var(--color-muted-2)]">
            Дитині 10-13? Для цього віку окремий продукт -{" "}
            <span className="font-medium text-[var(--color-foreground)]">Студія</span>.
          </p>
        </Container>
      </Section>

      {/* Шість тижнів - рядки з верхньою рамкою, як у Студії */}
      <Section spacing="content">
        <Container>
          <h2 className="ff-display mb-2 text-[clamp(1.6rem,4.5vw,2.4rem)] font-extrabold">
            Шість тижнів
          </h2>
          <div className="mt-8 border-t-2 border-[var(--color-foreground)] sm:mt-10">
            {programWeeks.map((w, i) => (
              <div
                key={w.week}
                className={`grid grid-cols-[56px_1fr] gap-4 border-b-2 border-[var(--color-foreground)] py-7 sm:grid-cols-[100px_1fr] sm:gap-6`}
              >
                <span className="ff-display text-3xl font-extrabold leading-none text-[var(--color-foreground)] sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="mb-2 flex flex-wrap items-baseline gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-2)]">
                      {w.week}
                    </span>
                    <span className="border border-[var(--color-foreground)]/25 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-muted-2)]">
                      {w.label}
                    </span>
                  </div>
                  <h3 className="ff-display text-lg font-bold sm:text-xl">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                    <span className="ff-week-highlight">
                      <span className="font-medium text-[var(--color-foreground)]">
                        В кінці тижня в тебе є:
                      </span>{" "}
                      {w.outcome}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Три варіанти результату - плитки з рамкою, як тайли у Студії */}
      <Section spacing="block">
        <Container>
          <h2 className="ff-display mb-2 text-[clamp(1.6rem,4.5vw,2.4rem)] font-extrabold">
            Що отримаєш за практикум
          </h2>
          <p className="mb-8 max-w-xl text-sm text-[var(--color-muted)]">
            Три варіанти результату - не тільки «стартап».
          </p>
          <div className="grid gap-px border border-[var(--color-foreground)] bg-[var(--color-foreground)] sm:grid-cols-3">
            {programOutcomes.map((o) => (
              <div
                key={o.key}
                className="flex flex-col gap-2 bg-[var(--color-background)] p-6"
              >
                <h3 className="ff-display text-lg font-bold">{o.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">{o.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============ ШАР 2 - ГОЛОС БАТЬКА (чорний, тихий) ============ */}

      <div className="bg-[#0b0b0c] text-[#f2f2f2]">
        <Section spacing="block">
          <Container>
            <h2 className="ff-display mb-6 text-[clamp(1.5rem,4vw,2.1rem)] font-bold text-white">
              {programHowItWorks.h2}
            </h2>
            <div className="max-w-2xl space-y-5">
              {programHowItWorks.paragraphs.map((p) => (
                <p key={p} className="text-base leading-relaxed text-white/60">
                  {p}
                </p>
              ))}
            </div>
          </Container>
        </Section>

        <Section spacing="block">
          <Container>
            <h2 className="ff-display mb-6 text-[clamp(1.5rem,4vw,2.1rem)] font-bold text-white">
              {programNotFor.h2}
            </h2>
            <ul className="max-w-2xl border-t border-white/15">
              {programNotFor.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-white/15 py-3.5 text-base leading-relaxed text-white/60"
                >
                  <span className="text-[var(--color-accent)]" aria-hidden>
                    -
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      </div>

      {/* ============ ШАР 3 - ЗАКРИВАЮЧА, ПРАКТИЧНА (світла) ============ */}

      <Section spacing="block" className="border-t-2 border-[var(--color-foreground)]">
        <Container>
          <h2 className="ff-display mb-6 text-[clamp(1.5rem,4vw,2.1rem)] font-extrabold">
            Хто веде
          </h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden border-2 border-[var(--color-foreground)]">
              <Image
                src={founder.photoUrl}
                alt={founder.photoAlt}
                fill
                className="object-cover object-[center_15%]"
                sizes="96px"
              />
            </div>
            <div>
              <p className="ff-display text-base font-bold text-[var(--color-foreground)]">
                {founder.fullName}
              </p>
              <p className="mt-0.5 text-sm text-[var(--color-muted-2)]">
                Засновник Forge Future
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
                {programFounderBio}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="block" className="border-t-2 border-[var(--color-foreground)]">
        <Container>
          <h2 className="ff-display mb-6 text-[clamp(1.5rem,4vw,2.1rem)] font-extrabold">
            {programFormat.h2}
          </h2>
          <dl className="max-w-2xl">
            {programFormat.facts.map((f) => (
              <div
                key={f.label}
                className="grid gap-1 border-b border-[var(--color-foreground)]/20 py-4 sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-6"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-2)]">
                  {f.label}
                </dt>
                <dd className="text-sm leading-relaxed text-[var(--color-foreground)] sm:text-base">
                  {f.value.startsWith("[ЗАПОВНИТИ") ? (
                    <Placeholder>{f.value}</Placeholder>
                  ) : (
                    f.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Q&A */}
      <Section spacing="block" className="border-t-2 border-[var(--color-foreground)]">
        <Container>
          <h2 className="ff-display mb-6 text-[clamp(1.5rem,4vw,2.1rem)] font-extrabold">
            Питання та відповіді
          </h2>
          <div className="max-w-2xl">
            {programFaqs.map((f) => (
              <details key={f.q} className="group border-b-2 border-[var(--color-foreground)] py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-medium text-[var(--color-foreground)]">
                  {f.q}
                  <span className="ff-display shrink-0 text-xl text-[var(--color-muted-2)] group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* Два шляхи */}
      <Section spacing="block" className="border-t-2 border-[var(--color-foreground)]">
        <Container>
          <h2 className="ff-display mb-6 text-[clamp(1.5rem,4vw,2.1rem)] font-extrabold">
            {twoPaths.h2}
          </h2>
          <div className="grid gap-px border border-[var(--color-foreground)]/30 bg-[var(--color-foreground)]/30 sm:grid-cols-2">
            <Link
              href="/studio"
              className="group bg-[var(--color-background)] p-6 transition-colors hover:bg-[var(--color-foreground)]/[0.03]"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-2)]">
                {twoPaths.studio.status}
              </p>
              <h3 className="ff-display mb-1 text-lg font-bold">
                {twoPaths.studio.label}, {twoPaths.studio.age}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                {twoPaths.studio.desc}
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--color-foreground)] underline-offset-2 group-hover:underline">
                Дивитись Студію →
              </p>
            </Link>
            <div className="border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/[0.06] p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]">
                {twoPaths.practicum.status}
              </p>
              <h3 className="ff-display mb-1 text-lg font-bold">
                {twoPaths.practicum.label}, {twoPaths.practicum.age}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                {twoPaths.practicum.desc}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-[var(--color-muted-2)]">
            {twoPaths.note}
          </p>
        </Container>
      </Section>

      {/* Заявка */}
      <Section spacing="end" id="zayavka" className="scroll-mt-24 border-t-2 border-[var(--color-foreground)]">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="ff-display mb-4 text-[clamp(1.7rem,5vw,2.4rem)] font-extrabold">
              Заявка на практикум
            </h2>
            <p className="mb-8 text-[var(--color-muted)]">
              Коротка заявка в Telegram - ім&apos;я і вік учасника. Зв&apos;яжемось
              протягом 1-2 днів.
            </p>
            <a
              href={APPLY_PROGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Подати заявку в Telegram
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
