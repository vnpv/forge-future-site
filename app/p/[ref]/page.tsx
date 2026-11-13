import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramPage from "../../program/page";
import { programMetadata as programMeta } from "@/lib/program-meta";

/**
 * Партнерська версія /program: forge-future.com/p/<ref>. Реф сидить у шляху, тож картка превʼю в Telegram
 * (вона веде на canonical/og:url) лишає партнера в лінку. Сторінка та сама, що /program, але не індексується.
 */
const OK = /^[a-z0-9]{1,16}$/i;

export async function generateMetadata({ params }: { params: Promise<{ ref: string }> }): Promise<Metadata> {
  const { ref } = await params;
  const path = `/p/${OK.test(ref) ? ref.toLowerCase() : ""}`;
  return {
    ...programMeta,
    alternates: { canonical: path },
    robots: { index: false, follow: false },
    openGraph: { ...(programMeta.openGraph ?? {}), url: path } as Metadata["openGraph"],
  };
}

export default async function PartnerProgram({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  if (!OK.test(ref)) notFound();
  return <ProgramPage />;
}
