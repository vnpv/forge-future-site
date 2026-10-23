import { lifeStrategyArtifact } from "@/lib/content";

export default function HomeLifeStrategy() {
  return (
    <section
      id="life-strategy"
      className="scroll-mt-24 rounded-2xl border border-[#5ee0d0]/25 bg-gradient-to-br from-[#14211f] via-[#17181b] to-[#111214] p-6 sm:p-8"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#5ee0d0]">
        {lifeStrategyArtifact.tag}
      </p>
      <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
        {lifeStrategyArtifact.name}
      </h2>
      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[#b9b5ab] sm:text-base">
        {lifeStrategyArtifact.body}
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {lifeStrategyArtifact.layers.map((layer) => (
          <div
            key={layer.key}
            className="rounded-xl border border-white/[0.08] bg-[#111214]/50 p-5"
          >
            <p className="mb-2 text-lg font-semibold text-white">
              <span className="mr-2" aria-hidden>
                {layer.emoji}
              </span>
              {layer.title}
            </p>
            <p className="text-sm leading-relaxed text-[#b9b5ab]">
              {layer.desc}
            </p>
          </div>
        ))}
      </div>

      <ol className="mb-6 space-y-3 border-t border-white/[0.06] pt-6">
        {lifeStrategyArtifact.inPractice.map((item, i) => (
          <li key={item.step} className="flex gap-4 text-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5ee0d0]/15 text-xs font-bold text-[#5ee0d0]">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-[#f1ede4]">{item.step}</p>
              <p className="mt-0.5 text-[#b9b5ab]">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="text-xs text-[#8e8a80]">{lifeStrategyArtifact.notThis}</p>
    </section>
  );
}
