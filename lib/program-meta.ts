import type { Metadata } from "next";
import { pageSeo } from "@/lib/page-seo";
import { pageAlternates } from "@/lib/seo";

/** Базові метадані /program, спільні для /program?ref=… і партнерської /p/<ref>. */
export const programMetadata: Metadata = {
  title: pageSeo.program.title,
  description: pageSeo.program.description,
  alternates: pageAlternates("/program"),
  // Без og:url: Telegram веде з картки превʼю на той лінк, яким поділились (разом із ?ref=...), а не на головну.
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "Forge Future",
    title: pageSeo.program.title,
    description: pageSeo.program.description,
    images: [
      {
        url: "/images/og-forge-future-1200x630.webp?v=2026-09-08",
        width: 1200,
        height: 630,
        alt: "Forge Future, менторська програма для підлітків",
      },
    ],
  },
};

