import { ambitiousAudience } from "@/lib/content";

type Variant = "full" | "compact" | "inline";

export default function AmbitiousAudienceBlock({
  variant = "full",
}: {
  variant?: Variant;
}) {
  if (variant === "inline") {
    return (
      <p className="max-w-2xl text-sm leading-relaxed text-[#8b9199] sm:text-base">
        <span className="font-medium text-[#d1d5db]">
          {ambitiousAudience.headline}.
        </span>{" "}
        {ambitiousAudience.lead} {ambitiousAudience.body}
      </p>
    );
  }

  if (variant === "compact") {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[#141414] px-4 py-5 sm:px-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#e8951a]">
          {ambitiousAudience.tag}
        </p>
        <p className="text-sm leading-relaxed text-[#9ca3af]">
          {ambitiousAudience.lead}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#141414] p-6 sm:p-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e8951a]">
        {ambitiousAudience.tag}
      </p>
      <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">
        {ambitiousAudience.headline}
      </h2>
      <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[#9ca3af]">
        {ambitiousAudience.lead}
      </p>
      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[#8b9199] sm:text-base">
        {ambitiousAudience.body}
      </p>
      <ul className="grid gap-3 sm:grid-cols-3">
        {ambitiousAudience.bullets.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-relaxed text-[#8b9199]"
          >
            <span className="text-[#e8951a]" aria-hidden>
              →
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
