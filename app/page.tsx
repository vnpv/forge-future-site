import Link from "next/link";
import type { Metadata } from "next";
import Section from "./components/Section";
import Container from "./components/Container";
import HomeHero from "./components/HomeHero";
import HomeHeroDetails from "./components/HomeHeroDetails";
import HomeForgeGem from "./components/HomeForgeGem";
import HomeSpotlight from "./components/HomeSpotlight";
import HomeExploreGrid from "./components/HomeExploreGrid";
import TelegramCta, {
  TelegramCommunityLink,
  TelegramIvanChannelLink,
} from "./components/TelegramCta";
import {
  closedCommunity,
  homeTwoPaths,
  nextOpenEvening,
  openEveningsNote,
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
        alt: "Forge Future - Школа майбутніх Діамантів",
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
        <Container>
          <HomeForgeGem />
        </Container>
      </Section>

      {/* Два шляхи далі - огляд, без дубля деталей з /studio і /program */}
      <Section spacing="alt" className="ff-section-alt">
        <Container>
          <h2 className="ff-display mb-2 text-2xl font-extrabold sm:text-3xl">
            {homeTwoPaths.h2}
          </h2>
          <p className="mb-8 max-w-xl text-sm text-[#8b9199]">
            {homeTwoPaths.lead}
          </p>
          <div className="grid gap-px border-2 border-white/[0.1] bg-white/[0.1] sm:grid-cols-2">
            <Link
              href={homeTwoPaths.studio.href}
              className="group bg-[#0c0c0c] p-6 transition-colors hover:bg-white/[0.03] sm:p-7"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                {homeTwoPaths.studio.age}
              </p>
              <h3 className="ff-display mb-2 text-xl font-bold text-white">
                {homeTwoPaths.studio.label}
              </h3>
              <p className="text-sm leading-relaxed text-[#8b9199]">
                {homeTwoPaths.studio.desc}
              </p>
              <p className="mt-4 text-sm font-medium text-[#e8951a] group-hover:underline">
                Дивитись Студію →
              </p>
            </Link>
            <Link
              href={homeTwoPaths.practicum.href}
              className="group bg-[#0c0c0c] p-6 transition-colors hover:bg-white/[0.03] sm:p-7"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                {homeTwoPaths.practicum.age}
              </p>
              <h3 className="ff-display mb-2 text-xl font-bold text-white">
                {homeTwoPaths.practicum.label}
              </h3>
              <p className="text-sm leading-relaxed text-[#8b9199]">
                {homeTwoPaths.practicum.desc}
              </p>
              <p className="mt-4 text-sm font-medium text-[#e8951a] group-hover:underline">
                Дивитись Практикум →
              </p>
            </Link>
          </div>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="ff-display mb-2 text-2xl font-extrabold sm:text-3xl">
            {homeSections.explore.h2}
          </h2>
          <p className="mb-8 max-w-xl text-sm text-[#8b9199]">
            {homeSections.explore.lead}
          </p>
          <HomeExploreGrid />
        </Container>
      </Section>

      <Section spacing="alt" className="ff-section-alt">
        <Container>
          <h2 className="ff-display mb-5 text-2xl font-extrabold sm:text-3xl">
            {homeSections.aboutForge.h2}
          </h2>
          <div className="max-w-2xl space-y-4 text-[#8b9199] leading-relaxed">
            <p>{homeSections.aboutForge.lead}</p>
            <p>
              Деталі концепції - на сторінці{" "}
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
          </div>
        </Container>
      </Section>

      <Section spacing="end">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="ff-display mb-4 text-2xl font-extrabold sm:text-3xl">
                {homeSections.evening.h2}
              </h2>
              <p className="mb-4 max-w-lg text-sm text-[#8b9199]">
                {homeSections.evening.lead}
              </p>
              <div className="border-2 border-white/[0.08] bg-[#141414] p-6">
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
                    className="inline-flex items-center border-2 border-white/[0.1] px-5 py-2.5 text-sm hover:bg-white/[0.03]"
                  >
                    Програма вечора
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="border-2 border-[#e8951a]/25 bg-[#1a160f] p-6">
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
              </div>
              <div className="border-2 border-white/[0.08] bg-[#141414] p-6">
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
                    <TelegramIvanChannelLink
                      className="text-[#8b9199] hover:text-[#e8951a]"
                      location="home_sidebar"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
