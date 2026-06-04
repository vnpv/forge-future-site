import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "./components/Section";
import Container from "./components/Container";
import Card from "./components/Card";
import AmbitiousAudienceBlock from "./components/AmbitiousAudienceBlock";
import HomeHero from "./components/HomeHero";
import HomeHeroDetails from "./components/HomeHeroDetails";
import HomeForgeGem from "./components/HomeForgeGem";
import LifeStrategyTeaser from "./components/LifeStrategyTeaser";
import HomeSpotlight from "./components/HomeSpotlight";
import HomeExploreGrid from "./components/HomeExploreGrid";
import HomePathLevels from "./components/HomePathLevels";
import TelegramCta, {
  TelegramCommunityLink,
  TelegramIvanChannelLink,
} from "./components/TelegramCta";
import {
  ambitiousAudience,
  closedCommunity,
  eventGallery,
  founder,
  nextOpenEvening,
  openEveningsNote,
  schoolOfFutureDiamonds,
  stats,
} from "@/lib/content";
import { pageSeo, homeSections } from "@/lib/page-seo";
import { pageAlternates } from "@/lib/seo";
import { OG_IMAGE_VERSION, SITE_URL } from "@/lib/site";

const seo = pageSeo.home;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: pageAlternates("/"),
  openGraph: {
    title: seo.ogTitle,
    description: seo.description,
    url: SITE_URL,
    images: [
      {
        url: `/images/og-forge-future-1200x630.webp?v=${OG_IMAGE_VERSION}`,
        width: 1200,
        height: 630,
        alt: "Forge Future — Школа майбутніх Діамантів",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.description,
  },
};

export default function Home() {
  return (
    <>
      <Section
        spacing="none"
        className="relative overflow-hidden pt-10 pb-2 sm:pt-14 sm:pb-4 ff-hero-glow"
      >
        <Container className="relative">
          <HomeHero />
          <div className="mt-8 border-t border-white/[0.06] pt-7 sm:mt-10 sm:pt-8">
            <HomeHeroDetails />
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-8 pt-4 sm:pb-10 sm:pt-6">
        <Container>
          <HomeSpotlight />
        </Container>
      </Section>

      <Section spacing="block">
        <Container className="space-y-10">
          <HomeForgeGem />
          <LifeStrategyTeaser />
          <HomePathLevels />
        </Container>
      </Section>

      <Section spacing="alt" className="ff-section-alt">
        <Container>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
            {homeSections.explore.h2}
          </h2>
          <p className="mb-8 max-w-xl text-sm text-[#8b9199]">
            {homeSections.explore.lead}
          </p>
          <HomeExploreGrid />
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
            {homeSections.audience.h2}
          </h2>
          <p className="mb-6 max-w-xl text-sm text-[#8b9199]">
            {homeSections.audience.lead} {nextOpenEvening.scheduleLine}.
          </p>
          <div className="mb-8">
            <AmbitiousAudienceBlock />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card bordered className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#e8951a]">
                {homeSections.teenCard.label}
              </p>
              <h3 className="text-xl font-semibold text-white">
                {homeSections.teenCard.h3}
              </h3>
              <p className="text-sm leading-relaxed text-[#8b9199]">
                {schoolOfFutureDiamonds.forTeen}
              </p>
              <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Link
                  href="/events"
                  className="text-sm font-medium text-[#e8951a] hover:underline"
                >
                  Відкриті вечори →
                </Link>
                <Link
                  href="/program"
                  className="text-sm font-medium text-[#8b9199] hover:text-[#e8951a] hover:underline"
                >
                  Програма →
                </Link>
              </div>
            </Card>
            <Card bordered className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#e8951a]">
                {homeSections.parentCard.label}
              </p>
              <h3 className="text-xl font-semibold text-white">
                {homeSections.parentCard.h3}
              </h3>
              <p className="text-sm leading-relaxed text-[#8b9199]">
                Запис через бота. На вечір приходять підлітки самі.
              </p>
              <div className="mt-auto flex flex-col gap-2">
                <Link
                  href="/for-parents"
                  className="text-sm font-medium text-[#e8951a] hover:underline"
                >
                  Для батьків →
                </Link>
                <Link
                  href="/faq"
                  className="text-sm text-[#8b9199] hover:text-[#e8951a] hover:underline"
                >
                  FAQ →
                </Link>
              </div>
            </Card>
            <Card
              bordered
              className="flex flex-col gap-4 border-[#e8951a]/20 bg-[#1a160f] sm:col-span-2 lg:col-span-1"
            >
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#e8951a]">
                {homeSections.programCard.label}
              </p>
              <h3 className="text-xl font-semibold text-white">
                {homeSections.programCard.h3}
              </h3>
              <p className="text-sm leading-relaxed text-[#8b9199]">
                До 10 місць у потоці. Від Discovery до демо-дня.
              </p>
              <Link
                href="/program"
                className="mt-auto inline-flex items-center justify-center rounded-lg bg-[#e8951a]/15 px-4 py-2.5 text-sm font-semibold text-[#e8951a] transition-colors hover:bg-[#e8951a]/25"
              >
                Дивитись програму →
              </Link>
            </Card>
          </div>
        </Container>
      </Section>

      <Section spacing="alt" className="ff-section-alt">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
            <div>
              <h2 className="mb-5 text-2xl font-bold sm:text-3xl">
                {homeSections.aboutForge.h2}
              </h2>
              <div className="max-w-2xl space-y-4 text-[#8b9199] leading-relaxed">
                <p>{homeSections.aboutForge.lead}</p>
                <p>
                  Деталі концепції — на сторінці{" "}
                  <Link href="/about" className="text-[#e8951a] hover:underline">
                    Про нас
                  </Link>
                  .
                </p>
                <p className="text-sm">{openEveningsNote}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Link
                  href="/about"
                  className="font-medium text-[#e8951a] hover:underline"
                >
                  Про засновника →
                </Link>
                <Link
                  href="/blog"
                  className="text-[#8b9199] hover:text-[#e8951a] hover:underline"
                >
                  Блог →
                </Link>
              </div>
            </div>
            <Card bordered className="border-[#e8951a]/20 bg-[#1a160f]">
              <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={founder.photoUrl}
                  alt=""
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="64px"
                />
              </div>
              <p className="text-sm italic leading-relaxed text-[#d1d5db]">
                «{founder.quote}»
              </p>
              <p className="mt-3 text-xs text-[#8b9199]">
                <Link href="/about" className="text-[#e8951a] hover:underline">
                  {founder.fullName}
                </Link>
                , засновник
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                {homeSections.results.h2}
              </h2>
              <p className="mt-2 text-sm text-[#8b9199]">
                {homeSections.results.lead}
              </p>
            </div>
            <Link
              href="/program"
              className="text-sm font-medium text-[#e8951a] hover:underline"
            >
              Деталі програми →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {stats.map((s) => (
              <Card key={s.label} bordered className="text-center">
                <p className="text-3xl font-bold tabular-nums text-[#e8951a]">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-[#8b9199]">{s.label}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {eventGallery.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/[0.06]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-[#6b7280]">
            Фото зі студії засновника.{" "}
            <Link href="/about" className="text-[#e8951a] hover:underline">
              Про Forge Future
            </Link>
            . Кейси з вечорів — на{" "}
            <Link href="/events" className="text-[#e8951a] hover:underline">
              сторінці вечорів
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section spacing="end">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                {homeSections.evening.h2}
              </h2>
              <p className="mb-4 max-w-lg text-sm text-[#8b9199]">
                {homeSections.evening.lead}
              </p>
              <Card bordered>
                <p className="mb-3 font-semibold text-white">
                  {nextOpenEvening.title}
                </p>
                <ul className="mb-6 space-y-1.5 text-sm text-[#8b9199]">
                  <li>{nextOpenEvening.scheduleLine}</li>
                  <li>{nextOpenEvening.location}</li>
                  <li>{nextOpenEvening.duration}</li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <TelegramCta location="home_evening">Записатись</TelegramCta>
                  <Link
                    href="/events"
                    className="inline-flex items-center rounded-lg border border-white/[0.1] px-5 py-2.5 text-sm hover:bg-white/[0.03]"
                  >
                    Програма вечора
                  </Link>
                  <Link
                    href="/program"
                    className="inline-flex items-center rounded-lg px-5 py-2.5 text-sm text-[#e8951a] hover:underline"
                  >
                    Програма 6 тижнів →
                  </Link>
                </div>
              </Card>
            </div>
            <div className="flex flex-col gap-5">
              <Card bordered className="border-[#e8951a]/25 bg-[#1a160f]">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#e8951a]">
                  {closedCommunity.title}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-[#8b9199]">
                  {closedCommunity.short}
                </p>
                <TelegramCommunityLink
                  className="text-sm font-medium"
                  location="home_community"
                />
              </Card>
              <Card bordered>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#8b9199]">
                  Ще
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/faq"
                      className="text-[#e8951a] hover:underline"
                    >
                      Питання та відповіді →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-[#8b9199] hover:text-[#e8951a] hover:underline"
                    >
                      Блог Forge Future →
                    </Link>
                  </li>
                  <li>
                    <TelegramIvanChannelLink
                      className="text-[#8b9199] hover:text-[#e8951a]"
                      location="home_sidebar"
                    />
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
