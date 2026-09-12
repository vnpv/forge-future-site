import Link from "next/link";
import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import TelegramCta from "../components/TelegramCta";
import JsonLd from "@/components/JsonLd";
import SchoolConceptStrip from "../components/SchoolConceptStrip";
import {
  audiencePageCopy,
  forgePhilosophy,
  lifeStrategyArtifact,
  pageContext,
  programOutcomes,
  programWeeks,
  schoolOfFutureDiamonds,
} from "@/lib/content";
import { programCourseSchema } from "@/lib/course-schema";
import { pageSeo } from "@/lib/page-seo";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSeo.program.title,
  description: pageSeo.program.description,
  alternates: pageAlternates("/program"),
};

export default function ProgramPage() {
  return (
    <>
      <JsonLd data={programCourseSchema} />
      <Section spacing="hero">
        <PageHeader
          label={schoolOfFutureDiamonds.name}
          title={pageSeo.program.h1}
          subtitle={pageSeo.program.subtitle}
        >
          <TelegramCta flow="program" location="program_header">
            Подати заявку на програму
          </TelegramCta>
        </PageHeader>
        <Container className="mt-4 space-y-4">
          <SchoolConceptStrip pageHint={pageContext.program} />
          <p className="text-sm text-[#8b9199]">{audiencePageCopy.program}</p>
        </Container>
      </Section>

      <Section spacing="content" className="bg-[#111111]">
        <Container className="space-y-8">
          <h2 className="text-2xl font-bold">Дорожня карта: 6 тижнів</h2>
          <ol className="space-y-6">
            {programWeeks.map((w, i) => (
              <li key={w.week} className="relative pl-11 sm:pl-12">
                {i < programWeeks.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[15px] top-9 bottom-[-24px] w-px bg-white/[0.08] sm:left-[17px]"
                  />
                )}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#e8951a]/40 bg-[#141414] text-xs font-bold text-[#e8951a] sm:h-9 sm:w-9"
                >
                  {i + 1}
                </span>
                <Card bordered>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#e8951a]">
                      {w.week}
                    </span>
                    <h3 className="text-lg font-bold text-white">{w.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
                    {w.desc}
                  </p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="mb-2 text-2xl font-bold">Що отримаєш за 6 тижнів</h2>
          <p className="mb-8 max-w-xl text-sm text-[#8b9199]">
            Три варіанти результату — не тільки «стартап».
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {programOutcomes.map((o) => (
              <Card key={o.key} bordered className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-white">{o.title}</h3>
                <p className="text-sm leading-relaxed text-[#8b9199]">
                  {o.desc}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">Формат потоку</h2>
          <p className="mb-4 max-w-xl text-sm leading-relaxed text-[#9CA3AF]">
            Програма — тактична частина: ти вже маєш або формуєш{" "}
            <strong className="text-white">{lifeStrategyArtifact.name}</strong>.
            Ми допомагаємо прожити її через реальний проєкт.
          </p>
          <ul className="max-w-xl space-y-2 text-[#9CA3AF]">
            <li>
              → Артефакт{" "}
              <strong className="text-white">{lifeStrategyArtifact.name}</strong>{" "}
              — уточнюється кожен тиждень
            </li>
            <li>→ До 10 підлітків у потоці — мікрогрупа за етапом, не «всі в одному котлі»</li>
            <li>→ Чесний зворотний зв&apos;язок на кожному тижні</li>
            <li>→ Від $500 з сім&apos;ї за потік (уточнимо після заявки)</li>
            <li>→ 70% учасників MVP доходять до результату</li>
            <li>
              → Бажано спочатку{" "}
              <Link href="/events" className="text-[#e8951a] hover:underline">
                відкритий вечір
              </Link>
              , щоб познайомитись
            </li>
          </ul>
          <p className="mt-6 max-w-xl text-sm text-[#6b7280]">
            {forgePhilosophy.founderLine}
          </p>
        </Container>
      </Section>

      <Section spacing="end" className="bg-[#111111]">
        <Container>
          <div className="rounded-3xl border border-[#e8951a]/20 bg-[#e8951a]/5 p-10 sm:p-14">
            <h2 className="mb-4 text-2xl font-black sm:text-3xl">
              Заявка на програму
            </h2>
            <p className="mb-4 max-w-lg text-[#9CA3AF]">
              Заповни коротку форму в Telegram — ім&apos;я та вік учасника.
              Напишемо після розгляду заявки.
            </p>
            <p className="mb-8 text-sm text-[#6b7280]">
              Ще не був на вечорі?{" "}
              <Link href="/events" className="text-[#e8951a] hover:underline">
                Запис на відкритий вечір
              </Link>{" "}
              — окремий крок, безкоштовно.
            </p>
            <TelegramCta flow="program" location="program_footer">
              Подати заявку в Telegram →
            </TelegramCta>
          </div>
        </Container>
      </Section>
    </>
  );
}
