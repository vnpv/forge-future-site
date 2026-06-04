import { lifeStrategyArtifact } from "@/lib/content";

export default function HomeLifeStrategy() {
  return (
    <section
      id="life-strategy"
      className="scroll-mt-24 rounded-2xl border border-[#e8951a]/25 bg-gradient-to-br from-[#1a160f] via-[#141414] to-[#0c0c0c] p-6 sm:p-8"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e8951a]">
        {lifeStrategyArtifact.tag}
      </p>
      <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
        {lifeStrategyArtifact.name}
      </h2>
      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[#9ca3af] sm:text-base">
        {lifeStrategyArtifact.body}
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {lifeStrategyArtifact.layers.map((layer) => (
          <div
            key={layer.key}
            className="rounded-xl border border-white/[0.08] bg-[#0c0c0c]/50 p-5"
          >
            <p className="mb-2 text-lg font-semibold text-white">
              <span className="mr-2" aria-hidden>
                {layer.emoji}
              </span>
              {layer.title}
            </p>
            <p className="text-sm leading-relaxed text-[#8b9199]">
              {layer.desc}
            </p>
          </div>
        ))}
      </div>

      <ol className="mb-6 space-y-3 border-t border-white/[0.06] pt-6">
        {lifeStrategyArtifact.inPractice.map((item, i) => (
          <li key={item.step} className="flex gap-4 text-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8951a]/15 text-xs font-bold text-[#e8951a]">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-[#f2f2f2]">{item.step}</p>
              <p className="mt-0.5 text-[#8b9199]">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="text-xs text-[#6b7280]">{lifeStrategyArtifact.notThis}</p>
    </section>
  );
}
