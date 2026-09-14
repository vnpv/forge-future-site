import Image from "next/image";
import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import TelegramCta from "../components/TelegramCta";
import JsonLd from "@/components/JsonLd";
import SchoolConceptStrip from "../components/SchoolConceptStrip";
import {
  forgePhilosophy,
  founder,
  lifeStrategyArtifact,
  pageContext,
  programFaqs,
  programOffer,
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
        <Container className="mt-4">
          <SchoolConceptStrip pageHint={pageContext.program} />
        </Container>
      </Section>

      <Section spacing="block" className="bg-[#111111]">
        <Container>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e8951a]">
            {programOffer.tag}
          </p>
          <h2 className="mb-6 text-2xl font-bold">{programOffer.h2}</h2>
          <div className="grid gap-6 lg:grid-cols-[1fr_260px] lg:items-start">
            <Card bordered className="divide-y divide-white/[0.06] p-0">
              {programOffer.rows.map((r) => (
                <div
                  key={r.label}
                  className="grid gap-1 p-5 sm:grid-cols-[190px_1fr] sm:items-baseline sm:gap-6"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#8b9199]">
                    {r.label}
                  </span>
                  <span className="text-sm leading-relaxed text-white sm:text-base">
                    {r.value}
                  </span>
                </div>
              ))}
            </Card>
            <Card bordered className="border-[#e8951a]/20 bg-[#1a160f]">
              <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl sm:h-48">
                <Image
                  src={founder.photoUrl}
                  alt={founder.photoAlt}
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="260px"
                />
              </div>
              <p className="text-sm font-semibold text-white">
                {founder.fullName}
              </p>
              <p className="mt-1 text-xs text-[#8b9199]">{founder.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#9ca3af]">
                {founder.bio}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section spacing="content">
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

      <Section spacing="block" className="bg-[#111111]">
        <Container>
          <h2 className="mb-2 text-2xl font-bold">Що отримаєш за практикум</h2>
          <p className="mb-8 max-w-xl text-sm text-[#8b9199]">
            Три варіанти результату - не тільки «стартап».
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
            Тактична частина шляху: доводиш ідею до практики разом з
            ментором і групою.
          </p>
          <ul className="max-w-xl space-y-2 text-[#9CA3AF]">
            <li>
              → Артефакт{" "}
              <strong className="text-white">{lifeStrategyArtifact.name}</strong>{" "}
              - уточнюється кожен тиждень
            </li>
            <li>→ До 10 підлітків у потоці - мікрогрупа за етапом, не «всі в одному котлі»</li>
            <li>→ Чесний зворотний зв&apos;язок на кожному тижні</li>
            <li>→ 70% учасників MVP доходять до результату</li>
          </ul>
          <p className="mt-6 max-w-xl text-sm text-[#6b7280]">
            {forgePhilosophy.founderLine}
          </p>
        </Container>
      </Section>

      <Section spacing="block" className="bg-[#111111]">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">Питання та відповіді</h2>
          <div className="max-w-2xl space-y-4">
            {programFaqs.map((f) => (
              <Card key={f.q} bordered>
                <h3 className="mb-2 text-base font-semibold text-white">
                  {f.q}
                </h3>
                <p className="text-sm text-[#9CA3AF]">{f.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="end" className="bg-[#111111]">
        <Container>
          <div className="rounded-3xl border border-[#e8951a]/20 bg-[#e8951a]/5 p-10 sm:p-14">
            <h2 className="mb-4 text-2xl font-black sm:text-3xl">
              Заявка на програму
            </h2>
            <p className="mb-4 max-w-lg text-[#9CA3AF]">
              Заповни коротку форму в Telegram - ім&apos;я та вік учасника.
              Напишемо після розгляду заявки.
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
