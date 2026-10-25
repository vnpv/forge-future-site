import Link from "next/link";
import type { Metadata } from "next";
import Section from "./components/Section";
import Container from "./components/Container";
import HomeHero from "./components/HomeHero";
import HomeSpotlight from "./components/HomeSpotlight";
import HomeExploreGrid from "./components/HomeExploreGrid";
import InstagramInterviews from "./components/InstagramInterviews";
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
        alt: "Forge Future - практикум для підлітків",
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
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {homeSections.howItWorks.tag}
          </p>
          <h2 className="ff-display mb-3 text-2xl font-extrabold sm:text-3xl">{homeSections.howItWorks.h2}</h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[#b9b5ab] sm:text-base">
            {homeSections.howItWorks.lead}
          </p>
          <div className="grid gap-px border-2 border-white/[0.1] bg-white/[0.1] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Розбір 20 хвилин", d: "Ви розповідаєте про дитину, я ставлю питання. Наприкінці скажу, що бачу, і запропоную крок." },
              { n: "02", t: "Місце за вами 48 годин", d: "Час подумати і порадитись із дитиною. Група не більше 10." },
              { n: "03", t: "6 тижнів практикуму", d: "Власний проєкт підлітка, один результат на тиждень, щотижневий апдейт вам." },
              { n: "04", t: "Demo Day", d: "Підліток сам презентує проєкт. Лишається запис і сторінка проєкту." },
            ].map((x) => (
              <div key={x.n} className="flex flex-col gap-2 bg-[#111214] p-6">
                <span className="ff-display text-2xl font-extrabold text-[var(--color-accent)]">{x.n}</span>
                <h3 className="ff-display text-base font-bold">{x.t}</h3>
                <p className="text-sm leading-relaxed text-[#b9b5ab]">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <TelegramCta flow="program" location="home_steps">
              Записатися на розбір
            </TelegramCta>
            <Link href="/program" className="text-sm font-medium text-[var(--color-accent)] hover:underline">
              Уся програма →
            </Link>
          </div>
        </Container>
      </Section>

      <Section spacing="block" className="border-t border-white/10">
        <Container>
          <InstagramInterviews />
        </Container>
      </Section>

      {/* Два шляхи далі - огляд, без дубля деталей з /studio і /program */}
      <Section spacing="alt" className="ff-section-alt">
        <Container>
          <h2 className="ff-display mb-2 text-2xl font-extrabold sm:text-3xl">
            {homeTwoPaths.h2}
          </h2>
          <p className="mb-8 max-w-xl text-sm text-[#b9b5ab]">
            {homeTwoPaths.lead}
          </p>
          <div className="grid gap-px border-2 border-white/[0.1] bg-white/[0.1] sm:grid-cols-2">
            <Link
              href={homeTwoPaths.studio.href}
              className="group bg-[#111214] p-6 transition-colors hover:bg-white/[0.03] sm:p-7"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#8e8a80]">
                {homeTwoPaths.studio.age}
              </p>
              <h3 className="ff-display mb-2 text-xl font-bold text-white">
                {homeTwoPaths.studio.label}
              </h3>
              <p className="text-sm leading-relaxed text-[#b9b5ab]">
                {homeTwoPaths.studio.desc}
              </p>
              <p className="mt-4 text-sm font-medium text-[#5ee0d0] group-hover:underline">
                Дивитись Студію →
              </p>
            </Link>
            <Link
              href={homeTwoPaths.practicum.href}
              className="group bg-[#111214] p-6 transition-colors hover:bg-white/[0.03] sm:p-7"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#8e8a80]">
                {homeTwoPaths.practicum.age}
              </p>
              <h3 className="ff-display mb-2 text-xl font-bold text-white">
                {homeTwoPaths.practicum.label}
              </h3>
              <p className="text-sm leading-relaxed text-[#b9b5ab]">
                {homeTwoPaths.practicum.desc}
              </p>
              <p className="mt-4 text-sm font-medium text-[#5ee0d0] group-hover:underline">
                Дивитись Практикум →
              </p>
            </Link>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-8 pt-8 sm:pb-10 sm:pt-12">
        <Container>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#8e8a80]">
            Для підлітків: безкоштовний вечір
          </p>
          <HomeSpotlight />
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="ff-display mb-2 text-2xl font-extrabold sm:text-3xl">
            {homeSections.explore.h2}
          </h2>
          <p className="mb-8 max-w-xl text-sm text-[#b9b5ab]">
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
          <div className="max-w-2xl space-y-4 text-[#b9b5ab] leading-relaxed">
            <p>{homeSections.aboutForge.lead}</p>
            <p>
              Деталі концепції - на сторінці{" "}
              <Link href="/about" className="text-[#5ee0d0] hover:underline">
                Про нас
              </Link>
              .
            </p>
            <p className="text-sm">{openEveningsNote}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link
              href="/about"
              className="font-medium text-[#5ee0d0] hover:underline"
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
              <p className="mb-4 max-w-lg text-sm text-[#b9b5ab]">
                {homeSections.evening.lead}
              </p>
              <div className="border-2 border-white/[0.08] bg-[#17181b] p-6">
                <p className="mb-3 font-semibold text-white">
                  {nextOpenEvening.title}
                </p>
                <ul className="mb-6 space-y-1.5 text-sm text-[#b9b5ab]">
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
              <div className="border-2 border-[#5ee0d0]/25 bg-[#14211f] p-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#5ee0d0]">
                  {closedCommunity.title}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-[#b9b5ab]">
                  {closedCommunity.short}
                </p>
                <TelegramCommunityLink
                  className="text-sm font-medium"
                  location="home_community"
                />
              </div>
              <div className="border-2 border-white/[0.08] bg-[#17181b] p-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#b9b5ab]">
                  Ще
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/faq"
                      className="text-[#5ee0d0] hover:underline"
                    >
                      Питання та відповіді →
                    </Link>
                  </li>
                  <li>
                    <TelegramIvanChannelLink
                      className="text-[#b9b5ab] hover:text-[#5ee0d0]"
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
