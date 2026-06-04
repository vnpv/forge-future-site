import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import TelegramCta, {
  TelegramCommunityLink,
  TelegramIvanChannelLink,
} from "../components/TelegramCta";
import JsonLd from "@/components/JsonLd";
import HomeLifeStrategy from "../components/HomeLifeStrategy";
import {
  gemRolesDefinition,
  diamondLexicon,
  forgePhilosophy,
  founder,
  lifeStrategyArtifact,
  nextOpenEvening,
  pathPillars,
  schoolOfFutureDiamonds,
  venue,
} from "@/lib/content";
import { aboutSections, pageSeo } from "@/lib/page-seo";
import { pageAlternates } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: pageSeo.about.title,
  description: pageSeo.about.description,
  alternates: pageAlternates("/about"),
  authors: [{ name: founder.fullName, url: founder.personalSite }],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: founder.fullName,
  jobTitle: founder.role,
  image: `${SITE_URL}${founder.photoUrl}`,
  url: founder.personalSite,
  sameAs: [founder.personalSite, founder.linkedIn],
  worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  description: founder.bio,
  knowsAbout: [
    "альтернативне навчання",
    "власні проєкти для підлітків",
    "менторство",
    "продуктовий менеджмент",
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema} />
      <Section spacing="hero">
        <PageHeader
          label={schoolOfFutureDiamonds.name}
          title={pageSeo.about.h1}
          subtitle={pageSeo.about.subtitle}
        />
      </Section>

      <Section spacing="content" className="bg-[#111111]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
            <div className="mx-auto w-full max-w-[280px] lg:mx-0">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={founder.photoUrl}
                  alt={founder.photoAlt}
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="280px"
                  priority
                />
              </div>
              <p className="mt-4 text-center text-sm text-[#9CA3AF] lg:text-left">
                <span className="font-semibold text-white">
                  {founder.fullName}
                </span>
                <br />
                {founder.tagline}
              </p>
              <p className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm lg:justify-start">
                <a
                  href={founder.personalSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F59E0B] hover:underline"
                >
                  {founder.personalSiteLabel} →
                </a>
                <a
                  href={founder.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F59E0B] hover:underline"
                >
                  {founder.linkedInLabel} →
                </a>
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold">{aboutSections.founder.h2}</h2>
              <p className="mb-6 leading-relaxed text-[#9CA3AF]">
                {founder.bio}
              </p>
              <blockquote className="mb-8 border-l-2 border-[#F59E0B] pl-4 italic text-[#D1D5DB]">
                «{founder.quote}»
              </blockquote>

              <h3 className="mb-4 text-lg font-semibold text-white">
                Чому я це роблю
              </h3>
              <div className="space-y-4">
                {founder.why.map((item) => (
                  <Card key={item.title} bordered>
                    <h4 className="mb-2 font-semibold text-[#F59E0B]">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#9CA3AF]">
                      {item.text}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">{aboutSections.built.h2}</h2>
          <ul className="max-w-2xl space-y-3 text-[#9CA3AF]">
            {founder.built.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-[#F59E0B]">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[#9CA3AF]">
            Більше про продукти та бізнеси на{" "}
            <a
              href={founder.personalSite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F59E0B] hover:underline"
            >
              pervoy.com
            </a>
            . Forge Future окремий проєкт: тільки підлітки та їхні батьки.
          </p>
        </Container>
      </Section>

      <Section spacing="tight" className="bg-[#111111]">
        <Container>
          <HomeLifeStrategy />
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 id="gem-roles" className="mb-4 text-2xl font-bold scroll-mt-24">
            {aboutSections.audience.h2}
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-[#9CA3AF]">
            {gemRolesDefinition.lexiconLine}
          </p>
          <p className="mb-8 max-w-2xl text-sm font-medium text-[#e8951a]">
            {gemRolesDefinition.path}
          </p>

          <h3 className="mb-3 text-lg font-bold text-white">
            {gemRolesDefinition.gems.label}
          </h3>
          <p className="mb-4 max-w-2xl text-lg font-medium text-white">
            {gemRolesDefinition.gems.short}
          </p>
          <ul className="mb-8 max-w-2xl space-y-3">
            {gemRolesDefinition.gems.bullets.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-[#9CA3AF]"
              >
                <span className="text-[#F59E0B]">→</span>
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mb-3 text-lg font-bold text-white">
            {gemRolesDefinition.diamonds.label}
          </h3>
          <p className="mb-4 max-w-2xl text-sm text-[#9CA3AF]">
            Після «{lifeStrategyArtifact.name}» — ти {diamondLexicon.diamondsLabel.toLowerCase()}.
          </p>
          <p className="mb-4 max-w-2xl text-lg font-medium text-white">
            {gemRolesDefinition.diamonds.short}
          </p>
          <ul className="mb-6 max-w-2xl space-y-3">
            {gemRolesDefinition.diamonds.bullets.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-[#9CA3AF]"
              >
                <span className="text-[#F59E0B]">→</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mb-6 max-w-2xl text-sm text-[#6b7280]">
            {gemRolesDefinition.notThis}
          </p>
          <blockquote className="max-w-2xl border-l-2 border-[#F59E0B]/50 pl-4 text-sm italic leading-relaxed text-[#D1D5DB]">
            {gemRolesDefinition.closing}
          </blockquote>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">{aboutSections.why.h2}</h2>
          <div className="max-w-2xl space-y-4 leading-relaxed text-[#9CA3AF]">
            <p>{forgePhilosophy.body}</p>
            <p>
              Зона геніальності:{" "}
              <span className="text-[#F5F5F5]">{founder.geniusZone}</span>.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {pathPillars.map((p) => (
              <Card key={p.key} bordered className="text-sm">
                <p className="mb-1 font-semibold text-[#F59E0B]">{p.title}</p>
                <p className="text-[#9CA3AF]">{p.desc}</p>
              </Card>
            ))}
          </div>
          <blockquote className="mt-8 max-w-2xl border-l-2 border-[#F59E0B]/50 pl-4 text-sm italic text-[#D1D5DB]">
            «{forgePhilosophy.founderLine}»
          </blockquote>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">{aboutSections.trust.h2}</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {founder.trust.map((item) => (
              <Card key={item} bordered className="text-sm text-[#9CA3AF]">
                {item}
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="end" className="bg-[#111111]">
        <Container>
          <h2 className="mb-4 text-2xl font-bold">{aboutSections.formats.h2}</h2>
          <ul className="mb-8 space-y-3 text-[#9CA3AF]">
            <li>
              →{" "}
              <Link href="/events" className="text-[#F59E0B] hover:underline">
                Відкриті вечори
              </Link>{" "}
              {nextOpenEvening.scheduleLine}, {venue.label}.{" "}
              <TelegramCta variant="inline">Запис</TelegramCta>
            </li>
            <li>
              →{" "}
              <Link href="/program" className="text-[#F59E0B] hover:underline">
                6-тижнева програма
              </Link>{" "}
              до 10 підлітків у потоці
            </li>
            <li>
              →{" "}
              <TelegramIvanChannelLink location="about" /> ·{" "}
              <TelegramCommunityLink location="about" />
            </li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <TelegramCta>Прийти на вечір →</TelegramCta>
            <Link
              href="/for-parents"
              className="inline-flex items-center rounded-full border border-white/20 px-7 py-3.5 text-sm text-white hover:bg-white/5"
            >
              Для батьків
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
