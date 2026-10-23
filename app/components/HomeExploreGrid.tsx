import Link from "next/link";
import { homeExploreLinks } from "@/lib/content";

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-[#5ee0d0] transition-transform group-hover:translate-x-0.5"
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
          className={`ff-explore-card group flex flex-col border-2 border-white/[0.08] bg-[#17181b] p-5 ${
            item.large ? "sm:col-span-1 lg:min-h-[180px]" : ""
          }`}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5ee0d0]">
              {item.tag}
            </span>
            {item.badge ? (
              <span className="border border-[#5ee0d0]/40 bg-[#5ee0d0]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#5ee0d0]">
                {item.badge}
              </span>
            ) : null}
          </div>
          <h3 className="ff-display mb-2 text-lg font-bold text-white group-hover:text-[#5ee0d0] transition-colors">
            {item.title}
          </h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-[#b9b5ab]">
            {item.desc}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5ee0d0]">
            Детальніше
            <ArrowIcon />
          </span>
        </Link>
      ))}
    </div>
  );
}
