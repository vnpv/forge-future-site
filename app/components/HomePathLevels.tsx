import { forgePhilosophy, pathPillars } from "@/lib/content";
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

      <blockquote className="rounded-xl border border-white/[0.06] bg-[#141414] px-5 py-4 text-sm italic leading-relaxed text-[#9ca3af] sm:px-6 sm:py-5">
        «{forgePhilosophy.founderLine}»
        <footer className="mt-2 not-italic text-xs text-[#6b7280]">
          — Іван Первой, засновник
        </footer>
      </blockquote>
    </div>
  );
}
