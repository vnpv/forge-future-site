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
          <h2 className="text-2xl font-bold">Програма для підлітків: 6 тижнів</h2>
          <div className="space-y-4">
            {programWeeks.map((w) => (
              <Card key={w.week} bordered>
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
