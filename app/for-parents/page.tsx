import Link from "next/link";
import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import TelegramCta, { TelegramIvanChannelLink } from "../components/TelegramCta";
import JsonLd from "@/components/JsonLd";
import SchoolConceptStrip from "../components/SchoolConceptStrip";
import {
  ambitiousAudience,
  pageContext,
  parentConcerns,
  schoolOfFutureDiamonds,
  stats,
} from "@/lib/content";
import { pageSeo } from "@/lib/page-seo";
import { pageAlternates } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: pageSeo.forParents.title,
  description: pageSeo.forParents.description,
  alternates: pageAlternates("/for-parents"),
  openGraph: {
    title: "Forge Future для батьків",
    description: pageSeo.forParents.description,
    url: `${SITE_URL}/for-parents`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge Future для батьків",
    description: pageSeo.forParents.description,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: parentConcerns.map((c) => ({
    "@type": "Question",
    name: c.q,
    acceptedAnswer: { "@type": "Answer", text: c.a },
  })),
};

const pains = [
  {
    title: "Школа не формує мислення",
    text: "ЗНО, підручники, оцінки мало простору для «що я хочу будувати».",
  },
  {
    title: "Курси дають теорію",
    text: "Підліток слухає, але не проходить шлях від ідеї до результату.",
  },
  {
    title: "Час летить",
    text: "Підлітковий вік — час, коли закладається напрямок. Втрачений рік важко повернути.",
  },
];

export default function ForParentsPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Section spacing="hero">
        <PageHeader
          label={schoolOfFutureDiamonds.name}
          title={pageSeo.forParents.h1}
          subtitle={pageSeo.forParents.subtitle}
        >
          <div className="flex flex-wrap gap-3">
            <TelegramCta>Записатись на вечір →</TelegramCta>
            <TelegramIvanChannelLink
              className="inline-flex items-center rounded-full border border-[#2AABEE]/50 px-5 py-3 text-sm font-medium"
              location="for_parents"
            >
              Канал Івана →
            </TelegramIvanChannelLink>
          </div>
        </PageHeader>
        <Container className="mt-4">
          <SchoolConceptStrip pageHint={pageContext.forParents} />
        </Container>
      </Section>

      <Section spacing="content" className="bg-[#111111]">
        <Container className="space-y-8">
          <Card bordered className="border-[#e8951a]/20 bg-[#1a160f]">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#e8951a]">
              {ambitiousAudience.tag}
            </p>
            <p className="text-sm leading-relaxed text-[#9ca3af]">
              {ambitiousAudience.forParent}
            </p>
          </Card>
          <h2 className="text-2xl font-bold">Що турбує батьків</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {pains.map((p) => (
              <Card key={p.title} bordered>
                <h3 className="mb-2 font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-[#9CA3AF]">{p.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="mb-4 text-2xl font-bold">
            Чому не школа — і чому зараз
          </h2>
          <p className="mb-8 max-w-2xl text-[#9CA3AF]">
            Forge Future — альтернатива школі для підлітка 14–18 у Києві. Не
            замінює шкільну програму, а дає те, чого школа не дає за своєю
            природою.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
            <Card bordered>
              <h3 className="mb-3 font-semibold text-white">Класична школа</h3>
              <ul className="space-y-2 text-sm text-[#9CA3AF]">
                <li>→ Програма для всіх без огляду на інтерес</li>
                <li>→ Оцінки за відтворення, не за мислення</li>
                <li>→ «Тебе навчать» — ти об&apos;єкт, не суб&apos;єкт</li>
                <li>→ Результат відкладений на «після»</li>
              </ul>
            </Card>
            <Card bordered className="border-[#e8951a]/30">
              <h3 className="mb-3 font-semibold text-[#e8951a]">Forge Future</h3>
              <ul className="space-y-2 text-sm text-[#9CA3AF]">
                <li>→ Від твого інтересу — до реального проєкту</li>
                <li>→ Мислення формується через дію</li>
                <li>→ «Мені цікаво зрозуміти, що тебе драйвить»</li>
                <li>→ Перший результат за 6 тижнів</li>
              </ul>
            </Card>
          </div>
          <p className="mt-8 max-w-2xl text-sm text-[#9CA3AF]">
            <strong className="text-white">Втрачений час підлітка дорожчий.</strong>{" "}
            14–18 — вік, коли закладається напрямок. Якщо ці роки пройдуть в
            очікуванні чужих сценаріїв — після переключитись складніше.
          </p>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="mb-6 text-2xl font-bold">Що отримує ваша дитина</h2>
          <ul className="max-w-2xl space-y-3 text-[#9CA3AF]">
            <li>
              → Реальний проєкт від ідеї до демо-дня, а не «проходження курсу»
            </li>
            <li>→ Ментори-практики, мала група (до 10 учасників)</li>
            <li>→ Спільнота однолітків, які теж будують</li>
            <li>→ Зміна мислення: авторство замість очікування вказівок</li>
          </ul>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <Card key={s.label} bordered className="text-center">
                <p className="text-3xl font-black text-[#F59E0B]">{s.value}</p>
                <p className="mt-1 text-xs text-[#9CA3AF]">{s.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="flush" className="bg-[#111111]">
        <Container>
          <h2 className="mb-4 text-2xl font-bold">Як це працює</h2>
          <p className="mb-8 max-w-2xl text-[#9CA3AF]">
            Спочатку безкоштовний відкритий вечір (6.06, 16:00, Біла Церква).
            Потім,
            якщо підходить 6-тижнева програма від $500 з сім&apos;ї. Деталі на
            вечорі, без тиску.
          </p>
          <Link
            href="/program"
            className="text-[#F59E0B] font-medium hover:underline"
          >
            Програма на 6 тижнів →
          </Link>
        </Container>
      </Section>

      <Section spacing="block">
        <Container>
          <h2 className="mb-8 text-2xl font-bold">Питання батьків</h2>
          <div className="space-y-4 max-w-3xl">
            {parentConcerns.map((c) => (
              <Card key={c.q} bordered>
                <h3 className="mb-2 font-semibold text-white">{c.q}</h3>
                <p className="text-sm leading-relaxed text-[#9CA3AF]">{c.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="end" className="bg-[#111111]">
        <Container>
          <h2 className="mb-4 text-2xl font-black">Готові познайомитись?</h2>
          <p className="mb-6 text-[#9CA3AF]">
            Приходьте на вечір разом із підлітком або відправте його ми пояснимо
            все на місці.
          </p>
          <TelegramCta className="!px-8 !py-4">
            Записатись у Telegram →
          </TelegramCta>
        </Container>
      </Section>
    </>
  );
}
