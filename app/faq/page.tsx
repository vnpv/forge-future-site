import Link from "next/link";
import type { Metadata } from "next";
import Section from "../components/Section";
import Container from "../components/Container";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import TelegramCta from "../components/TelegramCta";
import JsonLd from "@/components/JsonLd";
import SchoolConceptStrip from "../components/SchoolConceptStrip";
import { generalFaqs, pageContext, schoolOfFutureDiamonds } from "@/lib/content";
import { pageSeo } from "@/lib/page-seo";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageSeo.faq.title,
  description: pageSeo.faq.description,
  alternates: pageAlternates("/faq"),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: generalFaqs
    .filter((f) => !("href" in f))
    .map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Section spacing="hero">
        <PageHeader
          label={schoolOfFutureDiamonds.name}
          title={pageSeo.faq.h1}
          subtitle={pageSeo.faq.subtitle}
        />
        <Container className="mt-4">
          <SchoolConceptStrip pageHint={pageContext.faq} />
        </Container>
      </Section>
      <Section spacing="end">
        <Container>
          <div className="space-y-4 max-w-2xl">
            {generalFaqs.map((f) => (
              <Card key={f.q} bordered>
                <h2 className="mb-2 text-base font-semibold text-white">
                  {f.q}
                </h2>
                <p className="text-sm text-[#b9b5ab]">
                  {f.a}
                  {"href" in f && f.href && (
                    <>
                      {" "}
                      <Link
                        href={f.href}
                        className="text-[#5ee0d0] hover:underline"
                      >
                        Перейти →
                      </Link>
                    </>
                  )}
                </p>
              </Card>
            ))}
          </div>
          <div className="ff-cta-stack mt-10">
            <TelegramCta>Записатись на вечір</TelegramCta>
            <Link
              href="/events"
              className="ff-cta-link"
            >
              Деталі про вечір →
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
