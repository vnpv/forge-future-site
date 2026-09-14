import Image from "next/image";
import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import Card from "../components/Card";
import ProgramApplicationForm from "../components/ProgramApplicationForm";
import JsonLd from "@/components/JsonLd";
import {
  founder,
  programFaqs,
  programFormat,
  programFounderBio,
  programGraduatesStat,
  programHowItWorks,
  programNotFor,
  programOutcomes,
  programWeeks,
  twoPaths,
} from "@/lib/content";
import { programCourseSchema } from "@/lib/course-schema";
import { pageSeo } from "@/lib/page-seo";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSeo.program.title,
  description: pageSeo.program.description,
  alternates: pageAlternates("/program"),
};

/** Видимий маркер незаповненого факту - щоб не вигадувати цифру */
function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-dashed border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 px-1.5 py-0.5 text-[var(--color-accent)]">
      {children}
    </span>
  );
}

export default function ProgramPage() {
  return (
    <div data-theme="practicum" className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <JsonLd data={programCourseSchema} />

      {/* 4.1 Верхній екран */}
      <Section spacing="hero">
        <Container>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Практикум Forge Future
          </p>
          <h1 className="mb-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-[2.75rem]">
            {pageSeo.program.h1}
          </h1>
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            {pageSeo.program.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#zayavka"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-background)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Подати заявку
            </a>
            <p className="text-sm text-[var(--color-muted-2)]">
              До 10 місць · старт{" "}
              <Placeholder>[ЗАПОВНИТИ: дата старту]</Placeholder>
            </p>
          </div>
          <p className="mt-8 text-sm text-[var(--color-muted-2)]">
            Дитині 10-13? Для цього віку буде окремий продукт, Студія.
          </p>
        </Container>
      </Section>

      {/* 4.2 Шість тижнів */}
      <Section spacing="content" className="bg-[var(--color-surface-strong)] text-white">
        <Container className="space-y-8">
          <h2 className="text-2xl font-bold">Шість тижнів</h2>
          <ol className="space-y-6">
            {programWeeks.map((w, i) => (
              <li key={w.week} className="relative pl-11 sm:pl-12">
                {i < programWeeks.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[15px] top-9 bottom-[-24px] w-px bg-white/[0.12] sm:left-[17px]"
                  />
                )}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-accent)]/50 bg-black text-xs font-bold text-[var(--color-accent)] sm:h-9 sm:w-9"
                >
                  {i + 1}
                </span>
                <Card bordered className="border-white/[0.08] bg-white/[0.04]">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                      {w.week}
                    </span>
                    <span className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/50">
                      {w.label}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    <span className="font-medium text-white/90">
                      В кінці тижня в тебе є:
                    </span>{" "}
                    {w.outcome}
                  </p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 4.3 Три варіанти результату */}
      <Section spacing="block">
        <Container>
          <h2 className="mb-2 text-2xl font-bold">Що отримаєш за практикум</h2>
          <p className="mb-8 max-w-xl text-sm text-[var(--color-muted)]">
            Три варіанти результату - не тільки «стартап».
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {programOutcomes.map((o) => (
              <Card key={o.key} bordered className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[var(--color-foreground)]">
                  {o.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">{o.desc}</p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--color-muted-2)]">
            <Placeholder>{programGraduatesStat}</Placeholder>
          </p>
        </Container>
      </Section>

      {/* 4.4 Як влаштована робота */}
      <Section spacing="block" className="bg-[var(--color-surface)]">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">{programHowItWorks.h2}</h2>
          <div className="max-w-2xl space-y-4">
            {programHowItWorks.paragraphs.map((p) => (
              <p key={p} className="text-base leading-relaxed text-[var(--color-muted)]">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4.5 Кому це не підійде */}
      <Section spacing="block">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">{programNotFor.h2}</h2>
          <ul className="max-w-2xl space-y-3">
            {programNotFor.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-base leading-relaxed text-[var(--color-muted)]"
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

      {/* 4.6 Хто веде */}
      <Section spacing="block" className="bg-[var(--color-surface)]">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">Хто веде</h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-[var(--color-foreground)]/[0.1]">
              <Image
                src={founder.photoUrl}
                alt={founder.photoAlt}
                fill
                className="object-cover object-[center_15%]"
                sizes="112px"
              />
            </div>
            <div>
              <p className="text-base font-semibold text-[var(--color-foreground)]">
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

      {/* 4.7 Формат і вартість */}
      <Section spacing="block">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">{programFormat.h2}</h2>
          <Card bordered className="max-w-2xl divide-y divide-foreground/[0.06] p-0">
            {programFormat.facts.map((f) => (
              <div
                key={f.label}
                className="grid gap-1 p-5 sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-6"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-2)]">
                  {f.label}
                </span>
                <span className="text-sm leading-relaxed text-[var(--color-foreground)] sm:text-base">
                  {f.value.startsWith("[ЗАПОВНИТИ") ? (
                    <Placeholder>{f.value}</Placeholder>
                  ) : (
                    f.value
                  )}
                </span>
              </div>
            ))}
          </Card>
        </Container>
      </Section>

      {/* Q&A */}
      <Section spacing="block" className="bg-[var(--color-surface)]">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">Питання та відповіді</h2>
          <div className="max-w-2xl space-y-4">
            {programFaqs.map((f) => (
              <Card key={f.q} bordered>
                <h3 className="mb-2 text-base font-semibold text-[var(--color-foreground)]">
                  {f.q}
                </h3>
                <p className="text-sm text-[var(--color-muted)]">{f.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4.8 Два шляхи */}
      <Section spacing="block">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">{twoPaths.h2}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--color-foreground)]/[0.1] p-5 opacity-60">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-2)]">
                {twoPaths.studio.status}
              </p>
              <h3 className="mb-1 text-lg font-bold text-[var(--color-foreground)]">
                {twoPaths.studio.label}, {twoPaths.studio.age}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                {twoPaths.studio.desc}
              </p>
            </div>
            <div className="rounded-xl border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/[0.06] p-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]">
                {twoPaths.practicum.status}
              </p>
              <h3 className="mb-1 text-lg font-bold text-[var(--color-foreground)]">
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

      {/* 4.9 Заявка */}
      <Section spacing="end" id="zayavka" className="bg-[var(--color-surface-strong)] text-white scroll-mt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl font-black sm:text-3xl">
                Заявка на практикум
              </h2>
              <p className="mb-6 max-w-md text-white/70">
                Заповни форму - зв&apos;яжемось протягом 1-2 днів. Або пиши
                одразу в Telegram, якщо так зручніше.
              </p>
              <a
                href="https://t.me/ivanpervoy_bot?start=ff_program"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm text-white transition-colors hover:bg-white/10"
              >
                Написати в Telegram →
              </a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white p-6 text-[#0a0a0a] sm:p-8">
              <ProgramApplicationForm />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
