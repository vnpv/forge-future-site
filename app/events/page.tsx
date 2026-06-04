import Link from "next/link";
import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import TelegramCta, { TelegramCommunityLink } from "../components/TelegramCta";
import JsonLd from "@/components/JsonLd";
import SchoolConceptStrip from "../components/SchoolConceptStrip";
import {
  audiencePageCopy,
  closedCommunity,
  pageContext,
  nextOpenEvening,
  openEveningsNote,
  pastEvenings,
  plannedEveningCities,
  schoolOfFutureDiamonds,
} from "@/lib/content";
import { pageSeo } from "@/lib/page-seo";
import { pageAlternates } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: pageSeo.events.title,
  description: pageSeo.events.description,
  alternates: pageAlternates("/events"),
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: nextOpenEvening.title,
  description: nextOpenEvening.description,
  startDate: nextOpenEvening.schemaStart,
  endDate: nextOpenEvening.schemaEnd,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: nextOpenEvening.location,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Біла Церква",
      addressCountry: "UA",
    },
  },
  organizer: { "@type": "Organization", name: "Forge Future", url: SITE_URL },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "UAH",
    availability: "https://schema.org/InStock",
  },
  isAccessibleForFree: true,
};

export default function EventsPage() {
  return (
    <>
      <JsonLd data={eventSchema} />
      <Section spacing="hero">
        <PageHeader
          label={schoolOfFutureDiamonds.name}
          title={pageSeo.events.h1}
          subtitle={pageSeo.events.subtitle}
        />
        <Container className="mt-4 space-y-4">
          <SchoolConceptStrip pageHint={pageContext.events} />
          <p className="text-sm text-[#8b9199]">{audiencePageCopy.events}</p>
        </Container>
      </Section>

      <Section spacing="content" className="bg-[#111111]">
        <Container className="space-y-6">
          <div className="rounded-3xl border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-8 sm:p-12">
            <span className="mb-4 inline-block rounded-full bg-[#F59E0B] px-3 py-1 text-xs font-bold text-[#0D0D0D]">
              НАСТУПНИЙ
            </span>
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              {nextOpenEvening.title}
            </h2>
            <ul className="mb-8 space-y-2 text-[#9CA3AF]">
              <li>📅 {nextOpenEvening.scheduleLine}</li>
              <li>🕖 {nextOpenEvening.duration}</li>
              <li>📍 {nextOpenEvening.location}</li>
            </ul>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F59E0B]">
              Як проходить вечір
            </h3>
            <ul className="mb-8 space-y-2">
              {nextOpenEvening.agenda.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-[#9CA3AF]">
                  <span className="text-[#F59E0B]">→</span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mb-2 text-sm text-[#9CA3AF]">
              {nextOpenEvening.registration}
            </p>
            <p className="mb-3 text-sm text-[#8b9199]">{closedCommunity.short}</p>
            <p className="mb-6 text-sm text-[#9CA3AF]">
              На вечір — <strong className="text-[#f2f2f2]">тільки підлітки</strong>{" "}
              (самі, без батьків).
              Батьки записують через бота. Після вечора — група «Відкритий Вечір».
              Нагадування в Telegram за день до зустрічі.
            </p>
            <div className="flex flex-wrap gap-3">
              <TelegramCta location="events_hero">Записатись на вечір →</TelegramCta>
              <TelegramCommunityLink className="inline-flex items-center text-sm font-medium">
                Після вечора: {closedCommunity.title} →
              </TelegramCommunityLink>
            </div>
            <p className="mt-6">
              <Link
                href="/for-parents"
                className="text-sm text-[#9CA3AF] hover:text-white"
              >
                Для батьків →
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="alt" className="ff-section-alt">
        <Container>
          <h2 className="mb-2 text-xl font-bold sm:text-2xl">Міста</h2>
          <p className="mb-6 max-w-xl text-sm text-[#8b9199]">
            {openEveningsNote}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plannedEveningCities.map((c) => (
              <Card
                key={c.city}
                bordered
                className={
                  c.status === "active"
                    ? "border-[#e8951a]/30"
                    : "border-dashed border-white/10"
                }
              >
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-semibold text-white">{c.city}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      c.status === "active"
                        ? "bg-[#e8951a] text-[#0c0c0c]"
                        : "border border-white/15 text-[#8b9199]"
                    }`}
                  >
                    {c.status === "active" ? "Зараз" : "Скоро"}
                  </span>
                </div>
                <p className="text-sm text-[#8b9199]">{c.note}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="end">
        <Container>
          <h2 className="mb-8 text-xl font-bold">Попередні вечори</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {pastEvenings.map((e) => (
              <Card key={e.date} bordered>
                <p className="mb-1 text-xs text-[#9CA3AF]">{e.date}</p>
                <h3 className="mb-2 font-semibold text-white">{e.title}</h3>
                <p className="mb-2 text-xs text-[#6b7280]">{e.location}</p>
                <p className="text-sm text-[#9CA3AF]">{e.recap}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
