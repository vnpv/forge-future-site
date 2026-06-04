import Link from "next/link";
import { lifeStrategyTeaser } from "@/lib/content";
import { homeSections } from "@/lib/page-seo";

export default function LifeStrategyTeaser() {
  const section = homeSections.lifeStrategy;

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#141414] p-6 sm:p-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e8951a]">
        {section.tag}
      </p>
      <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">
        {section.h2}
      </h2>
      <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[#9ca3af]">
        {section.lead}
      </p>
      <Link
        href={lifeStrategyTeaser.href}
        className="text-sm font-medium text-[#e8951a] hover:underline"
      >
        {section.cta} →
      </Link>
    </section>
  );
}
