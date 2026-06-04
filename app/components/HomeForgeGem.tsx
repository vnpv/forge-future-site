import Link from "next/link";
import { forgeGem } from "@/lib/content";
import { homeSections } from "@/lib/page-seo";

export default function HomeForgeGem() {
  const section = homeSections.howItWorks;

  return (
    <section
      id="forge-gem"
      className="scroll-mt-24 rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-6 sm:p-8"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e8951a]">
        {section.tag}
      </p>
      <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
        {section.h2}
      </h2>
      <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[#9ca3af] sm:text-base">
        {section.lead}
      </p>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[#8b9199] sm:text-base">
        {forgeGem.body}
      </p>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {forgeGem.stages.map((stage, i) => (
          <li key={stage.key}>
            <Link
              href={stage.href}
              className="ff-explore-card group flex h-full flex-col rounded-xl border border-white/[0.06] bg-[#141414] p-4"
            >
              <span className="mb-2 font-mono text-lg font-black text-[#e8951a]/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-[#e8951a] transition-colors">
                {stage.title}
              </h3>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                {stage.subtitle}
              </p>
              <p className="flex-1 text-xs leading-relaxed text-[#8b9199]">
                {stage.desc}
              </p>
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-sm leading-relaxed text-[#6b7280]">
        {forgeGem.notThis}
      </p>
    </section>
  );
}
