import type { Metadata } from "next";
import HackathonPage from "../components/HackathonPage";
import { hackathons } from "@/lib/hackathons";

const h = hackathons.kyiv;

export const metadata: Metadata = {
  title: h.metaTitle,
  description: h.metaDescription,
  alternates: { canonical: "/kyiv" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "Forge Future",
    title: h.metaTitle,
    description: h.metaDescription,
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

export default function Page() {
  return <HackathonPage h={h} />;
}
