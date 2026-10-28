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
  forgePhilosophy,
  founder,
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

      <Section spacing="content" className="bg-[#17181b]">
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
              <p className="mt-4 text-center text-sm text-[#b9b5ab] lg:text-left">
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
                  className="text-[#5ee0d0] hover:underline"
                >
                  {founder.personalSiteLabel} →
                </a>
                <a
                  href={founder.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5ee0d0] hover:underline"
                >
                  {founder.linkedInLabel} →
                </a>
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold">{aboutSections.founder.h2}</h2>
              <p className="mb-6 leading-relaxed text-[#b9b5ab]">
                {founder.bio}
              </p>
              <blockquote className="mb-8 border-l-2 border-[#5ee0d0] pl-4 italic text-[#d2cec4]">
                «{founder.quote}»
              </blockquote>

              <h3 className="mb-4 text-lg font-semibold text-white">
                Чому я це роблю
              </h3>
              <div className="space-y-4">
                {founder.why.map((item) => (
                  <Card key={item.title} bordered>
                    <h4 className="mb-2 font-semibold text-[#5ee0d0]">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#b9b5ab]">
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
          <ul className="max-w-2xl space-y-3 text-[#b9b5ab]">
            {founder.built.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-[#5ee0d0]">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[#b9b5ab]">
            Більше про продукти та бізнеси на{" "}
            <a
              href={founder.personalSite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5ee0d0] hover:underline"
            >
              pervoy.com
            </a>
            . Forge Future окремий проєкт: тільки підлітки та їхні батьки.
          </p>
        </Container>
      </Section>

      <Section spacing="tight" className="bg-[#17181b]">
        <Container>
          <HomeLifeStrategy />
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 id="gem-roles" className="mb-4 text-2xl font-bold scroll-mt-24">
            {aboutSections.audience.h2}
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-[#b9b5ab]">
            {gemRolesDefinition.lexiconLine}
          </p>
          <p className="mb-8 max-w-2xl text-sm font-medium text-[#5ee0d0]">
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
                className="flex gap-3 text-sm leading-relaxed text-[#b9b5ab]"
              >
                <span className="text-[#5ee0d0]">→</span>
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mb-3 text-lg font-bold text-white">
            {gemRolesDefinition.diamonds.label}
          </h3>
          <p className="mb-4 max-w-2xl text-lg font-medium text-white">
            {gemRolesDefinition.diamonds.short}
          </p>
          <ul className="mb-6 max-w-2xl space-y-3">
            {gemRolesDefinition.diamonds.bullets.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-[#b9b5ab]"
              >
                <span className="text-[#5ee0d0]">→</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mb-6 max-w-2xl text-sm text-[#8e8a80]">
            {gemRolesDefinition.notThis}
          </p>
          <blockquote className="max-w-2xl border-l-2 border-[#5ee0d0]/50 pl-4 text-sm italic leading-relaxed text-[#d2cec4]">
            {gemRolesDefinition.closing}
          </blockquote>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">{aboutSections.why.h2}</h2>
          <div className="max-w-2xl space-y-4 leading-relaxed text-[#b9b5ab]">
            <p>{forgePhilosophy.body}</p>
            <p>
              Зона геніальності:{" "}
              <span className="text-[#F5F5F5]">{founder.geniusZone}</span>.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {pathPillars.map((p) => (
              <Card key={p.key} bordered className="text-sm">
                <p className="mb-1 font-semibold text-[#5ee0d0]">{p.title}</p>
                <p className="text-[#b9b5ab]">{p.desc}</p>
              </Card>
            ))}
          </div>
          <blockquote className="mt-8 max-w-2xl border-l-2 border-[#5ee0d0]/50 pl-4 text-sm italic text-[#d2cec4]">
            «{forgePhilosophy.founderLine}»
          </blockquote>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">{aboutSections.trust.h2}</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {founder.trust.map((item) => (
              <Card key={item} bordered className="text-sm text-[#b9b5ab]">
                {item}
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="end" className="bg-[#17181b]">
        <Container>
          <h2 className="mb-4 text-2xl font-bold">{aboutSections.formats.h2}</h2>
          <ul className="mb-8 space-y-3 text-[#b9b5ab]">
            <li>
              →{" "}
              <Link href="/events" className="text-[#5ee0d0] hover:underline">
                Відкриті вечори
              </Link>{" "}
              {nextOpenEvening.scheduleLine}, {venue.label}.{" "}
              <TelegramCta variant="inline">Запис</TelegramCta>
            </li>
            <li>
              →{" "}
              <Link href="/program" className="text-[#5ee0d0] hover:underline">
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
          <div className="ff-cta-stack">
            <TelegramCta>Прийти на вечір →</TelegramCta>
            <Link
              href="/program"
              className="ff-cta-link"
            >
              Для батьків
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
