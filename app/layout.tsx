import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "./components/GoogleAnalytics";
import VercelAnalytics from "./components/VercelAnalytics";
import { organizationSchema, websiteSchema } from "@/lib/organization-schema";
import { pageAlternates } from "@/lib/seo";
import { OG_IMAGE_VERSION, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Школа майбутніх Діамантів`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: pageAlternates("/"),
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Школа майбутніх Діамантів`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `/images/og-forge-future-1200x630.webp?v=${OG_IMAGE_VERSION}`,
        width: 1200,
        height: 630,
        alt: "Forge Future, альтернатива школі для амбітної молоді",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Іван", url: SITE_URL }],
  creator: "Forge Future",
  verification: {
    google: "c3EXVxw1WMeaa0dvRYnFciTSCdN8GZpoXMGMFfmzYqI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${onest.variable} h-full antialiased`}>
      <body className="relative min-h-full flex flex-col">
        <GoogleAnalytics />
        <VercelAnalytics />
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Nav />
        <main className="relative z-[1] flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
