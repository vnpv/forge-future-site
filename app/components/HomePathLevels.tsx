import Link from "next/link";
import { forgePhilosophy, pathLevels, pathPillars } from "@/lib/content";
import { homeSections } from "@/lib/page-seo";

export default function HomePathLevels() {
  const section = homeSections.personalized;

  return (
    <div className="space-y-10">
      <div className="max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#e8951a]">
          {section.eyebrow}
        </p>
        <h2 className="mb-3 text-2xl font-bold sm:text-3xl">{section.h2}</h2>
        <p className="mb-4 text-sm leading-relaxed text-[#8b9199] sm:text-base">
          {section.lead}
        </p>
        <p className="text-sm leading-relaxed text-[#8b9199] sm:text-base">
          {forgePhilosophy.body}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {pathPillars.map((p) => (
          <div
            key={p.key}
            className="relative overflow-hidden rounded-xl border border-[#e8951a]/20 bg-gradient-to-b from-[#e8951a]/10 to-[#141414] p-5"
          >
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#e8951a]">
              {p.title}
            </span>
            <p className="text-sm leading-relaxed text-[#d1d5db]">{p.desc}</p>
          </div>
        ))}
      </div>

      <ol className="grid gap-4 md:grid-cols-3">
        {pathLevels.map((level) => (
          <li key={level.stage}>
            <Link
              href={level.href}
              className="ff-explore-card group flex h-full flex-col rounded-xl border border-white/[0.06] bg-[#141414] p-5"
            >
              <span className="mb-3 font-mono text-2xl font-black text-[#e8951a]/80">
                {level.stage}
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-[#e8951a] transition-colors">
                {level.title}
              </h3>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                {level.subtitle}
              </p>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-[#8b9199]">
                {level.desc}
              </p>
              <span className="text-sm font-medium text-[#e8951a]">
                {level.cta} →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <blockquote className="rounded-xl border border-white/[0.06] bg-[#141414] px-5 py-4 text-sm italic leading-relaxed text-[#9ca3af] sm:px-6 sm:py-5">
        «{forgePhilosophy.founderLine}»
        <footer className="mt-2 not-italic text-xs text-[#6b7280]">
          — Іван Первой, засновник
        </footer>
      </blockquote>
    </div>
  );
}
