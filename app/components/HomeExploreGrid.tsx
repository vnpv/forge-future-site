import Link from "next/link";
import { homeExploreLinks } from "@/lib/content";

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-[#e8951a] transition-transform group-hover:translate-x-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function HomeExploreGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {homeExploreLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`ff-explore-card group flex flex-col rounded-xl border border-white/[0.06] bg-[#141414] p-5 ${
            item.large ? "sm:col-span-1 lg:min-h-[180px]" : ""
          }`}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#e8951a]">
              {item.tag}
            </span>
            {item.badge ? (
              <span className="rounded-full border border-[#e8951a]/30 bg-[#e8951a]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#e8951a]">
                {item.badge}
              </span>
            ) : null}
          </div>
          <h3 className="mb-2 text-lg font-bold text-white group-hover:text-[#e8951a] transition-colors">
            {item.title}
          </h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-[#8b9199]">
            {item.desc}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#e8951a]">
            Детальніше
            <ArrowIcon />
          </span>
        </Link>
      ))}
    </div>
  );
}
